import '../component/RestaurantCard';
import '../component/RestaurantDetail';
import restaurantApi from '../globals/api';
import idb from '../helper/idb-helper';
import loader from '../helper/loader-helper';
import request from '../helper/request-helper';
import descendingByRating from '../helper/sorter-helper';
import alert from '../helper/alert-helper';
import noDataTemplate from '../views/templates/nodata-template';

const logError = (params) => {
  console.error('ERROR: ', params);
};

const handleError = ({ elementId, functionName, error }) => {
  const content = document.querySelector(elementId);
  if (error.message === 'Failed to fetch') {
    content.innerHTML = noDataTemplate('Connection failed');
    logError(`${functionName} >> Offline`);
  } else {
    content.innerHTML = noDataTemplate(error.message);
    logError(`${functionName} >> ${error.message}`);
  }
};

class RestaurantData {
  async _fetchListRestaurant() {
    let response = await request.get(restaurantApi.list);
    if (response.error) {
      throw Error(response.message);
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
    try {
      const elementId = '#explore';
      loader.start(elementId);
      let restaurants = await this._fetchListRestaurant();
      loader.stop();
      if (restaurants && restaurants.length > 0) {
        restaurants = restaurants.slice(0, 4);
        this._renderList(restaurants);
      } else {
        this._noDataTemplate(elementId);
      }
    } catch (error) {
      handleError('recommended', error);
    }
  }

  _renderList(restaurants) {
    const listRestaurant = document.querySelector('.restaurants');
    restaurants.forEach((restaurant) => {
      const restaurantCard = document.createElement('restaurant-card');
      restaurantCard.restaurant = restaurant;
      listRestaurant.appendChild(restaurantCard);
    });
  }

  async list() {
    const elementId = '#restaurant';
    try {
      loader.start(elementId);
      const restaurants = await this._fetchListRestaurant();
      loader.stop();
      if (restaurants && restaurants.length > 0) {
        this._renderList(restaurants);
      } else {
        this._noDataTemplate(elementId);
      }
    } catch (error) {
      handleError({
        elementId,
        error,
        functionName: 'list'
      });
    }
  }

  async favorites() {
    const elementId = '#favorite';
    try {
      loader.start(elementId);
      const restaurants = await idb.getAll();
      loader.stop();
      if (restaurants && restaurants.length > 0) {
        this._renderList(restaurants);
      } else {
        this._noDataTemplate(elementId);
      }
    } catch (error) {
      handleError({
        elementId,
        error,
        functionName: 'favorites'
      });
    }
  }

  findFavoriteByKey(key) {
    return idb.getByKey(key);
  }

  async detail(id) {
    const elementId = '#restaurant-content';
    try {
      loader.start(elementId);
      const response = await request.get(`${restaurantApi.detail}${id}`);
      loader.stop();
      if (response.error) {
        throw Error(response.message);
      } else {
        this._restaurant = response.restaurant;
        const detailElement = document.createElement('restaurant-detail');
        detailElement.restaurantId = id;
        detailElement.detail = this._restaurant;
        const restaurantContent = document.querySelector(elementId);
        restaurantContent.appendChild(detailElement);
      }
    } catch (error) {
      handleError({
        elementId,
        error,
        functionName: 'detail'
      });
    }
  }

  async likeRestaurant() {
    try {
      const restaurantData = this._restaurant;
      await idb.insert(restaurantData);
      alert.success('Success!', 'Like success');
    } catch (error) {
      alert.error('Failed!', 'Like failed');
      logError(error.message);
    }
  }

  async unLikeRestaurant(key) {
    try {
      await idb.deleteByKey(key);
      alert.success('Success!', 'Unlike success');
    } catch (error) {
      alert.error('Failed!', 'Unlike failed');
      logError(error.message);
    }
  }
}

export default RestaurantData;
