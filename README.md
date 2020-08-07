<p align="center"><img width="450" src="https://i.ibb.co/Wxm9429/YARA.png" alt="Yara logo"></p>

> Yara - легковесная библиотека шаблонизации с намеком и реализацией поверхностной реактивности <br>
> Была создана, специально для  Yandex.Learning


Установка
------------

```sh
  $ npm clone https://github.com/pelyandex/Yara.git
  $ npm install
```
Запуск
-------------------
1. Если вы хотите запустить проект локально (без докера)
```sh
  $ npm run development
  $ npm run development-node
```
2. Если вы хотите запустить в контейнере (с докером)
```sh
  $ docker build -t yara .
  $ docker run -d -p 80:80 -p 443:443 yara
```

В кратце о Yara
-------------------
- Система поверхностной реактивности и шаблонизации
- Компоненты связываются между собой root-eventBus'om
- Каждый компонент и подкомпонент вызывает внутри себя хуки жизненного цикла, которые вы можете использовать в своих целях.
- Своя библиотека валидации
- Связывание контекста и итерационный рендеринг
- Развертывание проекта с http2 на nginx

Быстрый старт
-------------------
- Создайте 2 файла: конекст с полем data и шаблон
- Инжектируйте шаблон в контекст 
- Произведите импорт движка Yara в общий TS файл и инжектируйте в него конекст как показано на примере./


Быстро об API
-----------
> Context bindind:
- Используйте ''ya-% eventname %'' для привязки event-handlers с вашими методоами
- Используйте mustache ''{{% variable of you context %}}'' для связки контекста с вашим темплейтом
- Используйте '' for = "% array %" '' для использования итерационной директивы
- Используйте '' context.components '' для инжектирования ваших подкомпонентов

> Библиотека валидации
- Примеры использования вы можете найти в проекте

## Ссылки для оценки работы Yara
  ```sh
  $ login: default
  $ password: default
```
 - https://praktikum-yara.herokuapp.com/signin
 - https://praktikum-yara.herokuapp.com//signup
 - https://praktikum-yara.herokuapp.com/
 - https://praktikum-yara.herokuapp.com/settings
 
 **Спасибо, что дочитали до конца =).**
