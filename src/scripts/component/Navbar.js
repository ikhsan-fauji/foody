class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  set navigations(navigations = []) {
    this._navigations = navigations;
    this.render();
  }

  listMenu(menu = null) {
    let templateList = '';
    if (menu) {
      const listClass = menu.active ? 'nav-item active' : 'nav-item';
      const target = menu.target
        ? `target="${menu.target}" rel="noreferrer"`
        : '';
      templateList = `<li class="${listClass}"><a class="nav-link" href="${menu.href}"${target}>${menu.name}</a></li>`;
    }
    return templateList;
  }

  mainMenu(listMenus = []) {
    let mainMenu = `
      <nav>
        <div class="nav-wrapper container">
          <button class="burger-menu">
            <img src="./images/icons/burger-menu.svg" alt="Menu" />
          </button>
          <a href="#home" class="brand-logo">Foody</a>
        `;

    if (listMenus) {
      mainMenu += `<ul id="nav-bar" class="drawer">`;
      listMenus.forEach((menu) => {
        mainMenu += this.listMenu(menu);
      });
      mainMenu += `</ul>`;
    }

    mainMenu += `
        </div>
      </nav>
    `;
    return mainMenu;
  }

  render() {
    this.innerHTML = this.mainMenu(this._navigations);
  }
}

customElements.define('main-nav', Navbar);
