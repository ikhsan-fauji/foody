import './component/Navbar';
import router from './router';

class Navigation {
  static init() {
    const menuBar = document.querySelector('#menu-bar');
    const mainNavigation = document.createElement('main-nav');
    mainNavigation.navigations = router;
    menuBar.appendChild(mainNavigation);
  }

  static sticky() {
    const header = document.getElementById('menu-bar');
    const sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }
}

export default Navigation;
