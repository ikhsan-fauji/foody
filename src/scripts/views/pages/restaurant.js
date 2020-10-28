import '../../component/RestaurantCard';
import Restaurant from '../../data/restaurant';
import loader from '../../helper/loader-helper';
import handleError from '../../helper/error-helper';
import HeaderTemplate from '../templates/header-template';
import noDataTemplate from '../templates/nodata-template';

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
    const elementId = '#restaurant';
    try {
      const restaurant = new Restaurant();
      loader.start(elementId);
      const restaurants = await restaurant.list();
      loader.stop();
      if (restaurants && restaurants.length > 0) {
        const listRestaurant = document.querySelector('.restaurants');
        restaurants.forEach((restaurantData) => {
          const restaurantCard = document.createElement('restaurant-card');
          restaurantCard.restaurant = restaurantData;
          listRestaurant.appendChild(restaurantCard);
        });
      } else {
        noDataTemplate();
      }
    } catch (error) {
      loader.stop();
      handleError({
        error,
        elementId,
        functionName: '_renderRestaurants'
      });
    }
  }
};

export default RestaurantPage;
