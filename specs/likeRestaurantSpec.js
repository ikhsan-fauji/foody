import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';
import * as TestFactories from './helpers/testFactories';

describe('Like Restaurant', () => {
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

  it('should render the like button when the restaurant has not liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('#like-button')).toBeTruthy();
  });

  it('should not render the dislike button when the restaurant has not liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('#dislike-button')).toBeFalsy();
  });

  it('should be able to like the restaurant when the restaurant has not liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#like-button').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurant.getByKey(1);

    expect(restaurant.id).toEqual(1);
    await FavoriteRestaurant.dislike(1);
  });

  it('should not add the same restaurant if already liked before', async () => {
    await FavoriteRestaurant.like({ id: 1 });
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    const restaurants = await FavoriteRestaurant.getAll();

    expect(restaurants.length).toEqual(1);
    expect(restaurants[0].id).toEqual(1);
    expect(document.querySelector('#like-button')).toBeFalsy();
    expect(document.querySelector('#dislike-button')).toBeTruthy();
    await FavoriteRestaurant.dislike(1);
  });

  it('should not render like or dislike button when id is undefined', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});
    expect(document.querySelector('#like-button')).toBeTruthy();
    expect(document.querySelector('#dislike-button')).toBeFalsy();
  });
});
