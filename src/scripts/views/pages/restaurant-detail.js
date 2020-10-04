import UrlParser from '../../routes/url-parser';
import RestaurantData from '../../data/restaurant-data';
import HeaderContent from '../templates/header-content';

const RestaurantDetail = {
  async render() {
    HeaderContent.breadCrumb('Restaurant Detail');
    return `<section id="restaurant-content"></section>`;
  },

  afterRendered() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantId = url.verb;
    const restaurant = new RestaurantData();
    restaurant.detail(restaurantId);
  }
};

export default RestaurantDetail;
