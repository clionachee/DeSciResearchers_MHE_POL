# DeSciResearchers - NFT Platform for Scientific Identity Verification

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project combines Self Protocol identity verification with NFT technology to create a platform where researchers can mint NFTs after verifying their identity. Built on Polygon's Amoy testnet, it demonstrates a secure pathway from identity verification to on-chain representation.

## Project Structure

The repository contains:

- **Smart Contracts**: ERC-721 NFT contract (`NeuroArt.sol`) deployed to Polygon Amoy
- **Backend Service**: Node.js/Express server handling identity verification and NFT metadata
- **Unity Integration**: API endpoints for Unity frontend developers

## Key Features

- **Self Protocol Integration**: Secure identity verification using passports
- **NFT Minting**: Direct minting from user wallets after verification
- **Metadata Generation**: Automated creation of NFT metadata with identity attestations
- **Fully Decentralized**: No centralized dependency for minting (removed MultiBaas requirement)

## Deployed Resources

- **NeuroArt Contract**: [`0x2F81fFcD282CED88E29a2924885125282d22844d`](https://amoy.polygonscan.com/address/0x2F81fFcD282CED88E29a2924885125282d22844d) on Polygon Amoy
- **Backend API**: [Railway deployment URL - TBD]

## Backend API

### Identity Verification Endpoints

- `POST /self/initiate-verification`: Start verification process (returns `sessionId`)
- `POST /self/callback`: Callback endpoint for Self Protocol

### NFT Endpoints

- `POST /api/prepare-nft-data`: Prepare NFT metadata after identity verification

## Frontend Integration

Unity developers can integrate with this backend using the following flow:

1. Call `/self/initiate-verification` to get a `sessionId`
2. Use Self Protocol SDK to complete verification
3. After verification, call `/api/prepare-nft-data` with `sessionId` and art parameters
4. Use the returned `tokenURI` to mint an NFT directly from the user's wallet

## Local Development

```bash
# Clone repository
git clone https://github.com/clionachee/DeSciResearchers.git
cd DeSciResearchers

# Install backend dependencies
cd backend-node
npm install

# Run backend
npm run start:dev
```

## Environment Setup

Create a `.env` file in the `backend-node` directory with:

```
PORT=5001
POLYGON_AMOY_RPC_URL="your_rpc_url"
SCOPE="Researchers"
SELF_RPC_URL="https://rpc.ankr.com/et/api/v0"
IPFS_API_URL="http://127.0.0.1:5001/api/v0"
NEUROART_CONTRACT_ADDRESS="0x2F81fFcD282CED88E29a2924885125282d22844d"
```

## License

MIT 