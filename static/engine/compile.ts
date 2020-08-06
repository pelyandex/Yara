import { State } from '../types';
import Dom, { ListenerObject } from './dom';
import { EventBus } from './event-bus';
import { Validator } from './validator';
import { Router } from './router';

export default class Compile {
  compileObj: State;

  DOM: HTMLElement;

  lisnterers: ListenerObject[] = [];

  bus:EventBus;

  constructor(compileObj:State, bus:EventBus) {
    this.compileObj = compileObj;
    this.bus = bus;
    this.compile();
  }

  asyncComponents = 0;

  moduleCounter = 0;

  compile() {
    // Добавляю глобальный интерфейс
    this.compileObj.$router = new Router();
    this.compileObj.$bus = this.bus;
    this.compileObj.$validator = new Validator(this.compileObj.data, this.compileObj.validation);

    // Компилирую основной обьект
    const syncDom = new Dom(this.compileObj.template, this.compileObj, this.doCompile);
    this.asyncComponents = syncDom.asyncComponents;
    this.DOM = syncDom.createdDom;
    this.lisnterers = syncDom.listeners;
    this.mounted();
  }

  doCompile = (domContext:HTMLElement, replace:HTMLElement, module:string) => {
    this.moduleCounter++;
    // Нахожу нужный подкомпонент
    const compileObj = this.compileObj.components[module];
    // Добавляю глобальный интерфейс
    compileObj.$bus = this.bus;
    compileObj.$validator = new Validator(this.compileObj.data, this.compileObj.validation);
    compileObj.$router = new Router();
    // Строю новый дом, изходя из найденого контекста
    const asyncDom = new Dom(compileObj.template, compileObj, this.doCompile);
    // Забираю построенный дом подкомпонента
    const localDom = asyncDom.createdDom;
    // Добавляю локальные листенеры
    asyncDom.listeners.forEach((el) => this.lisnterers.push(el));
    // Прохожусь по детям и заменяю их в глобальном доме
    const children = Array.from(localDom.children);
    domContext.replaceChild(children[0], replace);
    // Рендер
    this.mounted();
  };

  mounted() {
    // Проверяю, что все асинхронные компоненты догрузились
    if (this.moduleCounter === this.asyncComponents) {
      this.render();
    }
  }

  render = () => {
    const start = document.querySelector('.yara');
    document.body.replaceChild(this.DOM, start);
    this.setListeners();
  };

  setListeners() {
    this.lisnterers.forEach((elem) => elem.element.addEventListener(elem.type, elem.event));
  }
}
