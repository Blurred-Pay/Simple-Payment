# Stellar Payment dApp

A simple Stellar testnet dApp that lets you connect your Freighter wallet, check your XLM balance, and send XLM payments.

Built for **Stellar Level 1 – White Belt** challenge.

## Features

- Connect / Disconnect Freighter wallet
- View XLM balance on Stellar Testnet
- Send XLM to any Stellar address
- Transaction success / failure feedback with transaction hash
- Dark mode UI

## Prerequisites

- [Freighter Wallet](https://freighter.app/) browser extension installed
- Node.js 18+
- A Stellar testnet-funded account ([Stellar Lab Faucet](https://lab.stellar.org/account/create?network=testnet))

## Setup

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open the URL shown in the terminal (default `http://localhost:5173`).

## Build

```bash
npm run build
```

## Screenshots

| # | Screenshot | Description |
|---|---|---|
| 1 | *Add screenshot* | Wallet connected state |
| 2 | *Add screenshot* | Balance displayed |
| 3 | *Add screenshot* | Successful testnet transaction |
| 4 | *Add screenshot* | Transaction result shown to the user |

## Project Structure

```
src/
├── components/
│   ├── WalletConnect.tsx     # Connect/disconnect button
│   ├── BalanceCard.tsx       # XLM balance display
│   ├── SendPayment.tsx       # Payment form
│   └── TransactionStatus.tsx # Success/failure feedback
├── hooks/
│   ├── useWallet.ts          # Wallet connection state
│   └── useBalance.ts         # Balance fetching
├── utils/
│   └── stellar.ts            # Stellar SDK helpers (balance, send)
├── App.tsx                   # Main app
├── App.css                   # Styles
└── main.tsx                  # Entry point
```

## Tech Stack

- React + TypeScript
- Vite
- `@stellar/stellar-sdk` – Stellar network interaction
- `@stellar/freighter-api` – Freighter wallet integration
- Stellar Testnet
