# WhatsApp Chat — GREEN-API

Простой веб-чат на **React + TypeScript** для отправки и получения текстовых сообщений в WhatsApp через **GREEN-API**.

## Стек

* React
* TypeScript
* Vite
* Tailwind CSS
* GREEN-API

## Возможности

* авторизация через `idInstance` и `apiTokenInstance`;
* создание чата по номеру телефона;
* отправка текстовых сообщений;
* получение входящих сообщений;
* автоматическое создание входящего чата;
* простой интерфейс в стиле WhatsApp Web.

## Запуск

```bash
npm install
npm run dev
```

Создайте `.env`:

```env
VITE_BASE_API_URL=https://7107.api.greenapi.com
```

После запуска откройте адрес, который покажет Vite.

## GREEN-API

Для работы необходим авторизованный WhatsApp-инстанс GREEN-API.

Документация: https://green-api.com/docs/
