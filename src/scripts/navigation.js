class Navigation {
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

  static initDrawer() {
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
  }
}

export default Navigation;
