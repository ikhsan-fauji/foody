import '../../component/RestaurantCard';
import HeaderTemplate from '../templates/header-template';
import Restaurant from '../../data/restaurant';

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
    const restaurant = new Restaurant();
    const restaurants = await restaurant.list();
    this._renderRestaurants(restaurants);
  },

  _renderRestaurants(restaurants) {
    const listRestaurant = document.querySelector('.restaurants');
    restaurants.forEach((restaurant) => {
      const restaurantCard = document.createElement('restaurant-card');
      restaurantCard.restaurant = restaurant;
      listRestaurant.appendChild(restaurantCard);
    });
  }
};

export default RestaurantPage;
