import '../../component/RestaurantCard';
import FavoriteRestaurant from '../../data/favorite-restaurant';
import loader from '../../helper/loader-helper';
import handleError from '../../helper/error-helper';
import HeaderTemplate from '../templates/header-template';
import { renderList } from '../templates/restaurant-template';

const FavoritePage = {
  async render() {
    HeaderTemplate.breadCrumb('Favorites');

    return `
      <section id="favorite">
        <div class="container restaurants">
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
      const favorite = new FavoriteRestaurant();
      loader.start(elementId);
      const restaurants = await favorite.getAll();
      loader.stop();
      renderList(elementId, restaurants);
    } catch (error) {
      loader.stop();
      handleError({
        error,
        elementId,
        functionName: '_renderFavoriteRestaurants'
      });
    }
  }
};

export default FavoritePage;
