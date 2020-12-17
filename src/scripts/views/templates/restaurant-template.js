import restaurantApi from '../../globals/api';
import { noDataTemplate } from './html-template';

const restaurantDetailMenusTemplate = () => `
  <section class="restaurant__menus">
    <div class="foods">
      <h2 class="h-3 primary-text">Foods</h2>
      <div id="food-list"></div>
    </div>

    <div class="drinks">
      <h2 class="h-3 primary-text">Drinks</h2>
      <div id="drink-list"></div>
    </div>
  </section>
`;

const restaurantReviewsTemplate = () => `
  <section class="restaurant__review">
    <h2 class="primary-text text-center">Consumer Reviews</h2>
    <div id="reviews"></div>

    <h2 class="primary-text text-center">What do you think?</h2>
    <div id="review-form"></div>
  </section>
`;

const _restaurantCard = (restaurant) => {
  const { id, name, city, pictureId, rating, description } = restaurant;
  const fixedRating = rating.toFixed(1);
  const defaultThumbnail = './images/heros/hero.jpg';
  const thumbnail = pictureId || defaultThumbnail;
  const restaurantImage = `${restaurantApi.smallPicture}${thumbnail}`;

  const template = `
    <article class="card restaurant">
      <p class="card__badge" tabindex="0" aria-label="Restaurant in ${city}"><i class="fa fa-map-marker-alt badge-icon"></i>${city}</p>
      <div class="card__image">
        <img
          alt="${name} Restaurant"
          class="res-image lazyload"
          data-src="${restaurantImage}"
          data-sizes="auto"
          src="${restaurantImage}"
          crossorigin="anonymus"
        />
      </div>
      <div class="card__body">
        <h1 class="card__title">
          <a class="card__link" href="#/restaurant/${id}">${name}</a>
        </h1>
        <div class="card__rating">
          <i id="rating-icon${id}" class="fa fa-star rating-icon"></i>
          <label
            for="rating-icon${id}"
            tabindex="0"
            aria-label="Restaurant rating point is ${fixedRating}"
          >
          ${fixedRating}
          </label>
        </div>
        <p class="card__description card__text">
          ${description}
        </p>
      </div>
    </article>
  `;

  return template;
};

const renderList = (elementId, restaurants) => {
  if (restaurants && restaurants.length > 0) {
    const listRestaurant = document.querySelector('.restaurants');
    let cards = '';
    restaurants.forEach((restaurantData) => {
      cards += _restaurantCard(restaurantData);
    });
    listRestaurant.innerHTML = cards;
  } else {
    const element = document.querySelector(elementId);
    element.innerHTML = noDataTemplate();
  }
};

const _menuCard = (menu) => {
  const { id, name, rating, city, picture } = menu;
  const fixedRating = rating.toFixed(1);

  const template = `
    <article class="card menu">
      <div class="card__image">
        <img
          alt="${name}"
          class="lazyload"
          crossorigin="anonymous"
          data-src="./images/${picture}-small.webp 480w, ./images/${picture}-large.webp 800w"
          src="./images/${picture}-large.webp"
          srcset="./images/${picture}-small.webp 480w, ./images/${picture}-large.webp 800w"
          sizes="(max-width: 600px) 480px, 800px"
        />
      </div>
      <div class="card__body">
        <h1 class="card__title">
          <a class="card__link" href="#">${name}</a>
        </h1>
        <div class="card__info">
          <div class="card__info__rating">
            <i id="rating-icon${id}" class="fa fa-star rating-icon" aria-label="Star icon for rating"></i>
            <label for="rating-icon${id}" tabindex="0" aria-label="Rating point is ${fixedRating}"> ${fixedRating} </label>
          </div>
          <div class="card__info__place">
            <i id="place-icon${id}" class="fa fa-map-marker-alt place-icon" aria-label="Place icon"></i>
            <label for="place-icon${id}" tabindex="0">${city}</label>
          </div>
        </div>
      </div>
    </article>
  `;

  return template;
};

const renderPopularMenus = (menus) => {
  const popularMenusElement = document.querySelector('.menus');
  let cards = '';
  menus.forEach((menu) => {
    cards += _menuCard(menu);
  });
  popularMenusElement.innerHTML = cards;
};

const listMenus = (menus) => {
  let template = `<ul class="list-menus">`;
  menus.forEach((menu) => {
    template += `<li class="menu-item">${menu.name}</li>`;
  });
  template += `</ul>`;
  return template;
};

const consumerReviews = (reviews) => {
  let template = `<div class="reviews">`;

  if (reviews.length > 0) {
    reviews.forEach((reviewDetail) => {
      const { name, date, review } = reviewDetail;
      template += `
        <article class="review-item">
          <h3 class="reviewer">${name || 'User****'}</h3>
          <i class="review-date">${date || ''}</i>
          <p class="review-detail">${review || ''}</p>
        </article>
      `;
    });
  } else {
    template += `
      <article class="review-item">
        <span>No Reviews</span>
      </article>
      `;
  }

  template += `</div>`;
  return template;
};

export {
  restaurantDetailMenusTemplate,
  restaurantReviewsTemplate,
  renderList,
  renderPopularMenus,
  listMenus,
  consumerReviews
};
