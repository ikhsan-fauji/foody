import './MenuList';
import './ReviewForm';
import './ConsumerReviews';
import restaurantApi from '../globals/api';
import {
  restaurantDetailMenusTemplate,
  restaurantReviewsTemplate
} from '../views/templates/restaurant-template';

class RestaurantDetail extends HTMLElement {
  constructor() {
    super();
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
          <h2 class="restaurant-name primary-text" tabindex="0">
          ${this._detail.name}
          </h2>
          <div class="restaurant-info">
            <span id="rating-icon" class="material-icons">grade</span>
            <label for="rating-icon" tabindex="0" aria-label="Restaurant rating point is ${fixedRating}">
              ${fixedRating}
            </label>
            <span id="rating-icon" class="material-icons">place</span>
            <label
              for="rating-icon"
              tabindex="0"
              aria-label="${this._detail.city} - ${this._detail.address}"
            >
              ${this._detail.city} - ${this._detail.address}
            </label>
            ${this._categories(this._detail.categories)}
          </div>
          <p class="restaurant-description">${this._detail.description}</p>
        </section>

        ${restaurantDetailMenusTemplate()}
        ${restaurantReviewsTemplate()}
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
    this._renderListMenus('#food-list', this._detail.menus.foods);
    this._renderListMenus('#drink-list', this._detail.menus.drinks);
    this._initReviews(this._detail.consumerReviews);
    this._initReviewForm();
  }

  _renderListMenus(id, menus) {
    const listMenus = document.createElement('menu-list');
    listMenus.list = menus;
    document.querySelector(id).appendChild(listMenus);
  }

  _initReviews(reviews) {
    const consumerReviews = document.createElement('consumer-reviews');
    consumerReviews.reviews = reviews;
    const reviewsElement = document.querySelector('#reviews');
    reviewsElement.innerHTML = '';
    reviewsElement.appendChild(consumerReviews);
  }

  _initReviewForm() {
    const reviewForm = document.createElement('review-form');
    reviewForm.restaurantId = this._restaurantId;
    reviewForm.afterSubmitted = (reviewsData) => this._initReviews(reviewsData);
    document.querySelector('#review-form').appendChild(reviewForm);
  }
}

customElements.define('restaurant-detail', RestaurantDetail);
