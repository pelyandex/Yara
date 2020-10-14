import { Yaxios, queryStringify } from '../static/engine/yaxios';
describe('Тестируем yaxios', () => {
  test('GET-запрос', async () => {
    const data = {
      postId: 1,
      id: 1,
      name: 'id labore ex et quam laborum',
      email: 'Eliseo@gardner.biz',
      body:
        'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
    };
    const response = {
      data,
      status: 200,
      statusText: 'OK',
    };
    const yaxios = new Yaxios({ baseUrl: 'https://jsonplaceholder.typicode.com' });
    expect(await yaxios.get('/comments/1')).toStrictEqual(response);
  });
  test('Перевод обьекта со вложенностью в квери', () => {
    const a = { a: 1, b: 2, c: { d: 3 } };
    expect(queryStringify(a)).toEqual('?a=1&b=2&c[d]=3');
  });
  test('Создаем неправильный инстанс Yaxios', () => {
    function a() {
      // @ts-ignore
      new Yaxios({ baseUrl: 22 });
    }
    expect(a).toThrowError(/Должно быть строкой/);
  });
});
