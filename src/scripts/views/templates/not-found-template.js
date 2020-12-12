const NotFoundTemplate = () => {
  return `
    <div class="container">
      <div id="not-found">
        <div class="not-found__container">
          <h2 class="not-found__title">Are you lost?</h2>
          <p class="not-found__link">404!!! Page not found. <a class="not-found__link" href="/">Back to home page.</a></p>
        </div>
      </div>
    </div>
  `;
};

export default NotFoundTemplate;
