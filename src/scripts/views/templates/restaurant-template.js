import restaurantApi from '../../globals/api';
import noDataTemplate from './nodata-template';

const restaurantDetailMenusTemplate = () => `
  <section class="restaurant-menus">
    <div class="foods">
      <h3 class="h-3 primary-text">Foods</h3>
      <div id="food-list"></div>
    </div>

    <div class="drinks">
      <h3 class="h-3 primary-text">Drinks</h3>
      <div id="drink-list"></div>
    </div>
  </section>
`;

const restaurantReviewsTemplate = () => `
  <section class="restaurant-review">
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
      <p class="card-badge" tabindex="0" aria-label="Restaurant in ${city}"><i class="fa fa-map-marker-alt badge-icon"></i>${city}</p>
      <div class="card-image">
        <img
          alt="${name} Restaurant"
          class="res-image lazyload"
          data-src="${restaurantImage}"
          src="${restaurantImage}"
          crossorigin="anonymus"
        />
      </div>
      <div class="card-body">
        <h1 class="card-title">
          <a class="card-link" href="#/restaurant/${id}">${name}</a>
        </h1>
        <div class="card-rating">
          <i id="rating-icon${id}" class="fa fa-star rating-icon"></i>
          <label
            for="rating-icon${id}"
            tabindex="0"
            aria-label="Restaurant rating point is ${fixedRating}"
          >
          ${fixedRating}
          </label>
        </div>
        <p class="card-description card-text">
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
      <div class="card-image">
        <img
          alt="${name}"
          class="lazyload"
          data-src="./images/menus/${picture}-small.jpg"
          src="./images/menus/${picture}-small.jpg"
          srcset="./images/menus/${picture}-small.jpg"
        />
      </div>
      <div class="card-body">
        <h1 class="card-title">
          <a class="card-link" href="#">${name}</a>
        </h1>
        <div class="card-info">
          <div class="card-info__rating">
            <i id="rating-icon${id}" class="fa fa-star rating-icon" aria-label="Star icon for rating"></i>
            <label for="rating-icon${id}" tabindex="0" aria-label="Rating point is ${fixedRating}"> ${fixedRating} </label>
          </div>
          <div class="card-info__place">
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
