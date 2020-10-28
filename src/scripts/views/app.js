import '../component/NavBar';
import routers from '../routes/routers';
import UrlParser from '../routes/url-parser';
import Drawer from '../utils/drawer-initiator';
import NotFoundTemplate from './templates/not-found-template';

class App {
  constructor({ menuBar, button, drawer, content }) {
    this._menuBar = menuBar;
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _body() {
    return document.querySelector('body');
  }

  _initialAppShell() {
    Drawer.init({
      button: this._button,
      drawer: this._drawer,
      content: this._body()
    });
    Drawer.stickyOnScroll(this._menuBar);
    Drawer.keepStickyOnRefresh(this._menuBar);
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    if (url === 'main-content') return;

    const page = routers[url];
    if (page) {
      this._content.innerHTML = await page.render();
      await page.afterRendered();
    } else {
      this._notFound();
    }
    window.scrollTo(0, 0); // set window to top position
  }

  _notFound() {
    const body = this._body();
    body.innerHTML = NotFoundTemplate();
  }
}

export default App;
