import HeaderContent from '../templates/header-content';

const Favorite = {
  async render() {
    HeaderContent.breadCrumb('Favorites');

    return `
      <div class="container">
        <h3>Data tidak tersedia</h3>
      </div>
    `;
  },

  afterRendered() {}
};

export default Favorite;
