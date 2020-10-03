const API_URL = 'https://dicoding-restaurant-api.el.r.appspot.com';
const API_KEY = 12345;

const restaurantApi = Object.freeze({
  list: `${API_URL}/list`,
  detail: `${API_URL}/detail/`,
  review: `${API_URL}/review`,
  smallPicture: `${API_URL}/images/small/`,
  mediumPicture: `${API_URL}/images/medium/`,
  largePicture: `${API_URL}/images/large/`
});

export { API_KEY, restaurantApi };
