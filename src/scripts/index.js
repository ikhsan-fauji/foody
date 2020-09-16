import 'regenerator-runtime';
import './lazysizes.min';
import '../styles/main.scss';

import navigation from './navigation';
import Restaurant from './restaurant';
import Menu from './menu';
import dummy from './data/DATA.json';

const descendingByRating = (a, b) => {
  let comparison = 0;

  if (a.rating > b.rating) {
    comparison = -1;
  } else if (a.rating < b.rating) {
    comparison = 1;
  }

  return comparison;
};

const main = () => {
  window.onscroll = () => {
    navigation.sticky();
  };

  navigation.keepStickyOnRefresh();
  navigation.initDrawer();

  const sortedRestaurants = dummy.restaurants.sort(descendingByRating);
  const sortedPopularMenus = dummy.popularMenus.sort(descendingByRating);
  const restaurant = new Restaurant(sortedRestaurants);
  restaurant.renderAll();
  const menu = new Menu(sortedPopularMenus);
  menu.popular();
};

document.addEventListener('DOMContentLoaded', main);
