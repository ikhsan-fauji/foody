import HeaderContent from '../templates/header-content';
import dummy from '../../data/DATA.json';
import Menu from '../../data/menu-data';
import Restaurant from '../../data/restaurant-data';

const Home = {
  async render() {
    HeaderContent.hero();

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

  afterRendered() {
    const restaurant = new Restaurant();
    restaurant.recommended();
    const menu = new Menu(dummy.popularMenus);
    menu.popular();
  }
};

export default Home;
