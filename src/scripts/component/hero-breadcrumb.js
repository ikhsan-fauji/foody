class HeroBreadcrumb extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = this._template();
    window.addEventListener('hashchange', () => {
      this.innerHTML = this._template();
    });
  }

  _template() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splittedUrl = url.split('/');
    if (splittedUrl[1] && splittedUrl[2]) {
      return this._breadcrumb('Restaurant Detail');
    }
    if (splittedUrl[1]) {
      return this._breadcrumb(splittedUrl[1]);
    }
    return this._hero();
  }

  _hero() {
    return `
    <section class="hero">
      <div class="hero__gradient"></div>
      <img
        alt="Hero Image"
        class="hero__image lazyload"
        crossorigin="anonymous"
        data-src="./images/heros/hero-small.jpg 400w, ./images/heros/hero-large.jpg 800w"
        src="./images/heros/hero-large.jpg"
        srcset="./images/heros/hero-small.jpg 400w, ./images/heros/hero-large.jpg 800w"
        sizes="(max-width: 600px) 400px, 800px"
      />
      <div class="hero__content container">
        <p class="hero__tagline" tabindex="0">
          Discover the great places to eat around you!
        </p>
        <h1 class="hero__title" tabindex="0">
          Find your favourite <span class="primary-text">Resto</span> and
          <span class="primary-text">Food</span>.
        </h1>
        ${this._searchForm()}
      </div>
    </section>
  `;
  }

  _searchForm() {
    return `
    <form action="#" class="search-form">
      <div class="left-group">
        <div class="form-icon left-icon">
          <i class="fa fa-map-marker-alt map-icon"></i>
        </div>
        <div class="form-input">
          <select name="city" id="city-options" aria-label="City options">
            <option value="">Select City...</option>
          </select>
        </div>
      </div>
      <div class="right-group">
        <div class="form-input">
          <input
            type="text"
            class="search-input"
            aria-label="Search input for restaurant or food"
            placeholder="Search here..."
          />
        </div>
        <div class="form-icon right-icon">
          <button class="search-button" type="button" aria-label="search-button">
            <i class="fa fa-search search-icon"></i>
          </button>
        </div>
      </div>
    </form>`;
  }

  _breadcrumb(page) {
    return `
    <section id="breadcrumb">
      <div class="container">
        <div class="breadcrumb-header">
          <h1 class="breadcrumb-title">${page}</h1>
        </div>
      </div>
    </section>
    `;
  }
}

customElements.define('hero-breadcrumb', HeroBreadcrumb);
