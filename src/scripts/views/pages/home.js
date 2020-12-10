import '../../component/RestaurantCard';
import '../../component/MenuCard';
import dummy from '../../data/DATA.json';
import Restaurant from '../../data/restaurant';
import handleError from '../../helper/error-helper';
import { hero } from '../templates/header-template';
import { renderList } from '../templates/restaurant-template';
import { restaurantCard } from '../templates/skeleton-template';

const HomePage = {
  render() {
    hero();
    return `
      <section id="explore">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title" tabindex="0">Explore Restaurant</h2>
          </div>
          <div class="restaurants">${restaurantCard(4)}</div>
        </div>
      </section>

      <section id="popular-menus">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title" tabindex="0">Popular Menus</h2>
          </div>
          <div class="menus">${restaurantCard(4)}</div>
        </div>
      </section>

      <section id="discover-restaurant">
        <div class="container discover">
          <div class="discover-banner">
            <img
              class="lazyload"
              data-src="./images/heros/discover.webp"
              alt="Chef in the kitchen"
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
        functionName: '_renderRecommendedRestaurant'
      });
    }
  },

  _renderPopularMenus() {
    const { popularMenus } = dummy;
    const popularMenusElement = document.querySelector('.menus');
    popularMenusElement.innerHTML = '';
    popularMenus.forEach((menu) => {
      const menuCard = document.createElement('menu-card');
      menuCard.menu = menu;
      popularMenusElement.appendChild(menuCard);
    });
  }
};

export default HomePage;
