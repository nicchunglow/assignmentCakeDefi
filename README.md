### La Coco Crypto Exchange - Swap token Assignment

#### Table of contents

- [Introduction](#Introduction)

- [Technologies](#Technologies)

- [considerations](#considerations)

- [Things to note](#things-to-note)

- [Setup](#Setup)

- [Availble Scripts](#Available-Scripts)

- [Environment Variables](#Environment-Variables)

- [Package Issues](#Package-issues)

- [Improvements](#Improvements)

#### Introduction

This project was build on React, written in Typescript, designed with Tailwindcss, using coinGecko api as backend

The goal of the backend was to do :

1. Display his store name and current date/time - La Coco Crypto Exchange
2. Should support these cryptocurrencies - BTC, ETH, USDT, DFI, DOGE
3. Should have two input fields
   i. Input #1 - Token to swap
   ii. Input #2 - Token to receive
4. On change of input #1 or input #2, both fields should recalculate. Meaning, if I change input 1, input 2 will display the amount to receive. If I change input 2, input 1 will display the amount I need.
5. Both inputs should be able to switch to other currency
6. Should not be able to select on same currency on both fields
   Bonus:

7. Prices should be displayed (e.g, 1 BTC = 16.47 ETH)
8. Should have a swap button. When clicked, it will reverse the currencies. (e.g, BTC => ETH, Press swap, ETH => BTC)

The project meets all the requirement, including having unit test and responsive UI for the codebase.

#### Technologies

    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.11.66",
    "@types/react": "^18.0.21",
    "@types/react-dom": "^18.0.6",
    "axios": "^0.27.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.6.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.8.4",
    "web-vitals": "^2.1.4"

##### DevDependencies:

    "@testing-library/dom": "^8.19.0",
    "@testing-library/user-event": "^14.4.3",
    "@typescript-eslint/eslint-plugin": "^5.40.0",
    "@typescript-eslint/parser": "^5.40.0",
    "autoprefixer": "^10.4.12",
    "axios-mock-adapter": "^1.21.2",
    "eslint": "^8.25.0",
    "eslint-plugin-react": "^7.31.10",
    "husky": "^8.0.1",
    "lint-staged": "^13.0.3",
    "postcss": "^8.4.18",
    "prettier": "^2.7.1",
    "tailwindcss": "^3.1.8"

## considerations

- Faced an issue initially with api as api has `current_price` within `market_data` and `tickers`
- Current implementation used `tickers` to get the data. However, initial consideration was that `current_price` sounds like the source of truth for the most accurate pricing
- UI designed with tailwind is now mobile responsive as well.
- loader added for smoother UI experience

## Things to note

- axios version now at 0.27.2 because it impacted the jest functionality
  https://github.com/axios/axios/issues/5101

- Add husky to project to check linting on at pre-commit

- axios-mock-adapter was used as part of testing

#### Setup

To run this project, git clone and install it locally using npm:

```

$ cd ../

$ git clone https://github.com/nicchunglow/la-coco-crypto-exchange-frontend.git

$ npm install

& add .env to project with the following:

REACT_APP_API_BASEURL='https://api.coingecko.com/api/v3'

$ npm start

```

## Available Scripts

In the project directory, you can run:

```
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "coverage": "react-scripts test --coverage",
    "eject": "react-scripts eject",
    "prepare": "husky install"
```

For husky, we have a pre-commit to lint our code

```
   #!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install lint-staged
```

## Environment Variables

REACT_APP_API_BASEURL='https://api.coingecko.com/api/v3'

## Improvements

- Extract the card component to be reused
- Add abit more test
- Might want to look into api call function again.
