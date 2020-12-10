import '../../component/RestaurantCard';
import FavoriteRestaurant from '../../data/favorite-restaurant';
import handleError from '../../helper/error-helper';
import { breadCrumb } from '../templates/header-template';
import { renderList } from '../templates/restaurant-template';
import { restaurantCard } from '../templates/skeleton-template';

const FavoritePage = {
  async render() {
    breadCrumb('Favorites');
    return `
      <section id="favorite">
        <div class="container restaurants">
          ${restaurantCard(8)}
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
        functionName: '_renderFavoriteRestaurants'
      });
    }
  }
};

export default FavoritePage;
