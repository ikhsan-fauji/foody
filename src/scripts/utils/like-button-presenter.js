import {
  likeButtonTemplate,
  dislikeButtonTemplate
} from '../views/templates/like-button-template';

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
      this._likeButtonContainer.innerHTML = dislikeButtonTemplate();
      await this._clickEvent({
        data: this._restaurant,
        button: '#dislike-button',
        callback: async (data) => {
          await this._dislikeRestaurant(data.id);
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
    try {
      const savedData = await this._favoriteRestaurant.getByKey(id);
      return !!savedData;
    } catch (error) {
      return false;
    }
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
      this._alert({
        type: 'success',
        title: 'Awesome',
        message: 'Success to like this restaurant'
      });
    } catch (error) {
      this._alert({
        type: 'error',
        title: 'Sorry',
        message: 'Failed to like this restaurant'
      });
      console.error('_likeRestaurant', error);
    }
  },

  async _dislikeRestaurant(key) {
    try {
      await this._favoriteRestaurant.dislike(key);
      this._alert({
        type: 'success',
        title: 'Awesome',
        message: 'Success to dislike this restaurant'
      });
    } catch (error) {
      this._alert({
        type: 'error',
        title: 'Sorry',
        message: 'Failed to dislike this restaurant'
      });
      console.error('_dislikeRestaurant', error);
    }
  },

  _alert({
    type = 'error',
    title = 'Error',
    message = `Something wen't wrong`
  }) {
    import('../helper/alert-helper')
      .then((module) => module.default)
      .then((alert) => alert[type](title, message));
  }
};

export default LikeButtonPresenter;
