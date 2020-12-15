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
      <div class="restaurant__name skeleton-5 skeleton-loading"></div>
      <div class="restaurant__info skeleton-7 skeleton-loading"></div>
      <div class="restaurant__description card__text skeleton-8 skeleton-loading"></div>
      <div class="restaurant__description card__text skeleton-10 skeleton-loading"></div>
      <div class="restaurant__description card__text skeleton-8 skeleton-loading"></div>

      <section class="restaurant__menus">
        <div class="foods">
          <div id="food-list">
            <div class="skeleton-10 skeleton-loading"></div>
            <div class="skeleton-10 skeleton-loading"></div>
            <div class="skeleton-10 skeleton-loading"></div>
            <div class="skeleton-10 skeleton-loading"></div>
            <div class="skeleton-10 skeleton-loading"></div>
          </div>
        </div>

        <div class="drinks">
          <div id="drink-list">
            <div class="skeleton-10 skeleton-loading"></div>
            <div class="skeleton-10 skeleton-loading"></div>
            <div class="skeleton-10 skeleton-loading"></div>
            <div class="skeleton-10 skeleton-loading"></div>
            <div class="skeleton-10 skeleton-loading"></div>
          </div>
        </div>
      </section>
    </section>
  </div>
  `;
};

export { restaurantCard, restaurantDetail };
