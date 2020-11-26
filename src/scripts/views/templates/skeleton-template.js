const skeleton = {
  restaurantCard(count = 1) {
    let template = '';
    for (let index = 1; index <= count; index++) {
      template += `
        <article class="card restaurant">
          <div class="card-image restaurant-thumbnail skeleton-10"></div>
          <div class="card-body restaurant-content">
          <div class="restaurant-title skeleton-7"></div>
          <div class="restaurant-title skeleton-3"></div>

          <div class="restaurant-description card-text skeleton-8"></div>
          <div class="restaurant-description card-text skeleton-10"></div>
          <div class="restaurant-description card-text skeleton-8"></div>
        </div>
        </article>
      `;
    }
    return template;
  },

  restaurantDetail() {
    return `
    <div class="container">
      <section class="restaurant-detail">
        <div class="restaurant-image skeleton-10"></div>
        <div class="restaurant-name skeleton-5"></div>
        <div class="restaurant-info skeleton-7"></div>
        <div class="restaurant-description card-text skeleton-8"></div>
        <div class="restaurant-description card-text skeleton-10"></div>
        <div class="restaurant-description card-text skeleton-8"></div>

        <section class="restaurant-menus">
          <div class="foods">
            <div id="food-list">
              <div class="skeleton-10"></div>
              <div class="skeleton-10"></div>
              <div class="skeleton-10"></div>
              <div class="skeleton-10"></div>
              <div class="skeleton-10"></div>
            </div>
          </div>

          <div class="drinks">
            <div id="drink-list">
              <div class="skeleton-10"></div>
              <div class="skeleton-10"></div>
              <div class="skeleton-10"></div>
              <div class="skeleton-10"></div>
              <div class="skeleton-10"></div>
            </div>
          </div>
        </section>
      </section>
    </div>
    `;
  }
};

export default skeleton;
