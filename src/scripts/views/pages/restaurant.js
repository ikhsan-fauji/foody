import '../../component/RestaurantCard';
import Restaurant from '../../data/restaurant';
import loader from '../../helper/loader-helper';
import handleError from '../../helper/error-helper';
import HeaderTemplate from '../templates/header-template';
import { renderList } from '../templates/restaurant-template';

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
      renderList(restaurants);
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
