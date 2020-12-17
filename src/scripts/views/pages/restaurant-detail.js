import '../../component/restaurant-detail';
import UrlParser from '../../routes/url-parser';
import Restaurant from '../../data/restaurant';
import FavoriteRestaurant from '../../data/favorite-restaurant';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import { handleError } from '../../helper/error-helper';
import { noDataTemplate, detailSkeleton } from '../templates/html-template';

const RestaurantDetailPage = {
  async render() {
    return `
      <section id="restaurant-content">
        ${detailSkeleton()}
      </section>
      <div id="like-btn-container"></div>
    `;
  },

  async afterRendered() {
    const elementId = '#restaurant-content';
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurantId = url.verb;
      const restaurantData = await Restaurant.detail(restaurantId);
      this._renderDetailContent(restaurantId, restaurantData);
      await LikeButtonPresenter.init({
        restaurant: restaurantData,
        favoriteRestaurant: FavoriteRestaurant,
        likeButtonContainer: document.querySelector('#like-btn-container')
      });
    } catch (error) {
      handleError({
        error,
        elementId,
        noDataTemplate,
        functionName: 'afterRendered'
      });
    }
  },

  _renderDetailContent(restaurantId, restaurantData) {
    const restaurantContent = document.querySelector('#restaurant-content');
    restaurantContent.innerHTML = '';
    if (restaurantData) {
      const detailElement = document.createElement('restaurant-detail');
      detailElement.restaurantId = restaurantId;
      detailElement.detail = restaurantData;
      restaurantContent.appendChild(detailElement);
    } else {
      restaurantContent.innerHTML = noDataTemplate();
    }
  }
};

export default RestaurantDetailPage;
