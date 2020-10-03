import { restaurantApi } from '../utils/enums';
import request from '../helper/request-helper';
import descendingByRating from '../helper/sorter-helper';
import '../component/RestaurantCard';

class RestaurantData {
  async _fetchListRestaurant() {
    let response = await request.get(restaurantApi.list);
    if (response && response.error) {
      console.error(response.message);
    } else {
      response = response.restaurants.sort(descendingByRating);
    }
    return response;
  }

  async recommended() {
    const restaurants = await this._fetchListRestaurant();
    this._restaurants = restaurants.slice(0, 4);
    this._renderList();
  }

  async list() {
    this._restaurants = await this._fetchListRestaurant();
    this._renderList();
  }

  async detail(id) {
    const response = await request.get(`${restaurantApi.detail}${id}`);
    if (response && response.error) {
      console.error(response.message);
    } else {
      console.debug(response.restaurant);
    }
  }

  async review(value) {
    const dummyId = '36fa3p5gw45kfhujxow';
    const reviewData = { id: dummyId, name: 'Budi', review: value };
    request.post(restaurantApi.review, reviewData);
  }

  _renderList() {
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

export default RestaurantData;
