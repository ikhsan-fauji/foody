import '../../component/RestaurantCard';
import HeaderTemplate from '../templates/header-template';
import Restaurant from '../../data/restaurant';
import loader from '../../helper/loader-helper';

const RestaurantPage = {
  async render() {
    HeaderTemplate.breadCrumb('Restaurants');

    return `
      <section id="restaurant">
        <div class="container restaurants">
        </div>
      </section>
    `;
  },

  async afterRendered() {
    await this._renderRestaurants();
  },

  async _renderRestaurants() {
    try {
      const restaurant = new Restaurant();
      loader.start();
      const restaurants = await restaurant.list();
      loader.stop();
      const listRestaurant = document.querySelector('.restaurants');
      restaurants.forEach((restaurantData) => {
        const restaurantCard = document.createElement('restaurant-card');
        restaurantCard.restaurant = restaurantData;
        listRestaurant.appendChild(restaurantCard);
      });
    } catch (error) {
      loader.stop();
      console.error('_renderRestaurants', error);
    }
  }
};

export default RestaurantPage;
