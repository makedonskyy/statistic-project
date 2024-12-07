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


