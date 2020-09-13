import 'regenerator-runtime';
import '../styles/main.scss';

import navigation from './navigation';

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
};

document.addEventListener('DOMContentLoaded', main);
