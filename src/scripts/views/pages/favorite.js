import HeaderContent from '../templates/header-content';
import RestaurantData from '../../data/restaurant-data';

const Favorite = {
  async render() {
    HeaderContent.breadCrumb('Favorites');

    return `
      <section id="explore">
        <div class="container restaurants">
        </div>
      </section>
    `;
  },

  afterRendered() {
    const restaurant = new RestaurantData();
    restaurant.favorites();
  }
};

export default Favorite;
