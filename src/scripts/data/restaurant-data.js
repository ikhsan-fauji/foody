import '../component/RestaurantCard';
import '../component/RestaurantDetail';
import restaurantApi from '../globals/api';
import idb from '../helper/idb-helper';
import loader from '../helper/loader-helper';
import request from '../helper/request-helper';
import descendingByRating from '../helper/sorter-helper';
import alert from '../helper/alert-helper';
import noDataTemplate from '../views/templates/nodata-template';

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

  _noDataTemplate(id) {
    const content = document.querySelector(id);
    content.innerHTML = noDataTemplate();
  }

  async recommended() {
    const elementId = '#explore';
    loader.start(elementId);
    const restaurants = await this._fetchListRestaurant();
    loader.stop();
    this._restaurants = restaurants.slice(0, 4);
    if (this._restaurants && this._restaurants.length > 0) {
      this._renderList();
    } else {
      this._noDataTemplate(elementId);
    }
  }

  _renderList() {
    const listRestaurant = document.querySelector('.restaurants');
    this._restaurants.forEach((restaurant) => {
      const restaurantCard = document.createElement('restaurant-card');
      restaurantCard.restaurant = restaurant;
      listRestaurant.appendChild(restaurantCard);
    });
  }

  async list() {
    const elementId = '#explore';
    loader.start(elementId);
    this._restaurants = await this._fetchListRestaurant();
    loader.stop();
    if (this._restaurants && this._restaurants.length > 0) {
      this._renderList();
    } else {
      this._noDataTemplate(elementId);
    }
  }

  async favorites() {
    const elementId = '#explore';
    loader.start('#explore');
    this._restaurants = await idb.getAll();
    loader.stop();
    if (this._restaurants && this._restaurants.length > 0) {
      this._renderList();
    } else {
      this._noDataTemplate(elementId);
    }
  }

  findFavoriteByKey(key) {
    return idb.getByKey(key);
  }

  async detail(id) {
    const elementId = '#restaurant-content';
    loader.start(elementId);
    const response = await request.get(`${restaurantApi.detail}${id}`);
    loader.stop();
    if (response && response.error) {
      this._noDataTemplate(elementId);
      console.error(response.message);
    } else if (response.restaurant) {
      this._restaurant = response.restaurant;
      const detailElement = document.createElement('restaurant-detail');
      detailElement.restaurantId = id;
      detailElement.detail = this._restaurant;
      const restaurantContent = document.querySelector('#restaurant-content');
      restaurantContent.appendChild(detailElement);
    } else {
      this._noDataTemplate(elementId);
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
