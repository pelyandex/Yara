import Yara from '../static/engine/engine';
describe('Тестируем компонент', () => {
  test('Изменяется стейт', () => {
    const main = document.createElement('div')
    main.classList.add('yara')
    document.body.appendChild(main)
    const pageContext = {
      template: `<div><span>hi</span></div>`,
      data: {a: 11 },
      async setup() {
        await new Promise((res, rej) => {
          setTimeout(() => res((this.data.a = 2)), 1000);
        });
      }
    };
    const context = {
      pages: {index: pageContext},
      router: {index: '/'}
    }
    Yara(context)
    setTimeout(() => expect(pageContext.data.a).toBe(2), 2000);
  });
})
