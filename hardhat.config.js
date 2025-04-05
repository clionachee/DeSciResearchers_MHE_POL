require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: __dirname + '/.env' }); // Explicitly load .env from project root

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28", // Ensure this matches your contract's pragma
  networks: {
    hardhat: {
      // Configuration for the local Hardhat Network
    },
    amoy: {
      url: process.env.POLYGON_AMOY_RPC_URL || "", // Get RPC URL from .env
      accounts: process.env.DEPLOYER_PRIVATE_KEY !== undefined ? [process.env.DEPLOYER_PRIVATE_KEY] : [], // Get deployer key from .env
    },
    // Add other networks like Polygon Mainnet here if needed later
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  // Optional: Add Etherscan API key for verification later
  // etherscan: {
  //   apiKey: process.env.POLYGONSCAN_API_KEY
  // }
};
