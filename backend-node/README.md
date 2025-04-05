# DeSciResearchers Backend

This is the backend service for the DeSciResearchers NFT platform. It handles Self Protocol identity verification and NFT metadata preparation.

## Features

- Self Protocol identity verification
- NFT metadata preparation and generation
- Health check endpoint for Railway deployment
- Integration with Polygon Amoy testnet

## API Endpoints

### Identity Verification

- `POST /self/initiate-verification`: Initialize Self Protocol verification
- `POST /self/callback`: Callback endpoint for Self Protocol

### NFT Handling

- `POST /api/prepare-nft-data`: Prepare NFT metadata and tokenURI

### System

- `GET /ping`: Simple health check endpoint (returns "pong")
- `GET /health`: Detailed health check endpoint for Railway

## Prerequisites

- Node.js (v18 or later)
- NPM or Yarn
- Polygon Amoy testnet RPC URL
- Self Protocol scope

## Environment Variables

See `.env.example` for required environment variables.

## Installation

```bash
# Install dependencies
npm install

# Run in development mode
npm run start:dev

# Run in production mode
npm start
```

## Railway Deployment

This project is configured for deployment on Railway. The following files are relevant:

- `railway.json`: Railway configuration
- `Procfile`: Process definition for Railway
- `/health` endpoint: Health check for Railway monitoring

## NFT Contract

The deployed NeuroArt NFT contract is available at:
`0x2F81fFcD282CED88E29a2924885125282d22844d` on Polygon Amoy testnet.

## License

ISC 