import {
  cardSkeleton,
  detailSkeleton,
  discoverSkeleton
} from '../views/templates/html-template';

class Skeleton extends HTMLElement {
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
      return this._detailSkeleton();
    }
    if (splittedUrl[1]) {
      return this._restaurantSkeleton();
    }
    return this._homeSkeleton();
  }

  _detailSkeleton() {
    return `
    <section id="restaurant-content">
      ${detailSkeleton()}
    </section>
    `;
  }

  _restaurantSkeleton() {
    return `
      <section id="restaurant">
        <div class="container restaurants">
          ${cardSkeleton(8)}
        </div>
      </section>
    `;
  }

  _homeSkeleton() {
    return `
    <section id="explore">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" tabindex="0">Explore Restaurant</h2>
        </div>
        <div class="restaurants">${cardSkeleton(4)}</div>
      </div>
    </section>

    <section id="popular-menus">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" tabindex="0">Popular Menus</h2>
        </div>
        <div class="menus">${cardSkeleton(4)}</div>
      </div>
    </section>

    <section id="discover-restaurant">
      <div class="container discover">${discoverSkeleton()}</div>
    </section>
    `;
  }
}

customElements.define('skeleton-loader', Skeleton);
