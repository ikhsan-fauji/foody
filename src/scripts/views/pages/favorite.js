import FavoriteRestaurant from '../../data/favorite-restaurant';
import { handleError } from '../../helper/error-helper';
import { renderList } from '../templates/restaurant-template';
import { cardSkeleton, noDataTemplate } from '../templates/html-template';

const FavoritePage = {
  async render() {
    return `
      <section id="favorite">
        <div class="container restaurants">
          ${cardSkeleton(8)}
        </div>
      </section>
    `;
  },

  async afterRendered() {
    await this._renderFavoriteRestaurants();
  },

  async _renderFavoriteRestaurants() {
    const elementId = '#favorite';
    try {
      const restaurants = await FavoriteRestaurant.getAll();
      renderList(elementId, restaurants);
    } catch (error) {
      handleError({
        error,
        elementId,
        noDataTemplate,
        functionName: '_renderFavoriteRestaurants'
      });
    }
  }
};

export default FavoritePage;
