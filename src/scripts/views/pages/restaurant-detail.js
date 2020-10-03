import UrlParser from '../../routes/url-parser';
import RestaurantData from '../../data/restaurant-data';
import HeaderContent from '../templates/header-content';

const RestaurantDetail = {
  async render() {
    HeaderContent.breadCrumb('Restaurant Detail');
    return `
      <section id="restaurant-content">
        <div class="container">
          <section class="restaurant-detail">
            <img class="restaurant-image" src="./images/heros/hero-image_4.jpg" alt="restaurant image" />
            <h2 class="restaurant-name primary-text">Restaurant Name</h2>
            <div class="restaurant-info">
              <span id="rating-icon" class="material-icons">grade</span>
              <label for="rating-icon" tabindex="0" aria-label="Restaurant rating point is 5">5</label>
              <span id="rating-icon" class="material-icons">place</span>
              <label for="rating-icon" tabindex="0" aria-label="Restaurant rating point is 5">Bandung</label>
              |
              <label for="rating-icon" tabindex="0" aria-label="Restaurant rating point is 5">Categories: </label>
              <span class="category badge">Bandung</span>
            </div>
            <p class="restaurant-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elit ligula, sollicitudin vel commodo vitae, pellentesque dapibus velit. Phasellus feugiat magna et pulvinar interdum. Vestibulum justo urna, consectetur vel lacus ac, finibus tristique arcu. Donec pretium, leo et tristique varius, ex sem tristique purus, in facilisis metus dolor vitae tellus. Nulla ac nunc tristique, viverra justo eget, lobortis leo. Quisque sem mi, eleifend eu magna auctor, suscipit lacinia nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris euismod hendrerit dolor sit amet faucibus. Etiam id commodo neque. Phasellus volutpat hendrerit vestibulum. Maecenas vel pulvinar dolor, sed posuere lectus. Suspendisse ultricies sapien et eros pulvinar finibus. Mauris eleifend ante nisi, nec rutrum tellus sodales sit amet.</p>

            <section class="restaurant-menus">
              <div class="foods">
                <h3 class="h-3 primary-text">Foods</h3>
                <ul class="list-menus">
                  <li class="menu-item">Drink Name</li>
                  <li class="menu-item">Drink Name</li>
                  <li class="menu-item">Drink Name</li>
                  <li class="menu-item">Drink Name</li>
                  <li class="menu-item">Drink Name</li>
                </ul>
              </div>

              <div class="drinks">
                <h3 class="h-3 primary-text">Drinks</h3>
                <ul class="list-menus">
                  <li class="menu-item">Drink Name</li>
                  <li class="menu-item">Drink Name</li>
                  <li class="menu-item">Drink Name</li>
                  <li class="menu-item">Drink Name</li>
                  <li class="menu-item">Drink Name</li>
                </ul>
              </div>
            </section>
          </section>

          <section class="restaurant-review">
            <h2 class="primary-text">Consumer Reviews</h2>
            <ul class="reviews">
              <li class="review-item">
                <h4 class="reviewer">Nama</h4>
                <i class="review-date">20 Oktober 2020</i>
                <p class="review-detail">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elit ligula, sollicitudin vel commodo vitae, pellentesque dapibus velit. Phasellus feugiat magna et pulvinar interdum.</p>
              </li>
              <li class="review-item">
                <h4 class="reviewer">Nama</h4>
                <i class="review-date">20 Oktober 2020</i>
                <p class="review-detail">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elit ligula, sollicitudin vel commodo vitae, pellentesque dapibus velit. Phasellus feugiat magna et pulvinar interdum.</p>
              </li>
              <li class="review-item">
                <h4 class="reviewer">Nama</h4>
                <i class="review-date">20 Oktober 2020</i>
                <p class="review-detail">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elit ligula, sollicitudin vel commodo vitae, pellentesque dapibus velit. Phasellus feugiat magna et pulvinar interdum.</p>
              </li>
            </ul>

            <h2 class="primary-text">What do you think?</h2>
            <form action="#" class="review-form">
              <div class="form-input">
                <input type="text" placeholder="Nama"/>
              </div>
              <div class="form-input">
                <textarea rows="3" placeholder="Message"></textarea>
              </div>
              <button type="button" class="btn-submit btn-primary">Submit</button>
            </form>
          </section>
        </div>
      </section>
    `;
  },

  afterRendered() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantId = url.verb;
    const restaurant = new RestaurantData();
    restaurant.detail(restaurantId);
  }
};

export default RestaurantDetail;
