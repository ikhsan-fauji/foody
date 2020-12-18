import Home from '../views/pages/home';
import Restaurant from '../views/pages/restaurant';
import RestaurantDetail from '../views/pages/restaurant-detail';
import Favorite from '../views/pages/favorite';

const routers = {
  '/': Home,
  '/restaurant': Restaurant,
  '/restaurant/:id': RestaurantDetail,
  '/favorite': Favorite
};

export default routers;
