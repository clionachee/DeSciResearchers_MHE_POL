require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: __dirname + '/.env' }); // Explicitly load .env from project root
console.log("--- Hardhat Config ---");
console.log("--- End Hardhat Config ---");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28", // Ensure this matches your contract's pragma
  networks: {
    hardhat: {
      // Configuration for the local Hardhat Network
    },
    amoy: {
      url: "https://polygon-amoy.g.alchemy.com/v2/SCSeGuQ-2M-9Ndy1ljZl-iLdB6mqrqim", // Directly specify RPC URL
      accounts: ["0xc4fd92f0550d0b4b0eb9b7c624c85362d3643955865a6cfbddb05fe9d732f08f"], // Directly specify deployer private key
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
