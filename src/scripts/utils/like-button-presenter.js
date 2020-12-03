import {
  likeButtonTemplate,
  unLikeButtonTemplate
} from '../views/templates/like-button-template';
import alert from '../helper/alert-helper';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favoriteRestaurant, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._favoriteRestaurant = favoriteRestaurant;
    this._restaurant = restaurant;

    await this._render();
  },

  async _render() {
    const isExist = await this._isExist(this._restaurant.id);
    if (isExist) {
      this._likeButtonContainer.innerHTML = unLikeButtonTemplate();
      await this._clickEvent({
        data: this._restaurant,
        button: '#un-like-button',
        callback: async (data) => {
          await this._unLikeRestaurant(data.id);
        }
      });
    } else {
      this._likeButtonContainer.innerHTML = likeButtonTemplate();
      await this._clickEvent({
        data: this._restaurant,
        button: '#like-button',
        callback: async (data) => {
          await this._likeRestaurant(data);
        }
      });
    }
  },

  async _isExist(id) {
    const savedData = await this._favoriteRestaurant.getByKey(id);
    return !!savedData;
  },

  async _clickEvent({ button, callback, data }) {
    const buttonElement = document.querySelector(button);
    await buttonElement.addEventListener('click', async (event) => {
      await callback(data);
      await this.init({
        restaurant: data,
        favoriteRestaurant: this._favoriteRestaurant,
        likeButtonContainer: this._likeButtonContainer
      });
      event.stopPropagation();
    });
  },

  async _likeRestaurant(restaurantData) {
    try {
      await this._favoriteRestaurant.like(restaurantData);
      alert.success('Awesome', 'Success to like this restaurant');
    } catch (error) {
      alert.error('Sorry', 'Failed to like this restaurant');
      console.error('_likeRestaurant', error);
    }
  },

  async _unLikeRestaurant(key) {
    try {
      await this._favoriteRestaurant.unlike(key);
      alert.success('Awesome', 'Success to unlike this restaurant');
    } catch (error) {
      alert.error('Sorry', 'Failed to unlike this restaurant');
      console.error('_unLikeRestaurant', error);
    }
  }
};

export default LikeButtonPresenter;
