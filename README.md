## Getting Started

- Создайте файл .env 
```bash
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_INITDB_DATABASE=
```
- Установите и запустите Docker на компьютере

- Запустите в терминале из папки проекта контейнеры Redis и MongoDB Docker командой:
```bash
docker-compose up -d
```
- Создайте переменные среды в файле .env.local

- Соберите строку подключения к БД из значений, которые вы указали в .env файле
```bash
MONGODB_LOCAL_URI=mongodb://'MONGO_INITDB_ROOT_USERNAME':'MONGO_INITDB_ROOT_PASSWORD'@localhost:6000/'MONGO_INITDB_DATABASE'?authSource=admin

ACCESS_TOKEN_PRIVATE_KEY=
ACCESS_TOKEN_PUBLIC_KEY=

REFRESH_TOKEN_PRIVATE_KEY=
REFRESH_TOKEN_PUBLIC_KEY=
```
* [тут можно сгенерировать ключи для проекта](http://travistidwell.com/jsencrypt/demo/) 

* [тут можно их закодировать в Base64](https://www.base64encode.org/) 

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Коллекция для тестирования запросов через Postman 

* https://documenter.getpostman.com/view/21290875/2sAYHzHNui

Так же тестировать и создавать запросы к БД можно перейдя по адресу локально 

* http://localhost:3000/api/graphql

Открыть Apollo Sandbox по кнопке 'Query your server'

