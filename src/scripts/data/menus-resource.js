import '../component/MenuCard';
import dummy from './DATA.json';

class MenuResource {
  static popular() {
    const { popularMenus } = dummy;
    const popularMenusElement = document.querySelector('.menus');
    popularMenus.forEach((menu) => {
      const menuCard = document.createElement('menu-card');
      menuCard.menu = menu;
      popularMenusElement.appendChild(menuCard);
    });
  }
}

export default MenuResource;
