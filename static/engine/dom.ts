import { EventBus, setEventBusListeners } from './event-bus';
import { State } from '../types';

export type ListenerObject = {
  element: HTMLElement;
  type: string;
  event: any;
};
type LocalNode = {
  tagName: string,
  content?:string,
  attributes?: NamedNodeMap,
  bind?: string | {},
  element?: HTMLElement
  children?: {},
  parent?: HTMLElement | null
};
type Fored = {
  [key: string]: {
    value: string
  }
};
export default class Dom {
  $bus: EventBus;

  parsedHtml: Node;

  dom: {};

  clearContext = /\\n| /;

  stateContext = /{{|}}/g;

  yaContext=/ya-(\w*)/i;

  yaValue= /{{(\w*)}}/;

  listeners:ListenerObject[] = [];

  createdVDom: LocalNode;

  createdDom: HTMLElement;

  doCompile: Function;

  asyncComponents: number;

  data: {};

  constructor(
    html:string,
    obj:State,
    doCompile: (domContext:HTMLElement, replace:HTMLElement, module:string) => void,
  ) {
    this.data = obj.data;
    this.doCompile = async function func(
      domContext:HTMLElement, replace:HTMLElement, module:string,
    ) {
      return doCompile(domContext, replace, module);
    };

    this.$bus = new EventBus();
    setEventBusListeners(this.$bus, obj);
    this.$bus.emit('setup');
    this.parsedHtml = new DOMParser().parseFromString(html, 'text/html').body.firstElementChild;
    if (!this.parsedHtml) {
      throw new Error('Incorrect html');
    }

    if (obj.data) {
      this.setProxy(obj);
    }

    this.asyncComponents = 0;
    this.replaceForElement(this.parsedHtml);
    this.createdVDom = this.createVDom(this.parsedHtml as HTMLElement, obj.data, null);
    this.createdDom = document.createElement('div');
    this.createdDom.classList.add('yara');
    this.creatorOfHtml(this.createdVDom, this.createdDom, obj.methods);
    this.$bus.emit('mounted');
  }

  setDuplicateContext(node:Node, key:string, ind:number) {
    if (!this.clearContext.test(node.textContent) && this.yaValue.test(node.textContent)) {
      const temp = node.textContent.match(this.yaValue)[1];
      node.textContent = `{{${key}.${ind}.${temp}}}`;
    } else {
      Array.from((node as HTMLElement).children).forEach((el) => {
        this.setDuplicateContext(el, key, ind);
      });
    }
  }

  duplicate(node:Node, parent:Node) {
    const result = [];
    for (let i = 0; i < this.data[((node as unknown) as HTMLElement).attributes['ya-for'].value].length; i++) {
      const dNode = node.cloneNode(true);
      const key:string = (dNode as HTMLElement).attributes['ya-for'].value;
      (dNode as HTMLElement).setAttribute('fored', key);
      (dNode as HTMLElement).removeAttribute('ya-for');
      this.setDuplicateContext(dNode, key, i);
      result.push(dNode);
    }

    result.forEach((el:HTMLElement, ind:number, arr:Node[]) => {
      if (!ind) {
        parent.replaceChild(el, node);
      } else if (ind) {
        parent.insertBefore(el, arr[ind - 1].nextSibling);
      }
    });
  }

  replaceForElement(html:Node, parent?:Node | null) {
    if (html) {
      if ((html as HTMLElement).attributes && (html as HTMLElement).attributes['ya-for']) {
        this.duplicate(html, parent);
      }

      Array.from(html && (html as HTMLElement).children).forEach((el:HTMLElement) => {
        this.replaceForElement(el, (el as Node).parentNode);
      });
    }
  }

  createVDom(element:HTMLElement, context, node): LocalNode {
    const vNode: LocalNode = { tagName: element.tagName };
    vNode.bind = this.bindValue(element);
    vNode.content = this.findContext(element, context);
    vNode.attributes = element.attributes;
    vNode.parent = node;
    const children = Array.from(element.children);
    if (children.length) {
      vNode.children = children.map((el) => this.createVDom(el as HTMLElement, context, vNode));
    }

    return vNode;
  }

  bindValue(element:HTMLElement) {
    const { fored } = (element.attributes as unknown) as Fored;
    if (fored) {
      return { fored: fored.value };
    }

    if (this.yaValue.test(element.textContent) && !this.clearContext.test(element.textContent)) {
      const matcher = element.textContent.match(this.yaValue);
      return matcher ? matcher[1] : element.textContent.match(/\w*/)[0];
    }

    return null;
  }

