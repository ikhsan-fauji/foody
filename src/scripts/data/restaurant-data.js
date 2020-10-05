import '../component/RestaurantCard';
import '../component/RestaurantDetail';
import { restaurantApi } from '../utils/enums';
import idb from '../helper/idb-helper';
import request from '../helper/request-helper';
import descendingByRating from '../helper/sorter-helper';
import alert from '../helper/alert-helper';

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

  async list() {
    this._restaurants = await this._fetchListRestaurant();
    this._renderList();
  }

  async favorites() {
    this._restaurants = await idb.getAll();
    this._renderList();
  }

  findFavoriteByKey(key) {
    return idb.getByKey(key);
  }

  async detail(id) {
    const response = await request.get(`${restaurantApi.detail}${id}`);
    if (response && response.error) {
      console.error(response.message);
    } else {
      this._restaurant = response.restaurant;
      const detailElement = document.createElement('restaurant-detail');
      detailElement.restaurantId = id;
      detailElement.detail = this._restaurant;
      const restaurantContent = document.querySelector('#restaurant-content');
      restaurantContent.appendChild(detailElement);
    }
  }

  async likeRestaurant() {
    try {
      const restaurantData = this._restaurant;
      await idb.upsert(restaurantData);
      alert.success('Success!', 'Like success');
    } catch (error) {
      alert.error('Failed!', 'Like failed');
    }
  }

  async unLikeRestaurant(key) {
    try {
      await idb.deleteByKey(key);
      alert.success('Success!', 'Unlike success');
    } catch (error) {
      alert.error('Failed!', 'Unlike failed');
    }
  }
}

export default RestaurantData;
