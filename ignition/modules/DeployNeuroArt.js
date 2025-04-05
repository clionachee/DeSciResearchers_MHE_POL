const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require('dotenv').config({ path: '../../.env' }); // Load .env file from root

// Read the initial owner address from the .env file
const initialOwner = process.env.INITIAL_OWNER_ADDRESS;

if (!initialOwner) {
  console.error("Error: INITIAL_OWNER_ADDRESS not found in .env file.");
  console.error("Please ensure you have set the INITIAL_OWNER_ADDRESS in your .env file.");
  process.exit(1); // Exit if the owner address is not set
}

console.log(`Deploying NeuroArt contract with initial owner: ${initialOwner}`);

module.exports = buildModule("NeuroArtModule", (m) => {
  // Get the initial owner address from the environment variable loaded above
  const owner = m.getParameter("initialOwner", initialOwner);

  // Deploy the NeuroArt contract, passing the owner address to the constructor
  const neuroArt = m.contract("NeuroArt", [owner]);

  console.log("NeuroArt contract deployment module created.");
  // You can add post-deployment actions here if needed, like logging the address
  // m.call(neuroArt, "someFunction", []); 

  return { neuroArt };
});