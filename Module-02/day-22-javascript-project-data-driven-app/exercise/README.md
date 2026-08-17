# Birr Watch

Birr Watch is a simple browser-based currency converter that converts currencies to Ethiopian Birr (ETB) using live exchange-rate data. It also allows users to save currencies to a watchlist for quick reference.

## Features

- Fetches current exchange rates with `fetch()`.
- Converts a user-entered amount from a selected currency to ETB.
- Displays large numbers using readable formatting or scientific notation when appropriate.
- Maintains a personal currency watchlist.
- Allows currencies to be added to and removed from the watchlist.
- Saves the watchlist and selected currency in `localStorage`.
- Handles API and invalid-input errors.

## API

Birr Watch uses the **ExchangeRate-API** open endpoint:

```text
https://open.er-api.com/v6/latest/ETB
```

## How to open it

Download the exercise directory and open index.html
