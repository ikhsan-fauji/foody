import './MenuList';
import './ReviewForm';
import './ConsumerReviews';
import { restaurantApi } from '../utils/enums';
import idb from '../helper/idb-helper';

class RestaurantDetail extends HTMLElement {
  constructor() {
    super();
  }

  _restaurantMenus() {
    const template = `
      <section class="restaurant-menus">
        <div class="foods">
          <h3 class="h-3 primary-text">Foods</h3>
          <div id="food-list"></div>
        </div>

        <div class="drinks">
          <h3 class="h-3 primary-text">Drinks</h3>
          <div id="drink-list"></div>
        </div>
      </section>
    `;

    return template;
  }

  _consumerReview() {
    const template = `
      <section class="restaurant-review">
        <h2 class="primary-text">Consumer Reviews</h2>
        <div id="reviews"></div>

        <h2 class="primary-text">What do you think?</h2>
        <div id="review-form"></div>
      </section>
    `;

    return template;
  }

  _categories(categories = []) {
    let template = `<label for="rating-icon" tabindex="0"> | Categories: </label>`;
    if (categories.length > 0) {
      categories.forEach((category) => {
        template += `<span class="category badge">${category.name}</span>&nbsp;`;
      });
    }
    return template;
  }

  _detailTemplate() {
    const restaurantImage = `${restaurantApi.mediumPicture}${this._detail.pictureId}`;
    const fixedRating = this._detail.rating.toFixed(1);
    const template = `
      <div class="container">
        <section class="restaurant-detail">
          <img
            class="restaurant-image"
            src="${restaurantImage}"
            alt="restaurant ${this._detail.name}"
          />
          <div class="restaurant__name__action">
            <h2 class="restaurant-name primary-text">${this._detail.name}</h2>
            <div id="favorite-actions"></div>
          </div>
          <div class="restaurant-info">
            <span id="rating-icon" class="material-icons">grade</span>
            <label for="rating-icon" tabindex="0" aria-label="Restaurant rating point is ${fixedRating}">
              ${fixedRating}
            </label>
            <span id="rating-icon" class="material-icons">place</span>
            <label
              for="rating-icon"
              tabindex="0"
              aria-label="${this._detail.city}"
            >
              ${this._detail.city} - ${this._detail.address}
            </label>
            ${this._categories(this._detail.categories)}
          </div>
          <p class="restaurant-description">${this._detail.description}</p>
        </section>

        ${this._restaurantMenus()}
        ${this._consumerReview()}
      </div>
    `;

    return template;
  }

  set detail(detail) {
    this._detail = detail;
    this.render().then(() => {
      this.afterRendered();
    });
  }

  set restaurantId(restaurantId) {
    this._restaurantId = restaurantId;
  }

  render() {
    return new Promise((resolve) => {
      if (this._detail) {
        this.innerHTML = this._detailTemplate();
      }
      resolve();
    });
  }

  afterRendered() {
    const foodList = document.createElement('menu-list');
    foodList.list = this._detail.menus.foods;
    document.querySelector('#food-list').appendChild(foodList);

    const drinkList = document.createElement('menu-list');
    drinkList.list = this._detail.menus.drinks;
    document.querySelector('#drink-list').appendChild(drinkList);

    const consumerReviews = document.createElement('consumer-reviews');
    consumerReviews.reviews = this._detail.consumerReviews;
    document.querySelector('#reviews').appendChild(consumerReviews);

    const reviewForm = document.createElement('review-form');
    reviewForm.restaurantId = this._restaurantId;
    reviewForm.afterSubmitted = (reviews) => this._refreshReviews(reviews);
    document.querySelector('#review-form').appendChild(reviewForm);

    this._favoriteActions();
  }

  _refreshReviews(reviews) {
    const consumerReviews = document.createElement('consumer-reviews');
    consumerReviews.reviews = reviews;
    const reviewsElement = document.querySelector('#reviews');
    reviewsElement.innerHTML = '';
    reviewsElement.appendChild(consumerReviews);
  }

  async _favoriteActions() {
    const favoriteActions = document.querySelector('#favorite-actions');
    const savedData = await idb.getByKey(this._restaurantId);
    if (savedData) {
      const removeFavorite = `<button type="button" id="remove-favorite"><span class="material-icons">favorite</span></button>`;
      favoriteActions.innerHTML = removeFavorite;
      const removeElement = document.querySelector('#remove-favorite');
      removeElement.addEventListener('click', (event) => {
        this._removeRestaurant();
        event.stopPropagation();
      });
    } else {
      const saveFavorite = `<button type="button" id="save-favorite"><span class="material-icons">favorite_border</span></button>`;
      favoriteActions.innerHTML = saveFavorite;
      const saveElement = document.querySelector('#save-favorite');
      saveElement.addEventListener('click', (event) => {
        this._saveRestaurant();
        event.stopPropagation();
      });
    }
  }

  async _saveRestaurant() {
    try {
      const restaurantData = this._detail;
      await idb.upsert(restaurantData);
      alert('saving success');
      this._favoriteActions();
    } catch (error) {
      alert('saving failed');
      this._favoriteActions();
    }
  }

  async _removeRestaurant() {
    try {
      await idb.deleteByKey(this._restaurantId);
      alert('remove success');
      this._favoriteActions();
    } catch (error) {
      alert('remove failed');
      this._favoriteActions();
    }
  }
}

customElements.define('restaurant-detail', RestaurantDetail);
