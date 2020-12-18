import Restaurant from '../../data/restaurant';
import { handleError } from '../../helper/error-helper';
import { renderList } from '../templates/restaurant-template';
import { cardSkeleton, noDataTemplate } from '../templates/html-template';

const RestaurantPage = {
  async render() {
    return `
      <section id="restaurant">
        <div class="container restaurants">
          ${cardSkeleton(8)}
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
        noDataTemplate,
        functionName: '_renderRestaurants'
      });
    }
  }
};

export default RestaurantPage;
