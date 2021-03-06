class FoodyNavbar extends HTMLElement {
  _brandLogo() {
    return `
      <div class="brand-logo">
        <button id="burger" aria-label="burger-button">
          <i aria-label="Burger Menu" class="fa fa-bars burger__menu"></i>
        </button>
        <a class="brand-link" href="/">Foody</a>
      </div>
    `;
  }

  _navBar() {
    return `
      <nav id="drawer">
        <ul class="nav">
          <li class="nav__item active">
            <a class="nav__link" href="#/">Home</a>
          </li>
          <li class="nav__item">
            <a class="nav__link" href="#/restaurant">Restaurant</a>
          </li>
          <li class="nav__item">
            <a class="nav__link" href="#/favorite">Favorite</a>
          </li>
          <li class="nav__item">
            <a
              class="nav__link"
              href="https://github.com/ikhsan-fauji"
              target="_blank"
              rel="noreferrer"
              >About Us</a
            >
          </li>
        </ul>
      </nav>
    `;
  }

  _menuBar() {
    return `
    <div class="container navbar-container">
      ${this._brandLogo()}
      ${this._navBar()}
    </div>
    `;
  }

  _activateMenu() {
    const navItems = document.getElementsByClassName('nav__item');
    for (let index = 0; index < navItems.length; index += 1) {
      navItems[index].addEventListener('click', () => {
        const current = document.querySelector('.active');
        current.className = current.className.replace(' active', '');
        navItems[index].className += ' active';
      });
    }
  }

  render() {
    return new Promise((resolve) => {
      this.innerHTML = this._menuBar();
      resolve();
    });
  }

  afterRendered() {
    this._activateMenu();
  }

  connectedCallback() {
    this.render().then(() => {
      this.afterRendered();
    });
  }
}

customElements.define('foody-navbar', FoodyNavbar);
