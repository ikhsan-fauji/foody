class RestaurantCard extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant = null) {
    this._prepareTemplate(restaurant);
  }

  _prepareTemplate(restaurant) {
    if (restaurant) {
      const { name, city, pictureId, rating, description } = restaurant;
      const fixedRating = rating.toFixed(1);
      const thumbnail = pictureId || './images/heros/hero-image_4.jpg';

      const template = `
        <article class="card restaurant">
          <p class="restaurant-place" tabindex="0" aria-label="Restaurant in ${city}"><span id="place-icon" class="material-icons"> place </span>${city}</p>
          <img
            class="card-image restaurant-thumbnail lazyload"
            data-src="${thumbnail}"
            alt="${name} Restaurant"
          />
          <div class="card-body restaurant-content">
            <h1 class="restaurant-title">
              <a href="#">${name}</a>
            </h1>
            <div class="restaurant-rating">
              <span
                id="rating-icon"
                class="material-icons"
                tabindex="0"
                aria-label="Star icon for restaurant rating"
              >
                grade
              </span>
              <label
                for="rating-icon"
                tabindex="0"
                aria-label="Restaurant rating point is ${fixedRating}"
              >
              ${fixedRating}
              </label>
            </div>
            <p class="restaurant-description card-text" tabindex="0">
              ${description}
            </p>
          </div>
        </article>
      `;

      this._cardTemplate = template;
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this._cardTemplate) {
      this.innerHTML = this._cardTemplate;
    }
  }
}

customElements.define('restaurant-card', RestaurantCard);
