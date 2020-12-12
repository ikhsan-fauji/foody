import './MenuList';
import './ReviewForm';
import './consumer-reviews';
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

  _detailTemplate(detail) {
    const restaurantImage = `${restaurantApi.mediumPicture}${detail.pictureId}`;
    const fixedRating = detail.rating.toFixed(1);
    const template = `
      <div class="container">
        <section class="restaurant-detail">
          <img
            class="restaurant-image lazyload"
            data-src="${restaurantImage}"
            data-sizes="auto"
            alt="restaurant ${detail.name}"
            srcset="${restaurantImage}"
          />
          <h2 class="restaurant-name primary-text" tabindex="0">
          ${detail.name}
          </h2>
          <div class="restaurant-info">
            <i id="rating-icon${detail.id}" class="fa fa-star rating-icon"></i>
            <label
              for="rating-icon${detail.id}"
              tabindex="0"
              aria-label="Restaurant rating point is ${fixedRating}"
            >${fixedRating}</label>
            <i id="place-icon${detail.id}"
            class="fa fa-map-marker-alt rating-icon"></i>
            <label
              for="place-icon${detail.id}"
              tabindex="0"
              aria-label="${detail.city} - ${detail.address}"
            >
              ${detail.city} - ${detail.address}
            </label>
            ${this._categories(detail.categories)}
          </div>
          <p class="restaurant-description">${detail.description}</p>
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
      this.afterRendered(this._detail);
    });
  }

  set restaurantId(restaurantId) {
    this._restaurantId = restaurantId;
  }

  render() {
    return new Promise((resolve) => {
      if (this._detail) {
        this.innerHTML = this._detailTemplate(this._detail);
      }
      resolve();
    });
  }

  afterRendered(detail) {
    this._renderListMenus('#food-list', detail.menus.foods);
    this._renderListMenus('#drink-list', detail.menus.drinks);
    this._initReviews(detail.customerReviews);
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
