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

## Установка

Клонируйте репозиторий и установите зависимости:

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

## Настройка

Создайте файл `.env` в корне проекта:

```env
VITE_BASE_API_URL=https://7107.api.greenapi.com
```

Для работы также необходим авторизованный WhatsApp-инстанс GREEN-API.

## Запуск

Запустите проект в режиме разработки:

```bash
npm run dev
```

После запуска откройте адрес, который покажет Vite.

## Сборка

Для создания production-сборки:

```bash
npm run build
```

Готовая сборка будет находиться в папке `dist`.

## GREEN-API

Для работы приложения необходим авторизованный WhatsApp-инстанс GREEN-API.

Документация: green-api.com/docs/
