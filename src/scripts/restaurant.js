import './component/RestaurantCard';

class Restaurant {
  constructor(restaurants) {
    this._restaurants = restaurants || [];
  }

  renderAll() {
    if (this._restaurants.length > 0) {
      const listRestaurant = document.querySelector('.restaurants');
      this._restaurants.forEach((restaurant) => {
        const restaurantCard = document.createElement('restaurant-card');
        restaurantCard.restaurant = restaurant;
        listRestaurant.appendChild(restaurantCard);
      });
    }
  }
}

export default Restaurant;
