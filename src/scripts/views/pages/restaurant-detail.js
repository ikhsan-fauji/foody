import '../../component/RestaurantDetail';
import UrlParser from '../../routes/url-parser';
import Restaurant from '../../data/restaurant';
import FavoriteRestaurant from '../../data/favorite-restaurant';
import alert from '../../helper/alert-helper';
import loader from '../../helper/loader-helper';
import handleError from '../../helper/error-helper';
import HeaderTemplate from '../templates/header-template';
import {
  likeButtonTemplate,
  unLikeButtonTemplate
} from '../templates/like-button-template';
import noDataTemplate from '../templates/nodata-template';

const restaurant = new Restaurant();
const favoriteRestaurant = new FavoriteRestaurant();

const RestaurantDetailPage = {
  async render() {
    HeaderTemplate.breadCrumb('Restaurant Detail');
    return `
      <section id="restaurant-content"></section>
      <div id="like-btn-container"></div>
    `;
  },

  async afterRendered() {
    const elementId = '#restaurant-content';
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurantId = url.verb;
      loader.start(elementId);
      const restaurantData = await restaurant.detail(restaurantId);
      loader.stop();
      this._renderDetailContent(restaurantId, restaurantData);
      await this._initLikeAction(restaurantId, restaurantData);
    } catch (error) {
      loader.stop();
      handleError({
        error,
        elementId,
        functionName: 'afterRendered'
      });
    }
  },

  _renderDetailContent(restaurantId, restaurantData) {
    const restaurantContent = document.querySelector('#restaurant-content');
    if (restaurantData) {
      const detailElement = document.createElement('restaurant-detail');
      detailElement.restaurantId = restaurantId;
      detailElement.detail = restaurantData;
      restaurantContent.appendChild(detailElement);
    } else {
      restaurantContent.innerHTML = noDataTemplate();
    }
  },

  async _initLikeAction(restaurantId, restaurantData) {
    const likeButtonContainer = document.querySelector('#like-btn-container');
    const savedData = await favoriteRestaurant.getByKey(restaurantId);

    if (savedData) {
      likeButtonContainer.innerHTML = unLikeButtonTemplate();
      await this._clickEvent({
        restaurantData,
        button: '#un-like-button',
        callback: async () => {
          await this._unLikeRestaurant(restaurantId);
        }
      });
    } else {
      likeButtonContainer.innerHTML = likeButtonTemplate();
      await this._clickEvent({
        restaurantData,
        button: '#like-button',
        callback: async () => {
          await this._likeRestaurant(restaurantData);
        }
      });
    }
  },

  async _clickEvent({ button, callback, restaurantData }) {
    const buttonElement = document.querySelector(button);
    await buttonElement.addEventListener('click', async (event) => {
      await callback();
      await this._initLikeAction(restaurantData.id, restaurantData);
      event.stopPropagation();
    });
  },

  async _likeRestaurant(restaurantData) {
    try {
      await favoriteRestaurant.like(restaurantData);
      alert.success('Awesome', 'Success to like this restaurant');
    } catch (error) {
      alert.error('Sorry', 'Failed to like this restaurant');
      console.error('_likeRestaurant', error);
    }
  },

  async _unLikeRestaurant(key) {
    try {
      await favoriteRestaurant.unlike(key);
      alert.success('Awesome', 'Success to unlike this restaurant');
    } catch (error) {
      alert.error('Sorry', 'Failed to unlike this restaurant');
      console.error('_unLikeRestaurant', error);
    }
  }
};

export default RestaurantDetailPage;
