import '../component/MenuBar';
import routers from '../routes/routers';
import UrlParser from '../routes/url-parser';
import Drawer from '../utils/drawer-initiator';

class App {
  constructor({ menuBar, button, drawer, content }) {
    this._menuBar = menuBar;
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    Drawer.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content
    });
    Drawer.stickyOnScroll(this._menuBar);
    Drawer.keepStickyOnRefresh(this._menuBar);
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    if (url === 'main-content') return;

    const page = routers[url] || routers['/*'];
    this._content.innerHTML = await page.render();
    await page.afterRendered();
  }
}

export default App;
