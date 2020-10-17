import HeaderContent from '../templates/header-content';

const NotFound = {
  async render() {
    HeaderContent.breadCrumb('Not Found');
    return `<h2 style="margin-top: 72px">NotFound pages</h2>`;
  },

  afterRendered() {}
};

export default NotFound;
