import '../../component/RestaurantCard';
import '../../component/MenuCard';
import dummy from '../../data/DATA.json';
import HeaderTemplate from '../templates/header-template';
import Restaurant from '../../data/restaurant';
import loader from '../../helper/loader-helper';

const HomePage = {
  async render() {
    HeaderTemplate.hero();

    return `
      <section id="explore">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title" tabindex="0">Explore Restaurant</h2>
          </div>
          <div class="restaurants"></div>
        </div>
      </section>

      <section id="popular-menus">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title" tabindex="0">Popular Menus</h2>
          </div>
          <div class="menus"></div>
        </div>
      </section>

      <section id="discover-restaurant">
        <div class="container discover">
          <div class="discover-banner">
            <img
              class="lazyload"
              data-src="./images/heros/hero-image_1.webp"
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
    try {
      const restaurant = new Restaurant();
      loader.start('#explore');
      const restaurants = await restaurant.recommended();
      loader.stop();
      const listRestaurant = document.querySelector('.restaurants');
      restaurants.forEach((restaurantData) => {
        const restaurantCard = document.createElement('restaurant-card');
        restaurantCard.restaurant = restaurantData;
        listRestaurant.appendChild(restaurantCard);
      });
    } catch (error) {
      loader.stop();
      console.error('_renderRecommendedRestaurant', error);
    }
  },

  _renderPopularMenus() {
    const { popularMenus } = dummy;
    const popularMenusElement = document.querySelector('.menus');
    popularMenus.forEach((menu) => {
      const menuCard = document.createElement('menu-card');
      menuCard.menu = menu;
      popularMenusElement.appendChild(menuCard);
    });
  }
};

export default HomePage;
