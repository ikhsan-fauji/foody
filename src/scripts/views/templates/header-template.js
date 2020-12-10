const _setContent = (content) => {
  if (content) {
    const headerContent = document.querySelector('#header-content');
    headerContent.innerHTML = content;
  } else {
    console.error('content is not defined');
  }
};

const hero = () => {
  const content = `
    <section class="hero">
      <div class="hero-gradient"></div>
      <img
        data-src="./images/heros/hero-image_4.webp"
        data-sizes="auto"
        alt="Hero Image"
        class="hero-image lazyload"
      />
      <div class="hero-content container">
        <p class="hero-tagline" tabindex="0">
          Discover the great places to eat around you!
        </p>
        <h1 class="hero-title" tabindex="0">
          Find your favourite <span class="primary-text">Resto</span> and
          <span class="primary-text">Food</span>.
        </h1>
        <form action="#" class="search-form">
          <div class="left-group">
            <div class="form-icon left-icon">
              <span class="material-icons">place</span>
            </div>
            <div class="form-input">
              <select name="city" id="city-options" aria-label="City options">
                <option value="">Select City...</option>
              </select>
            </div>
          </div>
          <div class="right-group">
            <div class="form-input">
              <input
                type="text"
                class="search-input"
                aria-label="Search input for restaurant or food"
                placeholder="Search here..."
              />
            </div>
            <div class="form-icon right-icon">
              <button class="search-button" type="button">
                <span class="material-icons">search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  `;

  _setContent(content);
};

const breadCrumb = (page) => {
  if (page) {
    const content = `
      <section id="breadcrumb">
      <div class="container">
        <div class="breadcrumb-header">
          <h2 class="breadcrumb-title">${page}</h2>
        </div>
      </div>
    </section>
    `;
    _setContent(content);
  } else {
    console.error('page is not defined');
  }
};

export { hero, breadCrumb };
