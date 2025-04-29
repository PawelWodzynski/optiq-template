FROM mysql:8.0
# Zmienne środowiskowe (będą nadpisane przez docker-compose)
ENV MYSQL_DATABASE=auth-db
ENV MYSQL_ROOT_PASSWORD=password
# Kopiowanie skryptów inicjalizacyjnych
COPY auth-db.sql /docker-entrypoint-initdb.d/
COPY data-db.sql /docker-entrypoint-initdb.d/
# Ekspozycja standardowego portu MySQL
EXPOSE 3306
