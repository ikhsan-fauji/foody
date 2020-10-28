import '../../component/RestaurantDetail';
import UrlParser from '../../routes/url-parser';
import Restaurant from '../../data/restaurant';
import FavoriteRestaurant from '../../data/favorite-restaurant';
import alert from '../../helper/alert-helper';
import HeaderTemplate from '../templates/header-template';
import {
  likeButtonTemplate,
  unLikeButtonTemplate
} from '../templates/like-button-template';

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
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantId = url.verb;
    const restaurantData = await restaurant.detail(restaurantId);
    this._renderDetailContent(restaurantId, restaurantData);
    await this._initLikeAction(restaurantId, restaurantData);
  },

  _renderDetailContent(restaurantId, restaurantData) {
    const elementId = '#restaurant-content';
    const detailElement = document.createElement('restaurant-detail');
    detailElement.restaurantId = restaurantId;
    detailElement.detail = restaurantData;
    const restaurantContent = document.querySelector(elementId);
    restaurantContent.appendChild(detailElement);
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
      console.debug('like', restaurantData);
      await favoriteRestaurant.like(restaurantData);
      alert.success('Success!', 'Like success');
    } catch (error) {
      alert.error('Failed!', 'Like failed');
      console.error(error);
    }
  },

  async _unLikeRestaurant(key) {
    try {
      await favoriteRestaurant.unlike(key);
      alert.success('Success!', 'Unlike success');
    } catch (error) {
      alert.error('Failed!', 'Unlike failed');
      console.error(error);
    }
  }
};

export default RestaurantDetailPage;
