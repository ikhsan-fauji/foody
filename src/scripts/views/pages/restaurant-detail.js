import UrlParser from '../../routes/url-parser';
import RestaurantData from '../../data/restaurant-data';
import HeaderContent from '../templates/header-content';
import {
  likeButtonTemplate,
  unLikeButtonTemplate
} from '../templates/like-button-template';

const restaurant = new RestaurantData();

const RestaurantDetail = {
  async render() {
    HeaderContent.breadCrumb('Restaurant Detail');
    return `
      <section id="restaurant-content"></section>
      <div id="like-btn-container"></div>
    `;
  },

  afterRendered() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantId = url.verb;
    restaurant.detail(restaurantId);

    this._initLikeAction(restaurantId);
  },

  async _initLikeAction(restaurantId) {
    const likeButtonContainer = document.querySelector('#like-btn-container');
    const savedData = await restaurant.findFavoriteByKey(restaurantId);
    if (savedData) {
      likeButtonContainer.innerHTML = unLikeButtonTemplate();
      const unLikeButton = document.querySelector('#un-like-button');
      unLikeButton.addEventListener('click', (event) => {
        restaurant.unLikeRestaurant(restaurantId);
        this._initLikeAction(restaurantId);
        event.stopPropagation();
      });
    } else {
      likeButtonContainer.innerHTML = likeButtonTemplate();
      const likeButton = document.querySelector('#like-button');
      likeButton.addEventListener('click', (event) => {
        restaurant.likeRestaurant();
        this._initLikeAction(restaurantId);
        event.stopPropagation();
      });
    }
  }
};

export default RestaurantDetail;
