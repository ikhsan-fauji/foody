import { restaurantApi } from '../utils/enums';
import request from '../helper/request-helper';
import descendingByRating from '../helper/sorter-helper';
import '../component/RestaurantCard';
import '../component/RestaurantDetail';

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
      const detailElement = document.createElement('restaurant-detail');
      detailElement.restaurantId = id;
      detailElement.detail = response.restaurant;
      const restaurantContent = document.querySelector('#restaurant-content');
      restaurantContent.appendChild(detailElement);
    }
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
