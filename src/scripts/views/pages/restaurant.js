import HeaderContent from '../templates/header-content';
import RestaurantData from '../../data/restaurant-data';

const Restaurant = {
  async render() {
    HeaderContent.breadCrumb('Restaurants');

    return `
      <section id="explore">
        <div class="container">
          <div class="restaurants">
          </div>
        </div>
      </section>
    `;
  },

  afterRendered() {
    const restaurant = new RestaurantData();
    restaurant.list();
  }
};

export default Restaurant;
