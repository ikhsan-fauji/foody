class MenuBar extends HTMLElement {
  constructor() {
    super();
  }

  _brandLogo() {
    return `
      <div class="brand-logo">
        <button id="drawer-menu">
          <span class="material-icons"> menu </span>
        </button>
        <a href="/">Foody</a>
      </div>
    `;
  }

  _navBar() {
    return `
      <nav id="drawer">
        <ul class="nav">
          <li class="nav-item active">
            <a class="nav-link" href="#/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/restaurant">Restaurant</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/favorite">Favorite</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
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
      <div id="menu-bar">
        <div class="container">
          ${this._brandLogo()}
          ${this._navBar()}
        </div>
      </div>
    `;
  }

  render() {
    this.innerHTML = this._menuBar();
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('menu-bar', MenuBar);
