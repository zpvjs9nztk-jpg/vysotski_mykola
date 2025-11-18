# Використовуємо офіційний Node.js LTS образ
FROM node:lts

# Створюємо робочу директорію всередині контейнера
WORKDIR /usr/src/app

# Копіюємо package.json та package-lock.json (якщо є) і встановлюємо залежності
COPY package*.json ./
RUN npm install

# Копіюємо весь код проєкту в контейнер
COPY . .

# Виконуємо build проєкту (створюємо dist/index.html)
RUN npm run build

# Виставляємо порт, на якому працюватиме сервер
EXPOSE 3000

# Команда для запуску Node.js сервера
CMD ["node", "index.js"]

