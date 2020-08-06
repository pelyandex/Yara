import Compile from './compile';
import { EventBus } from './event-bus';
import { State } from '../types';
import { Router, RouterObj } from './router';

type YaraState = {
  pages: {
    [key: string]: State
  },
  router: RouterObj
};

interface Yara {
  yaraState: YaraState
  setRouter(): void
  compile(page:string): Compile
}
class Yara {
  constructor(yaraState: YaraState) {
    this.yaraState = yaraState;
    this.setRouter();
  }

  setRouter() {
    const routes = this.yaraState.router || { [Object.keys(this.yaraState.pages)[0]]: '/' };
    return new Router(routes, this.compile).start();
  }

  compile = (page:string): Compile => {
    const pageComponent = this.yaraState.pages[page] as State;
    const globalBus = new EventBus();
    return new Compile(pageComponent, globalBus);
  };
}
export default (data) => new Yara(data);
