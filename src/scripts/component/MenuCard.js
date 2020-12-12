class MenuCard extends HTMLElement {
  constructor() {
    super();
  }

  set menu(menu = null) {
    this._menu = menu;
  }

  _prepareTemplate(menu) {
    const { id, name, rating, city, picture } = menu;
    const fixedRating = rating.toFixed(1);

    const template = `
      <article class="card menu">
        <img
          alt="Picture of ${name}"
          class="card-image menu-thumbnail lazyload"
          data-sizes="auto"
          data-src="./images/menus/${picture}.webp"
          srcset="./images/menus/${picture}.webp"
        />
        <div class="card-body menu-content">
          <h1 class="menu-title">
            <a href="#">${name}</a>
          </h1>
          <div class="menu-info">
            <div class="menu-info__rating">
              <i id="rating-icon${id}" class="fa fa-star rating-icon" aria-label="Star icon for rating"></i>
              <label for="rating-icon${id}" tabindex="0" aria-label="Rating point is ${fixedRating}"> ${fixedRating} </label>
            </div>
            <div class="menu-info__place">
              <i id="place-icon${id}" class="fa fa-map-marker-alt place-icon" aria-label="Place icon"></i>
              <label for="place-icon${id}" tabindex="0">${city}</label>
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
