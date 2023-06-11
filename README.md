# Wordle app

Po założeniu konta oraz zalogowaniu w trakcie rozgrywki:
1. Użytkownik ma 6 prób na odgadnięcie słowa.
2. Po wpisaniu słowa, system sprawdza każdą literę i jej pozycję w 
stosunku do ukrytego słowa.
3. Jeśli litera znajduje się w słowie i jest na odpowiednim miejscu, jej tło 
zostaje zaznaczone na zielono.
4. Jeśli litera znajduje się w słowie, ale nie na odpowiednim miejscu, jej 
tło zostaje zaznaczone na żółto.
5. Jeśli litera nie znajduje się w słowie, jej tło pozostaje szare.

Po zakończeniu rozgrywki, użytkownik otrzymuje komunikat informujący o wyniku, czy udało mu się wygrać grę. 
Ponadto, dane dotyczące rozgrywki, takie jak wynik, liczba prób i inne istotne informacje, 
są zapisywane w bazie danych w celu późniejszego analizowania, śledzenia postępów i generowania statystyk.

## Backend (Java - Spring Boot)

### Wymagania

- Java 17
- Docker

### Konfiguracja

1. Sklonuj to repozytorium: `git clone https://github.com/maks013/WordleApp.git`
2. Przejdź do folderu backend: `cd backend`

### Budowanie i uruchamianie

1. Zbuduj aplikację backendową: `./mvnw clean install`
2. Uruchom plik docker-compose.yml

Aplikacja backendowa zostanie uruchomiona na porcie 8080.

## Frontend (React Native)

### Wymagania

- Node.js
- npm

### Konfiguracja

1. Przejdź do folderu frontend: `cd frontend`

### Instalacja zależności

1. Zainstaluj zależności: `npm install`

### Uruchamianie

1. Uruchom aplikację React Native: `npx react-native start`
2. https://reactnative.dev/docs/environment-setup

## Dodatkowe informacje

Słowa używane w grze są pobierane z adresu:
https://raw.githubusercontent.com/tabatkins/wordle-list/main/words

## Technologie:

Java, Spring Boot (Spring Data, Spring Web, Spring Security), Docker, PostgreSQL, React Native, Typescript.
