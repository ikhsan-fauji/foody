class MenuList extends HTMLElement {
  constructor() {
    super();
  }

  set list(list = []) {
    this._list = list;
    this.render();
  }

  _listTemplate() {
    let template = `<ul class="list-menus">`;

    this._list.forEach((menu) => {
      template += `<li class="menu-item">${menu.name}</li>`;
    });

    template += `</ul>`;
    return template;
  }

  render() {
    this.innerHTML = this._listTemplate();
  }
}

customElements.define('menu-list', MenuList);
