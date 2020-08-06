import {EventBus} from '../static/engine/event-bus';

describe('Тестируем ивентбас', () => {
  test('Полный кикл ивентбаса', () => {
    interface Test {
      bus: EventBus;
    }
    class Test {
      constructor(bus: EventBus) {
        this.bus = bus;
      }

      a = 1;
      created() {
        this.a = 2;
      }
    }
    const test = new Test(new EventBus());
    const a = () => test.created();
    test.bus.on('test', a);
    test.bus.emit('test');
    expect(test.a).toEqual(2);
    test.bus.off('test', a);
    // @ts-ignore
    expect(test.bus.listeners.test).toHaveLength(0);
  });
});
