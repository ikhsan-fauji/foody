class MenuCard extends HTMLElement {
  constructor() {
    super();
  }

  set menu(menu = null) {
    this._menu = menu;
  }

  _prepareTemplate(menu) {
    const { name, rating, city, picture } = menu;
    const fixedRating = rating.toFixed(1);
    const thumbnail = picture || './images/heros/hero-image_4.webp';

    const template = `
      <article class="card menu">
        <img
          class="card-image menu-thumbnail lazyload"
          data-src="${thumbnail}"
          data-sizes="auto"
          alt="Picture of ${name}"
        />
        <div class="card-body menu-content">
          <h1 class="menu-title">
            <a href="#">${name}</a>
          </h1>
          <div class="menu-info">
            <div class="menu-info__rating">
              <span id="rating-icon" class="material-icons" aria-label="Star icon for rating"> grade </span>
              <label for="rating-icon" tabindex="0" aria-label="Rating point is ${fixedRating}"> ${fixedRating} </label>
            </div>
            <div class="menu-info__place">
              <span id="place-icon" class="material-icons" aria-label="Place icon"> place </span>
              <label for="place-icon" tabindex="0">${city}</label>
            </div>
          </div>
        </div>
      </article>
    `;

    return template;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this._menu) {
      this.innerHTML = this._prepareTemplate(this._menu);
    }
  }
}

customElements.define('menu-card', MenuCard);
