import CONFIG from './config';

const restaurantApi = Object.freeze({
  list: `${CONFIG.API_URL}/list`,
  detail: `${CONFIG.API_URL}/detail/`,
  review: `${CONFIG.API_URL}/review`,
  smallPicture: `${CONFIG.API_URL}/images/small/`,
  mediumPicture: `${CONFIG.API_URL}/images/medium/`,
  largePicture: `${CONFIG.API_URL}/images/large/`
});

export default restaurantApi;
