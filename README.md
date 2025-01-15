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



## IDE 

**Для разработки проекта использовалась Visual Studio Code (VS Code)**

### Преимущества VS Code:

1. **Легковесность и скорость**: VS Code быстро запускается и работает, не потребляя много системных ресурсов.

2. **Расширяемость**: Огромное количество расширений позволяет настроить редактор под любые нужды, поддерживая различные языки программирования и инструменты.

3. **Интегрированный терминал**: Удобство работы с командной строкой прямо в редакторе.

4. **Поддержка Git**: Встроенные возможности работы с Git позволяют легко управлять версиями кода.

5. **Поддержка IntelliSense**: Умные подсказки кода, автодополнение и навигация по коду.

6. **Кроссплатформенность**: Работает на Windows, macOS и Linux.

## Agile...

**Для разработки проекта использовалась методология Agile и ее основные принципы**
- В качестве фреймворка использовалт Kanban
- Основные свимлайны - разпределение бэк/фронт/дизайн/тест


## В серверной части проекта используются следующие элементы ООП и паттерны:

1. **Классы и Наследование**:
- `UserResolver`, `ResultResolver` - классы-резолверы для GraphQL
- `UserService`, `ResultService` - сервисные классы
- Использование декораторов `@Resolver()`, `@Query()`, `@Mutation()`
- Класс `UserService`, инкапсулирует логику, связанную с пользователями (регистрация, вход, выход и т. д.).
- Методы класса `UserService` инкапсулируют функциональность, связанную с пользователями. Это позволяет скрыть детали реализации и предоставить чистый интерфейс для взаимодействия с пользователями.

```typescript
@Resolver()
class UserResolver {
    constructor(private userService: UserService) {}
    
    // Методы резолвера
    @Query()
    async getUsers() {
        // логика получения пользователей
    }
}

class UserService {
    // Приватные поля класса
    private constructor() {}
    
    // Методы сервиса
    async registerUser() {
        // логика регистрации
    }
    
    async loginUser() {
        // логика входа
    }
}
```

2. **Паттерн Singleton**:
- Приватные конструкторы для реализации паттерна Singleton.

```typescript
constructor(private userService: UserService) {
    this.userService = new UserService();
}
```

3. **Паттерн Service(архитектурный паттерн)**:
- `UserService` - обработка бизнес-логики для пользователей
- Основные методы:
```typescript
class UserService {
  async signUpUser(input: Partial<User>)     // Регистрация
  async loginUser(input: LoginInput)         // Авторизация
  async getMe(ctx: Context)                  // Получение данных пользователя
  async refreshAccessToken(ctx: Context)      // Обновление токена
  async logoutUser(ctx: Context)             // Выход из системы
}
```

- `ResultService` - обработка бизнес-логики для результатов
- Основные методы:
```typescript
class ResultService {
  async createResult(input: Partial<Result>, ctx: Context) // Создание результата
  async getResults(ctx: Context)                          // Получение результатов
}
```
- Особенности реализации:
1. Каждый сервис инкапсулирует свою бизнес-логику
2. Сервисы используются через dependency injection в резолверах
3. Обработка ошибок происходит централизованно через `errorHandler`
4. Сервисы работают с моделями данных (`UserModel`, `ResultModel`)

- Сервисы вызываются из соответствующих резолверов (`user.resolver.ts` и `result.resolver.ts`), что обеспечивает четкое разделение ответственности в приложении.

4. **Dependency Injection**:
```typescript
constructor(private userService: UserService)
```

### Основные принципы ООП в коде:
1. **Инкапсуляция**: 
- Приватные поля в конструкторах (`private userService`, `private resultService`)
- Методы сервисов скрывают детали реализации

2. **Абстракция**:
- Интерфейсы и типы (`Context`, `User`, `Result`)
- Разделение бизнес-логики в сервисах

3. **Наследование**:
- Через декораторы TypeGraphQL (`@Resolver()`, `@Query()`, `@Mutation()`)
- В моделях через декораторы Typegoose

4. **Полиморфизм**:
- Через систему типов TypeScript
- В обработке различных типов запросов GraphQL


## Тестирование

### Тестирование компонентов UI
Тесты для компонентов Button и Card, которые используются в проекте.

#### Button Component
Компонент Button тестируется на следующие возможности:

```jsx
// Базовый рендер
<Button>Click Me</Button>

// С кастомными вариантами
<Button variant="destructive" size="sm">
  Destructive Button
</Button>

// Как ссылка
<Button asChild>
  <a href="/test">Link Button</a>
</Button>

// С дополнительными классами
<Button className="custom-class">Custom Button</Button>
```

#### Тестовые сценарии:
1. Корректный рендер базовой кнопки
2. Применение дефолтных стилей (variant и size)
3. Применение кастомных вариантов оформления
4. Рендер в качестве дочернего компонента (например, ссылки)
5. Добавление пользовательских классов
6. Обработка кликов
7. Состояние disabled

#### Card Component
Card компонент тестируется на следующие возможности:

```jsx
// Базовая карточка
<Card>Content</Card>

// С заголовком и описанием
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

#### Тестовые сценарии:
1. Рендер базовой карточки
2. Применение пользовательских классов
3. Корректный рендер CardHeader
4. Проверка стилей CardTitle
5. Проверка стилей CardDescription
6. Рендер CardContent и CardFooter

Тесты написаны с использованием Jest и @testing-library/react для максимально приближенного к реальности тестирования компонентов.
