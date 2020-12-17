import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';
import * as TestFactories from './helpers/testFactories';

describe('Dislike Restaurant', () => {
  const createButtonContainer = () => {
    document.body.innerHTML = '<div id="like-btn-container"></div>';
  };
  const createAlertContainer = () => {
    document.body.innerHTML += '<div id="alert-container"></div>';
  };

  beforeEach(() => {
    createButtonContainer();
    createAlertContainer();
  });

  it('should render the dislike button when the restaurant already liked', async () => {
    const payload = { id: 2 };
    await FavoriteRestaurant.like(payload);
    await TestFactories.createLikeButtonPresenterWithRestaurant(payload);

    expect(document.querySelector('#dislike-button')).toBeTruthy();
    await FavoriteRestaurant.dislike(payload.id);
  });

  it('should be able to dislike the restaurant when already liked', async () => {
    const payload = { id: 3 };
    await FavoriteRestaurant.like(payload);
    await TestFactories.createLikeButtonPresenterWithRestaurant(payload);
    document.querySelector('#dislike-button').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurant.getByKey(payload.id)).not.toBeDefined();
    await FavoriteRestaurant.dislike(payload.id);
  });

  it('should render the like button after dislike succeed', async () => {
    const payload = { id: 4 };
    await FavoriteRestaurant.like(payload);
    await TestFactories.createLikeButtonPresenterWithRestaurant(payload);
    document.querySelector('#dislike-button').dispatchEvent(new Event('click'));
    await TestFactories.createLikeButtonPresenterWithRestaurant(payload);

    expect(document.querySelector('#like-button')).toBeTruthy();
    expect(document.querySelector('#dislike-button')).toBeFalsy();
    await FavoriteRestaurant.dislike(payload.id);
  });
});
