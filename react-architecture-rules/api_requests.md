# Zasady Tworzenia Requestów API (Frontend React)

Ten dokument opisuje zasady tworzenia żądań HTTP z aplikacji frontendowej React do backendu.

## 1. Metoda Wysyłania Żądań: `fetch`

**Wszystkie żądania do API backendu muszą być realizowane przy użyciu natywnego API `fetch`.**

- **Axios**: Biblioteka `axios` **nie jest już używana** w projekcie do wysyłania żądań API. Należy unikać jej stosowania w nowym kodzie i refaktoryzować istniejący kod, jeśli to możliwe.
- **Proxy**: Konfiguracja `proxy` w pliku `package.json` **nie jest już używana**. Została usunięta lub powinna być ignorowana.

## 2. Adres URL Backendu

Żądania muszą być kierowane **bezpośrednio** na adres backendu działającego lokalnie:

`http://localhost:8080/nazwa-endpointu`

**Przykład:**
```javascript
const response = await fetch("http://localhost:8080/validate-token?token=...", {
  method: "GET",
  headers: {
    // ... inne nagłówki
  }
});
```

## 3. Autoryzacja (Token JWT)

Dla endpointów wymagających uwierzytelnienia, **token JWT musi być dołączony** do żądania w nagłówku `Authorization`.

- Token jest przechowywany w `localStorage` po pomyślnym zalogowaniu lub rejestracji.
- Należy pobrać token z `localStorage` i dodać go do nagłówka w formacie `Bearer <token>`.

**Przykład (wewnątrz funkcji `async`):**
```javascript
const token = localStorage.getItem("token");

if (token) {
  try {
    const response = await fetch("http://localhost:8080/some-protected-endpoint", {
      method: "GET", // lub POST, PUT, DELETE
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", // Jeśli wysyłasz JSON
        "Accept": "application/json" // Dobra praktyka, aby oczekiwać JSON
      },
      // body: JSON.stringify(data) // Dla metod POST/PUT
    });

    if (!response.ok) {
      // Obsługa błędów HTTP (np. 401, 403, 404, 500)
      console.error("API request failed with status:", response.status);
      // Można rzucić błąd lub zwrócić odpowiedni stan
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json(); // Przetwarzanie odpowiedzi JSON
    // ... obsługa sukcesu

  } catch (error) {
    console.error("Error during API request:", error);
    // ... obsługa błędów sieciowych lub innych
  }
} else {
  console.log("No token found, user is not authenticated.");
  // ... obsługa braku tokenu (np. przekierowanie do logowania)
}
```

## 4. Obsługa Odpowiedzi i Błędów

- Zawsze sprawdzaj status odpowiedzi (`response.ok` lub `response.status`).
- Używaj bloków `try...catch` do obsługi błędów sieciowych lub błędów podczas przetwarzania odpowiedzi.
- Przetwarzaj odpowiedź JSON za pomocą `response.json()`.

## 5. Przykład Implementacji

Przykład użycia `fetch` do walidacji tokenu można znaleźć w komponencie `ProtectedRoute.js`.

## 6. Tworzenie Nowych Endpointów Backendowych

Jeśli zachodzi potrzeba stworzenia nowego endpointu po stronie backendu, zapoznaj się z zasadami opisanymi w pliku `/java-architecture-rules/endpoint_rules.md` (jeśli istnieje).
