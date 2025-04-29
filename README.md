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

### Pobieranie pliku HTML z linku
Jeśli bot otrzyma link do strony HTML, powinien:
1. Pobrać stronę za pomocą narzędzia wget jako plik HTML
2. Zapisać pobrany plik w folderze `html/`
3. Zmienić nazwę pobranego pliku na `index.html`
4. Zastąpić istniejący plik `index.html` w folderze `html/`

### Przykładowe polecenia
- Zmień nazwę pliku [nazwa_pliku].html na index.html i zastąp nim plik w folderze html/
- Pobierz stronę z podanego linku [url] i zastąp nią plik index.html w folderze html/

## Uruchomienie projektu
Po zastąpieniu pliku index.html, uruchom projekt za pomocą:
```bash
docker-compose up
