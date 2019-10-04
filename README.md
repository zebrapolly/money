# Task 

Реализовать API сервис для получения данных

Необходимо создать:

Скрипт для парсинга валют с адреса http://www.cbr.ru/scripts/XML_daily.asp (будет плюсом создание cron job через pm2)

Реализовать 2 REST API метода:
GET /currencies — должен возвращать список курсов валют с возможность пагинации
GET /currency/{id} — должен возвращать курс валюты для переданного id

БД любая, предпочтение mongodb
API должно быть закрыто bearer авторизацией.

Желательно в проекте увидеть:
 - Typescript
 - *Lint(tslint, eslint)
 - Документация оформленная в swagger
 - Использование демонов ноды(pm2, nodemon)

# Start

Mongo должна быть запущена

- Билд и запуск апи
> pm2 start --only API
- Билд и запуск парсера
> pm2 start --only worker
- Загрузка миграций(тестовый пользователь)
> pm2 start --only migration

- Документация localhost:3000/api

## Test user 
username: 'test'
password: 'test'
