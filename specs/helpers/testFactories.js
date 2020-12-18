import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import FavoriteRestaurant from '../../src/scripts/data/favorite-restaurant';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonPresenter.init({
    restaurant,
    favoriteRestaurant: FavoriteRestaurant,
    likeButtonContainer: document.querySelector('#like-btn-container')
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonPresenterWithRestaurant };
