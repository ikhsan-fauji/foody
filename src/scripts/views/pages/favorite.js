import '../../component/RestaurantCard';
import FavoriteRestaurant from '../../data/favorite-restaurant';
import loader from '../../helper/loader-helper';
import handleError from '../../helper/error-helper';
import HeaderTemplate from '../templates/header-template';
import noDataTemplate from '../templates/nodata-template';

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
      if (restaurants && restaurants.length > 0) {
        const listRestaurant = document.querySelector('.restaurants');
        restaurants.forEach((restaurant) => {
          const restaurantCard = document.createElement('restaurant-card');
          restaurantCard.restaurant = restaurant;
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
        functionName: '_renderFavoriteRestaurants'
      });
    }
  }
};

export default FavoritePage;
