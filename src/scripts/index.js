import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../styles/main.css';
import '../styles/responsive.css';
import '../styles/skeleton.css';
import './component/foody-footer';
import './component/skeleton';
import './component/hero-breadcrumb';

import CONFIG from './globals/config';
import swRegister from './utils/service-worker-register';
import App from './views/app';

// application init
const menuBar = document.querySelector('#navbar');
const button = document.querySelector('#burger');
const drawer = document.querySelector('#drawer');
const content = document.querySelector('#main-content');
const app = new App({ menuBar, button, drawer, content });

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
  import('./utils/websocket-initiator')
    .then((module) => module.default)
    .then((websocket) => websocket.init(CONFIG.WEB_SOCKET_SERVER));
});
