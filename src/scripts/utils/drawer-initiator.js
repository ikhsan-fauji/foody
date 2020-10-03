const Drawer = {
  init({ button, drawer, content }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },

  _sticky(menuBar) {
    const sticky = menuBar.offsetTop;
    const { pageYOffset } = window;

    if (pageYOffset > sticky) {
      menuBar.classList.add('sticky');
    } else {
      menuBar.classList.remove('sticky');
    }
  },

  stickyOnScroll(menuBar) {
    window.onscroll = () => {
      this._sticky(menuBar);
    };
  },

  keepStickyOnRefresh(menuBar) {
    window.onload = () => {
      const scrollYPosition = window.scrollY;
      if (scrollYPosition > 0) {
        this._sticky(menuBar);
      }
    };
  }
};

export default Drawer;
