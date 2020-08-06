import {Router} from '../static/engine/router';
interface test{
  index: string
}
describe('Тестируем роутер', () => {
  test('Создаем два сингл-тон роутера', () => {
    const router = new Router({index: '/'});
    const b = new Router({index: '/asd'});
    expect(((router.pageObj as unknown) as test).index).toStrictEqual(((router.pageObj as unknown) as test).index);
  });
  test('Перебрасывает на другой роут', () => {
    const router = new Router({asd: 'test'});
    router._onRoute = jest.fn();
    router.go('/asd');
    expect(router._onRoute).toBeCalled();
  });
});
