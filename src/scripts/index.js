import 'regenerator-runtime';
import './lazysizes.min';
import '../styles/main.scss';

import idb from './helper/idb-helper';
import App from './views/app';

// initializing indexed db
idb.initialize();

// application init
const menuBar = document.querySelector('#menu-bar');
const button = document.querySelector('#drawer-menu');
const drawer = document.querySelector('#drawer');
const content = document.querySelector('#main-content');
const app = new App({ menuBar, button, drawer, content });

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Browser tidak mendukung Service Worker');
    return;
  }

  try {
    await navigator.serviceWorker.register('./service-worker.js');
    console.log('Service worker registered');
  } catch (error) {
    console.log('Failed to register service worker', error);
  }
};

swRegister();
