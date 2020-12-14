class FoodyFoter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer>
        <div class="footer-copyright">
          <div class="container">Copyright © 2020 - Foody</div>
        </div>
      </footer>
    `;
  }
}

customElements.define('foody-footer', FoodyFoter);