  findContext(text:HTMLElement, context:State) {
    if (/\n/.test(text.textContent)) {
      return '';
    }

    if (/\./.test(text.textContent)) {
      const evale = text.textContent.replace(this.stateContext, '').split('.');
      let tempContext = JSON.parse(JSON.stringify(context));
      evale.forEach((el) => {
        tempContext = tempContext[el];
      });
      text.setAttribute('evale', String(evale));
      return tempContext;
    }

    if (this.stateContext.test(text.textContent)) {
      return context[text.textContent.replace(this.stateContext, '')];
    }

    return text.textContent;
  }

  setProxy(contextData:State) {
    // Проксирование локального стейта через мутацию контекста
    const context = contextData;
    const { replacer } = this;
    const { $bus } = this;
    const deepProxy = (onChange, target) => new Proxy(target, {
      get(proxyTarget, property) {
        const item = proxyTarget[property];
        if (item && typeof item === 'object') {
          return deepProxy(onChange, item);
        }

        return item;
      },
      set: (proxyTarget, property, newValue) => {
        proxyTarget[property] = newValue;
        replacer(this.createdVDom, property, newValue);
        $bus.emit('updated');
        return true;
      },
    });

    context.data = deepProxy(replacer, context.data);
  }

  replacePrimitive(vDom, bind, value) {
    if (vDom.bind === bind) {
      vDom.element.textContent = value;
      return true;
    }

    const children = vDom.children || [];
    if (children.length) {
      for (const item of children) {
        if (this.replacePrimitive(item, bind, value)) {
          return true;
        }
      }
    }
  }

  replaceFor(vDom, bind, value) {
    if (vDom.element.attributes.fored && vDom.element.attributes.fored.value === bind) {
      const copyArr = [];
      const { length } = Object.keys(value);
      for (let i = 0; i < length; i++) {
        copyArr.push(vDom.element.cloneNode(true));
      }

      copyArr.forEach((el, ind) => {
        const helper = (el1) => {
          if (el1.attributes.evale) {
            const keys = el1.attributes.evale.value.split(',');
            keys.shift();
            keys[0] = ind;
            let tempContext = JSON.parse(JSON.stringify(value));
            keys.forEach((el2) => {
              tempContext = tempContext[el2];
            });
            el1.textContent = tempContext;
            return true;
          }

          for (const i of Array.from(el1.children)) {
            helper(i);
          }
        };

        helper(el);
      });
      vDom.parent.children.forEach((elem1, ind) => {
        if (elem1.bind.fored === bind || elem1.bind === bind) {
          vDom.parent.element.removeChild(elem1.element);
          delete vDom.parent.children[ind];
        }
      });
      vDom.parent.children = vDom.parent.children.filter((el) => el);
      copyArr.forEach((el) => {
        vDom.parent.children.push(this.forNodeRestore(el, vDom.parent, bind));
        vDom.parent.element.appendChild(el);
      });
      return true;
    }

    const children = vDom.children || [];
    if (children.length) {
      for (const item of children) {
        if (this.replaceFor(item, bind, value)) {
          return true;
        }
      }
    }
  }

  forNodeRestore(el, parent, bind) {
    return { element: el, parent, bind: { fored: bind } };
  }

  replacer = (vDom, bind:string|number|symbol, value: unknown) => {
    if (!vDom) {
      return null;
    }

    if (typeof this.data[bind] === 'object') {
      this.replaceFor(vDom, bind, value);
    } else {
      this.replacePrimitive(vDom, bind, value);
    }
  };

  creatorOfHtml(vDom:LocalNode, domContext: HTMLElement, methods: {}) {
    if (this.yaContext.test(vDom.tagName)) {
      this.asyncComponents++;
      const div = document.createElement('div');
      const module = vDom.tagName.match(this.yaContext)[1];
      div.setAttribute('replace', module);
      domContext.appendChild(div);
      setTimeout(() => this.createComponent(domContext, div, module), 1);
    } else {
      this.createBlock(vDom, domContext, methods);
    }
  }

  createComponent(domContext:HTMLElement, replace:HTMLElement, module:string) {
    this.doCompile(domContext, replace, module.toLowerCase());
  }

  createBlock(vDom:LocalNode, domContext:HTMLElement, methods: {}) {
    const element = document.createElement(vDom.tagName);
    element.textContent = vDom.content;
    for (const key in vDom.attributes) {
      if (Object.prototype.hasOwnProperty.call(vDom.attributes, key)) {
        const data = vDom.attributes[key];
        if (this.yaContext.test(data.nodeName)) {
          const listObj:ListenerObject = {
            element,
            type: data.nodeName.match(this.yaContext)[1],
            event: methods[data.value],
          };
          this.listeners.push(listObj);
        } else {
          element.setAttribute(data.nodeName, data.value);
        }
      }
    }

    if (vDom.children) {
      Array.from((vDom as HTMLElement).children).forEach((el) => {
        this.creatorOfHtml(el, element, methods);
      });
    }

    vDom.element = element;
    domContext.appendChild(element);
  }
}
