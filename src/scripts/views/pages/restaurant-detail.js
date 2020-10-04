import UrlParser from '../../routes/url-parser';
import RestaurantData from '../../data/restaurant-data';
import HeaderContent from '../templates/header-content';
import '../../component/ReviewForm';

const RestaurantDetail = {
  _detailTemplate() {
    const template = `<section id="restaurant-content"></section>`;

    return template;
  },

  async render() {
    HeaderContent.breadCrumb('Restaurant Detail');
    return this._detailTemplate();
  },

  afterRendered() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantId = url.verb;
    const restaurant = new RestaurantData();
    restaurant.detail(restaurantId);
    // const reviewForm = document.createElement('review-form');
    // document.querySelector('#review-form').appendChild(reviewForm);
  }
};

export default RestaurantDetail;
