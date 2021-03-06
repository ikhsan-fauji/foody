import dummy from '../../data/DATA.json';
import Restaurant from '../../data/restaurant';
import { handleError } from '../../helper/error-helper';
import {
  renderList,
  renderPopularMenus
} from '../templates/restaurant-template';
import { cardSkeleton, noDataTemplate } from '../templates/html-template';

const HomePage = {
  async render() {
    return `
      <section id="explore">
        <div class="container">
          <div class="section-header">
            <h1 class="section-title" tabindex="0">Explore Restaurant</h1>
          </div>
          <div class="restaurants">${cardSkeleton(4)}</div>
        </div>
      </section>

      <section id="popular-menus">
        <div class="container">
          <div class="section-header">
            <h1 class="section-title" tabindex="0">Popular Menus</h1>
          </div>
          <div class="menus">${cardSkeleton(4)}</div>
        </div>
      </section>

      <section id="discover-restaurant">
        <div class="container discover">
          <div class="discover-banner">
            <img
              alt="Chef in the kitchen"
              class="lazyload"
              crossorigin="anonymous"
              data-src="./images/discover-small.webp 400w, ./images/discover-large.webp 800w"
              src="./images/discover-large.webp"
              srcset="./images/discover-small.webp 400w, ./images/discover-large.webp 800w"
              sizes="(max-width: 600px) 400px, 800px"
            />
          </div>
          <div class="discover-content">
            <h1 class="discover-title" tabindex="0">
              Connect <span class="primary-text">With</span> Us
            </h1>

            <p class="discover-text" tabindex="0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est
              dolor, faucibus et iaculis a, lacinia eu mi. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Cras fringilla ullamcorper dui
              vel ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Nulla pulvinar posuere pulvinar.
            </p>

            <button class="discover-button" type="button">Discover Here</button>
          </div>
        </div>
      </section>
    `;
  },

  async afterRendered() {
    await this._renderRecommendedRestaurant();
    this._renderPopularMenus();
  },

  async _renderRecommendedRestaurant() {
    const elementId = '#explore';
    try {
      const restaurants = await Restaurant.recommended();
      renderList(elementId, restaurants);
    } catch (error) {
      handleError({
        error,
        elementId,
        noDataTemplate,
        functionName: '_renderRecommendedRestaurant'
      });
    }
  },

  _renderPopularMenus() {
    const { popularMenus } = dummy;
    renderPopularMenus(popularMenus);
  }
};

export default HomePage;
