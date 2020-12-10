import '../../component/RestaurantCard';
import Restaurant from '../../data/restaurant';
import handleError from '../../helper/error-helper';
import { breadCrumb } from '../templates/header-template';
import { renderList } from '../templates/restaurant-template';
import { restaurantCard } from '../templates/skeleton-template';

const RestaurantPage = {
  render() {
    breadCrumb('Restaurants');
    return `
      <section id="restaurant">
        <div class="container restaurants">
          ${restaurantCard(8)}
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
      const restaurants = await Restaurant.list();
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
