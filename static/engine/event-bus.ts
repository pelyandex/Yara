import { State } from '../types';

export class EventBus {
  listeners = {};

  on(event: string, callback: (e:string) => void): this {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
    return this;
  }

  off(event: string, callback: () => void): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((el) => el !== callback);
  }

  emit(event: string, obj?): this {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => listener(obj));
    return this;
  }
}
export function setEventBusListeners(bus:EventBus, ctx:State) {
  const self = ctx;
  bus
    .on('setup', () => (self.setup ? self.setup() : null))
    .on('mounted', () => (self.mounted ? self.mounted() : null))
    .on('updated', () => (self.updated ? self.updated() : null));
}
