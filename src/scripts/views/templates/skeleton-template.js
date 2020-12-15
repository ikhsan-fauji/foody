const restaurantCard = (count = 1) => {
  let template = '';
  for (let index = 1; index <= count; index++) {
    template += `
      <article class="card restaurant">
        <div class="card__image skeleton-10 skeleton-loading"></div>
        <div class="card__body restaurant__content">
          <div class="restaurant__title skeleton-7 sk-default skeleton-loading"></div>
          <div class="restaurant__title skeleton-3 sk-default skeleton-loading"></div>

          <div class="restaurant__description card__text skeleton-8 sk-default skeleton-loading"></div>
          <div class="restaurant__description card__text skeleton-10 sk-default skeleton-loading"></div>
          <div class="restaurant__description card__text skeleton-8 sk-default skeleton-loading"></div>
        </div>
      </article>
    `;
  }
  return template;
};

const restaurantDetail = () => {
  return `
  <div class="container">
    <section class="restaurant__detail">
      <div class="restaurant__image skeleton-10 skeleton-loading"></div>
      <div class="restaurant__name skeleton-5 skeleton-loading sk-default"></div>
      <div class="restaurant__info skeleton-7 skeleton-loading sk-default"></div>
      <div class="restaurant__description card__text skeleton-8 skeleton-loading sk-default"></div>
      <div class="restaurant__description card__text skeleton-10 skeleton-loading sk-default"></div>
      <div class="restaurant__description card__text skeleton-8 skeleton-loading sk-default"></div>

      <section class="restaurant__menus">
        <div class="foods">
          <div id="food-list">
            <div class="skeleton-10 skeleton-loading sk-default"></div>
            <div class="skeleton-10 skeleton-loading sk-default"></div>
            <div class="skeleton-10 skeleton-loading sk-default"></div>
            <div class="skeleton-10 skeleton-loading sk-default"></div>
            <div class="skeleton-10 skeleton-loading sk-default"></div>
          </div>
        </div>

        <div class="drinks">
          <div id="drink-list">
            <div class="skeleton-10 skeleton-loading sk-default"></div>
            <div class="skeleton-10 skeleton-loading sk-default"></div>
            <div class="skeleton-10 skeleton-loading sk-default"></div>
            <div class="skeleton-10 skeleton-loading sk-default"></div>
            <div class="skeleton-10 skeleton-loading sk-default"></div>
          </div>
        </div>
      </section>
    </section>
  </div>
  `;
};

const discoverRestaurant = () => {
  return `
    <div class="discover-banner skeleton-10 skeleton-loading"></div>
    <div class="discover-content">
      <div class="discover-title skeleton-5 skeleton-loading sk-default"></div>
      <div class="discover-text skeleton-8 skeleton-loading sk-default"></div>
      <div class="discover-text skeleton-10 skeleton-loading sk-default"></div>
      <div class="discover-text skeleton-10 skeleton-loading sk-default"></div>
      <div class="discover-text skeleton-8 skeleton-loading sk-default"></div>
      <div class="discover-button skeleton-3 skeleton-loading sk-default">/button>
    </div>
  `;
};

export { restaurantCard, restaurantDetail, discoverRestaurant };
