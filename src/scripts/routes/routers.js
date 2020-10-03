import Home from '../views/pages/home';
import Restaurant from '../views/pages/restaurant';
import RestaurantDetail from '../views/pages/restaurant-detail';
import Favorite from '../views/pages/favorite';
import NotFound from '../views/pages/not-found';

const routers = {
  '/': Home,
  '/restaurant': Restaurant,
  '/restaurant/:id': RestaurantDetail,
  '/favorite': Favorite,
  '/*': NotFound
};

export default routers;
