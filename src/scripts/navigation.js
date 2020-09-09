import './component/Navbar';
import router from './router';

class Navigation {
  static init() {
    const menuBar = document.querySelector('#menu-bar');
    const mainNavigation = document.createElement('main-nav');
    mainNavigation.navigations = router;
    menuBar.appendChild(mainNavigation);
  }
}

export default Navigation;
