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
    <h2 class="primary-text">Consumer Reviews</h2>
    <div id="reviews"></div>

    <h2 class="primary-text">What do you think?</h2>
    <div id="review-form"></div>
  </section>
`;

export { restaurantDetailMenusTemplate, restaurantReviewsTemplate };
