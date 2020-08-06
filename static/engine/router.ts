import Compile from './compile';

export type RouterObj = {[key: string]: string} | undefined | false;
interface Route {
  _pathname: string;
  renderCallback: (key:string) => Compile;
  root: string;
  component: string
}
type FuncComopnent = (routes, renderFunc) => void;
class Route {
  constructor(pathname: string, component: string, renderCallback: (key:string) => Compile) {
    this._pathname = pathname;
    this.component = component;
    this.renderCallback = renderCallback;
    return this;
  }

  render() {
    this.renderCallback(this.component);
  }
}

export interface Router {
  pageObj: RouterObj;
  routes: Route[];
  renderCallback: (key:string) => Compile
}
export class Router {
  constructor(pageObj?: RouterObj, renderCallback?: (key:string) => Compile) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.pageObj = pageObj;
    this.renderCallback = renderCallback;
    this.setUrls();
    // This.start();
    Router.__instance = this;
  }

  private static __instance: Router;

  routes: Route[] = [];

  history = window.history;

  setUrls() {
    for (const page in (this.pageObj as any)) {
      if (Object.prototype.hasOwnProperty.call(this.pageObj, page)) {
        this.use(this.pageObj[page], page, this.renderCallback);
      }
    }
  }

  use(url: string, component:string, renderCallback: (key:string) => Compile) {
    const route = new Route(url, component, renderCallback);
    this.routes.push(route);
  }

  start() {
    window.onpopstate = (event) => this._onRoute(event.currentTarget.location.pathname);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.routes.find((route1) => route1._pathname === pathname);
    if (!route) {
      window.location.replace('/');
      return;
    }

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
}
