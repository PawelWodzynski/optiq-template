# Docker Nginx Server

Ten projekt zawiera konfigurację Docker do uruchomienia serwera Nginx z plikami HTML.

## Struktura projektu
projekt/
├── html/
│   └── index.html  # Ten plik ma być zastąpiony
├── docker-compose.yml
├── Dockerfile
└── README.md

## Instrukcje dla bota

### Zmiana nazwy pliku HTML

Bot powinien wykonać następujące kroki:

1. Znajdź plik wygenerowany przez użytkownika (np. `strona.html` lub inny)
2. Zmień nazwę tego pliku na `index.html`
3. Zastąp istniejący plik `index.html` w folderze `html/`

### Przykładowe polecenie
Zmień nazwę pliku [nazwa_pliku].html na index.html i zastąp nim plik w folderze html/

## Uruchomienie projektu

Po zastąpieniu pliku index.html, uruchom projekt za pomocą:

```bash
docker-compose up
Serwer będzie dostępny pod adresem http://localhost:8080

To cały tekst README.md, który możesz skopiować w całości.
