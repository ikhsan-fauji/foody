import 'regenerator-runtime';
import './lazysizes.min';
import '../styles/main.scss';

import CONFIG from './globals/config';
import swRegister from './utils/service-worker-register';
import WebSocketInitiator from './utils/websocket-initiator';
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
  swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});
