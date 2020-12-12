import restaurantApi from '../globals/api';

class RestaurantCard extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant = null) {
    this._restaurant = restaurant;
  }

  _prepareTemplate(restaurant) {
    const { id, name, city, pictureId, rating, description } = restaurant;
    const fixedRating = rating.toFixed(1);
    const defaultThumbnail = './images/heros/hero.webp';
    const thumbnail = pictureId || defaultThumbnail;
    const restaurantImage = `${restaurantApi.smallPicture}${thumbnail}`;

    const template = `
      <article class="card restaurant">
        <p class="restaurant-place" tabindex="0" aria-label="Restaurant in ${city}"><i class="fa fa-map-marker-alt place-icon"></i>${city}</p>
        <img
          class="card-image restaurant-thumbnail lazyload"
          data-src="${restaurantImage}"
          data-sizes="auto"
          alt="${name} Restaurant"
          srcset="${restaurantImage}"
        />
        <div class="card-body restaurant-content">
          <h1 class="restaurant-title">
            <a href="#/restaurant/${id}">${name}</a>
          </h1>
          <div class="restaurant-rating">
            <i id="rating-icon${id}" class="fa fa-star rating-icon"></i>
            <label
              for="rating-icon${id}"
              tabindex="0"
              aria-label="Restaurant rating point is ${fixedRating}"
            >
            ${fixedRating}
            </label>
          </div>
          <p class="restaurant-description card-text">
            ${description}
          </p>
        </div>
      </article>
    `;

    return template;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this._restaurant) {
      this.innerHTML = this._prepareTemplate(this._restaurant);
    }
  }
}

customElements.define('restaurant-card', RestaurantCard);
