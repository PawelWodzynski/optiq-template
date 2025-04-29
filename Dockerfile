# Etap budowania
FROM node:20-alpine as build

WORKDIR /app

# Kopiujemy pliki konfiguracyjne zależności
COPY react-app/package.json react-app/package-lock.json ./

# Instalujemy zależności
RUN npm ci

# Kopiujemy kod źródłowy
COPY react-app/ ./

# Budujemy aplikację
RUN npm run build

# Etap produkcyjny
FROM nginx:alpine

# Kopiujemy zbudowaną aplikację z etapu build
COPY --from=build /app/dist /usr/share/nginx/html

# Konfiguracja Nginx dla Single Page Application
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Eksponujemy port
EXPOSE 80

# Uruchamiamy serwer Nginx
CMD ["nginx", "-g", "daemon off;"]
