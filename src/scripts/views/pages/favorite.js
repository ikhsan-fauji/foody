import '../../component/RestaurantCard';
import HeaderTemplate from '../templates/header-template';
import FavoriteRestaurant from '../../data/favorite-restaurant';
import loader from '../../helper/loader-helper';

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
    try {
      const favorite = new FavoriteRestaurant();
      loader.start('#favorite');
      const restaurants = await favorite.getAll();
      loader.stop();
      const listRestaurant = document.querySelector('.restaurants');
      restaurants.forEach((restaurant) => {
        const restaurantCard = document.createElement('restaurant-card');
        restaurantCard.restaurant = restaurant;
        listRestaurant.appendChild(restaurantCard);
      });
    } catch (error) {
      loader.stop();
      console.error('_renderFavoriteRestaurants', error);
    }
  }
};

export default FavoritePage;
