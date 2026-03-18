# Store API (Dockerized)

Простое backend-приложение для работы с товарами, заказами и пользователями.  
Реализован REST API с базовыми CRUD операциями.  
Система развёрнута с использованием Docker и Docker Compose.

## Стек

- Node.js
- Express
- MongoDB
- Docker / Docker Compose

## Возможности

- Создание, получение, обновление и удаление:
  - товаров (products)
  - заказов (orders)
  - клиентов (customers)
- Работа через HTTP API
- Данные сохраняются в MongoDB (через volume)

## Запуск

1. Создать файл `.env`:
MONGO_URI=mongodb://mongo:27017/storedb

2. Запустить контейнеры:
docker compose up --build

3. API будет доступен по адресу:
http://localhost:3000


## Тестирование API

Тестирование можно выполнять через Postman или curl.

### Основные endpoints:

#### Products
- `POST /products` — создать товар
- `GET /products` — получить список
- `PUT /products/:id` — обновить
- `DELETE /products/:id` — удалить

#### Orders
- `POST /orders`
- `GET /orders`
- `PUT /orders/:id`
- `DELETE /orders/:id`

#### Customers
- `POST /customers`
- `GET /customers`
- `PUT /customers/:id`
- `DELETE /customers/:id`

### Пример запроса (Postman):
- POST: http://localhost:3000/api/products 
- JSON:
{
    "name": "Wooden pool",
    "material": "Oak",
    "price": 39.99,
    "stock": 5,
    "_id": "69bacfde03b3d5e661bf2d7c",
    "__v": 0
}
### Пример запроса (POSTMAN)

