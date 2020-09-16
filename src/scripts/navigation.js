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
    const { pageYOffset } = window;

    if (pageYOffset > sticky) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }

  static keepStickyOnRefresh() {
    window.onload = () => {
      const scrollYPosition = window.scrollY;
      if (scrollYPosition > 0) {
        this.sticky();
      }
    };
  }
}

export default Navigation;
