import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../styles/main.css';
import './component/skeleton';
import './component/hero-breadcrumb';

import CONFIG from './globals/config';
import swRegister from './utils/service-worker-register';
import WebSocketInitiator from './utils/websocket-initiator';
import App from './views/app';

// application init
const menuBar = document.querySelector('#navbar');
const button = document.querySelector('#burger-menu');
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
