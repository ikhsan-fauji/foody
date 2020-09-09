class MobileNav extends HTMLElement {
  constructor() {
    super();
    this._nav = null;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    return this._nav;
  }
}

customElements.define('mobile-nav', MobileNav);
