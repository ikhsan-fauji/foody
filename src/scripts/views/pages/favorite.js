import '../../component/RestaurantCard';
import FavoriteRestaurant from '../../data/favorite-restaurant';
import handleError from '../../helper/error-helper';
import HeaderTemplate from '../templates/header-template';
import { renderList } from '../templates/restaurant-template';
import skeleton from '../templates/skeleton-template';

const FavoritePage = {
  async render() {
    HeaderTemplate.breadCrumb('Favorites');

    return `
      <section id="favorite">
        <div class="container restaurants">
          ${skeleton.restaurantCard(8)}
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
