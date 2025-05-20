# Базовый образ (легковесный Alpine-вариант Nginx)
FROM nginx:alpine

# 1. Удаляем дефолтный конфиг Nginx (чтобы не конфликтовал с нашим)
RUN rm -rf /etc/nginx/conf.d/default.conf

# 2. Копируем кастомную конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/

# 3. Копируем файлы проекта в папку Nginx
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/

# 4. Открываем порт 80 (HTTP)
EXPOSE 80

# 5. Запускаем Nginx в foreground-режиме
CMD ["nginx", "-g", "daemon off;"]