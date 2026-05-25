# Stage 1: Сборка React/Vite приложения с помощью Node.js
FROM node:20-alpine AS builder
WORKDIR /app

# Копируем файлы зависимостей и устанавливаем их
COPY package*.json ./
RUN npm ci

# Копируем исходный код и запускаем сборку
COPY . .
RUN npm run build

# Stage 2: Раздача статических файлов с помощью ультра-легкого Nginx
FROM nginx:1.25-alpine

# Копируем собранные файлы из предыдущего шага в директорию Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем кастомную конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
