import '../../component/RestaurantCard';
import HeaderTemplate from '../templates/header-template';
import FavoriteRestaurant from '../../data/favorite-restaurant';

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
    const favorite = new FavoriteRestaurant();
    const restaurants = await favorite.getAll();
    this._renderFavoriteRestaurants(restaurants);
  },

  _renderFavoriteRestaurants(restaurants) {
    const listRestaurant = document.querySelector('.restaurants');
    restaurants.forEach((restaurant) => {
      const restaurantCard = document.createElement('restaurant-card');
      restaurantCard.restaurant = restaurant;
      listRestaurant.appendChild(restaurantCard);
    });
  }
};

export default FavoritePage;
