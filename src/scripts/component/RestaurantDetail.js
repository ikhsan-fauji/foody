import { restaurantApi } from '../utils/enums';
import './MenuList';
import './ReviewForm';
import './ConsumerReviews';

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
          <h2 class="restaurant-name primary-text">${this._detail.name}</h2>
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
              ${this._detail.city} | ${this._detail.address}
            </label>
            <label for="rating-icon" tabindex="0"> | Categories: </label>
            <span class="category badge">Badge category</span>
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
  }

  _refreshReviews(reviews) {
    const consumerReviews = document.createElement('consumer-reviews');
    consumerReviews.reviews = reviews;
    const reviewsElement = document.querySelector('#reviews');
    reviewsElement.innerHTML = '';
    reviewsElement.appendChild(consumerReviews);
  }
}

customElements.define('restaurant-detail', RestaurantDetail);
