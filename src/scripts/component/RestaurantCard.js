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
        <p class="card-badge" tabindex="0" aria-label="Restaurant in ${city}"><i class="fa fa-map-marker-alt badge-icon"></i>${city}</p>
        <img
          class="card-image lazyload"
          data-src="${restaurantImage}"
          data-sizes="auto"
          alt="${name} Restaurant"
        />
        <div class="card-body">
          <h1 class="card-title">
            <a class="card-link" href="#/restaurant/${id}">${name}</a>
          </h1>
          <div class="card-rating">
            <i id="rating-icon${id}" class="fa fa-star rating-icon"></i>
            <label
              for="rating-icon${id}"
              tabindex="0"
              aria-label="Restaurant rating point is ${fixedRating}"
            >
            ${fixedRating}
            </label>
          </div>
          <p class="card-description card-text">
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
