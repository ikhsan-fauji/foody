import '../../component/RestaurantCard';
import Restaurant from '../../data/restaurant';
import handleError from '../../helper/error-helper';
import HeaderTemplate from '../templates/header-template';
import { renderList } from '../templates/restaurant-template';
import skeleton from '../templates/skeleton-template';

const RestaurantPage = {
  async render() {
    HeaderTemplate.breadCrumb('Restaurants');

    return `
      <section id="restaurant">
        <div class="container restaurants">
          ${skeleton.restaurantCard(8)}
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
      const restaurants = await restaurant.list();
      renderList(elementId, restaurants);
    } catch (error) {
      handleError({
        error,
        elementId,
        functionName: '_renderRestaurants'
      });
    }
  }
};

export default RestaurantPage;
