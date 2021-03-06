import restaurantApi from '../globals/api';
import descendingByRating from '../helper/sorter-helper';
import request from '../helper/request-helper';

class Restaurant {
  static async _fetchRestaurants() {
    let response = await request.get(restaurantApi.list);
    if (response.error) {
      throw Error(response.message);
    } else {
      response = response.restaurants.sort(descendingByRating);
    }
    return response;
  }

  static async recommended() {
    let restaurants = await this._fetchRestaurants();
    if (restaurants && restaurants.length > 0) {
      restaurants = restaurants.slice(0, 4);
    }
    return restaurants || [];
  }

  static list() {
    return this._fetchRestaurants();
  }

  static async detail(id) {
    const response = await request.get(`${restaurantApi.detail}${id}`);
    if (response.error) {
      throw Error(response.message);
    } else {
      return response.restaurant;
    }
  }
}

export default Restaurant;
