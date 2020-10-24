import '../component/MenuCard';

class MenuData {
  constructor(menus) {
    this._popularMenus = menus || [];
  }

  popular() {
    if (this._popularMenus.length > 0) {
      const popularMenus = document.querySelector('.menus');
      this._popularMenus.forEach((menu) => {
        const menuCard = document.createElement('menu-card');
        menuCard.menu = menu;
        popularMenus.appendChild(menuCard);
      });
    }
  }
}

export default MenuData;
