import 'regenerator-runtime';
import '../styles/main.scss';

import navigation from './navigation';

const main = () => {
  navigation.init();
};

document.addEventListener('DOMContentLoaded', main);
