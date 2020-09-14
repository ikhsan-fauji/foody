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
  // navigation.init();
  window.onscroll = () => {
    navigation.sticky();
  };

  const drawerMenu = document.getElementById('drawer-menu');
  const drawer = document.getElementById('drawer');
  drawerMenu.addEventListener('click', (event) => {
    drawer.classList.toggle('show-drawer');
    event.stopPropagation();
  });

  const mainElement = document.querySelector('body');
  mainElement.addEventListener('click', (event) => {
    drawer.classList.remove('show-drawer');
    event.stopPropagation();
  });

  const sortedRestaurants = dummy.restaurants.sort(descendingByRating);
  const sortedPopularMenus = dummy.popularMenus.sort(descendingByRating);
  const restaurant = new Restaurant(sortedRestaurants);
  restaurant.renderAll();
  const menu = new Menu(sortedPopularMenus);
  menu.popular();
};

document.addEventListener('DOMContentLoaded', main);
