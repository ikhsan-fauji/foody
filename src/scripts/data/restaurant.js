import '../component/RestaurantCard';
import '../component/RestaurantDetail';
import restaurantApi from '../globals/api';
import request from '../helper/request-helper';
import descendingByRating from '../helper/sorter-helper';

class Restaurant {
  async _fetchRestaurants() {
    let response = await request.get(restaurantApi.list);
    if (response.error) {
      throw Error(response.message);
    } else {
      response = response.restaurants.sort(descendingByRating);
    }
    return response;
  }

  async recommended() {
    let restaurants = await this._fetchRestaurants();
    if (restaurants && restaurants.length > 0) {
      restaurants = restaurants.slice(0, 4);
    }
    return restaurants || [];
  }

  list() {
    return this._fetchRestaurants();
  }

  async detail(id) {
    const response = await request.get(`${restaurantApi.detail}${id}`);
    if (response.error) {
      throw Error(response.message);
    } else {
      return response.restaurant;
    }
  }
}

export default Restaurant;
