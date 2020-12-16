/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurant', ({ I }) => {
  I.see('Oops!!!');
  I.see('Data not found.');
});

Scenario('liking the restaurant from the restaurant page', async ({ I }) => {
  I.see('Oops!!!');
  I.see('Data not found.');

  I.amOnPage('/#/restaurant');
  I.seeElement('.card__link');
  const firstCard = locate('.card__title').first();
  const firstCardTitle = await I.grabTextFrom(firstCard);
  I.click(firstCardTitle);

  I.seeElement('#like-button', '#like-btn-container');
  I.click('#like-button', '#like-btn-container');
  I.see('Success to like this restaurant', '#alert-container');
  I.seeElement('#un-like-button', '#like-btn-container');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant');
  const likedCardTitle = await I.grabTextFrom('.card__title');

  assert.strictEqual(firstCardTitle, likedCardTitle);
});

Scenario('unliking the restaurant from restaurant page', async ({ I }) => {
  I.see('Oops!!!');
  I.see('Data not found.');

  I.amOnPage('/#/restaurant');
  I.seeElement('.card__link');
  const firstCard = locate('.card__title').first();
  const firstCardTitle = await I.grabTextFrom(firstCard);
  I.click(firstCardTitle);

  I.seeElement('#like-button', '#like-btn-container');
  I.click('#like-button', '#like-btn-container');
  I.see('Success to like this restaurant', '#alert-container');

  I.wait(3);
  I.seeElement('#un-like-button', '#like-btn-container');
  I.click('#un-like-button', '#like-btn-container');
  I.see('Success to unlike this restaurant', '#alert-container');
  I.seeElement('#like-button', '#like-btn-container');

  I.amOnPage('/#/favorite');
  I.see('Oops!!!');
  I.see('Data not found.');
});

Scenario('unliking the restaurant from favorite page', async ({ I }) => {
  I.see('Oops!!!');
  I.see('Data not found.');

  I.amOnPage('/#/restaurant');
  I.seeElement('.card__link');
  const firstCard = locate('.card__title').first();
  const firstCardTitle = await I.grabTextFrom(firstCard);
  I.click(firstCardTitle);

  I.seeElement('#like-button', '#like-btn-container');
  I.click('#like-button', '#like-btn-container');
  I.see('Success to like this restaurant', '#alert-container');
  I.seeElement('#un-like-button', '#like-btn-container');

  I.amOnPage('/#/favorite');
  I.seeElement('.card__link');
  const firstLikedCard = locate('.card__title').first();
  const firstLikedCardTitle = await I.grabTextFrom(firstLikedCard);
  assert.strictEqual(firstCardTitle, firstLikedCardTitle);

  I.click(firstLikedCardTitle);

  I.wait(3);
  I.seeElement('#un-like-button', '#like-btn-container');
  I.click('#un-like-button', '#like-btn-container');
  I.see('Success to unlike this restaurant', '#alert-container');
  I.seeElement('#like-button', '#like-btn-container');

  I.amOnPage('/#/favorite');
  I.see('Oops!!!');
  I.see('Data not found.', '.error-message');
});

Scenario(
  'keeping the restaurant still on favorite page when like - dislike - like',
  async ({ I }) => {
    I.see('Oops!!!');
    I.see('Data not found.');

    I.amOnPage('/#/restaurant');
    I.seeElement('.card__link');
    const firstCard = locate('.card__title').first();
    const firstCardTitle = await I.grabTextFrom(firstCard);
    I.click(firstCardTitle);

    I.seeElement('#like-button', '#like-btn-container');
    I.click('#like-button', '#like-btn-container');
    I.see('Success to like this restaurant', '#alert-container');
    I.seeElement('#un-like-button', '#like-btn-container');

    I.amOnPage('/#/favorite');
    I.seeElement('.card__link');
    const firstLikedCard = locate('.card__title').first();
    const firstLikedCardTitle = await I.grabTextFrom(firstLikedCard);
    assert.strictEqual(firstCardTitle, firstLikedCardTitle);

    I.click(firstLikedCardTitle);

    I.wait(3);
    I.seeElement('#un-like-button', '#like-btn-container');
    I.click('#un-like-button', '#like-btn-container');
    I.see('Success to unlike this restaurant', '#alert-container');
    I.wait(3);
    I.seeElement('#like-button', '#like-btn-container');
    I.click('#like-button', '#like-btn-container');
    I.see('Success to like this restaurant', '#alert-container');

    I.amOnPage('/#/favorite');
    I.seeElement('.restaurant');
    const likedCardTitle = await I.grabTextFrom('.card__title');

    assert.strictEqual(firstCardTitle, likedCardTitle);
  }
);
