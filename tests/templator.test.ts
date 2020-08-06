import Dom from '../static/engine/dom';
import { State } from '../static/types';
describe('Тестируем шаблонизатор', () => {
  test('Компилим дом элемент', () => {
    const template = `
    <div>
      <span>hi</span>
    </div>
    `;

    const obj:State = {template}
    const dom = new Dom(template, obj, ()=> {})
    expect(dom.createdDom.children[0].textContent).toBe('hi');
  });
  test('Проверяем вставку из контекста', () => {
    const template = `
    <div>
      <div>{{temp}}</div>
    </div>`;
    const obj:State = {template, data: {temp: 1}}
    const dom = new Dom(template, obj, ()=> {})
    expect(dom.createdDom.children[0].textContent).toBe('1');
  });
  test('Проверяем некорректные данные', () => {
    const template = `kiv>das</div>`;
    function test () {
      const obj:State = {template}
      return new Dom(template, obj, () => {})
    }
    expect(test).toThrowError();
  });
 
});
