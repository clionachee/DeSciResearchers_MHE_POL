const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// Directly specify the initial owner address instead of reading from .env
const initialOwner = "0x3fEc463De4Abd7f7CFd7508a802a3D421a86b4A0";

console.log(`Deploying NeuroArt contract with initial owner: ${initialOwner}`);

module.exports = buildModule("NeuroArtModuleV2", (m) => {
  // Get the initial owner address from the environment variable loaded above
  const owner = m.getParameter("initialOwner", initialOwner);

  // Deploy the NeuroArt contract, passing the owner address to the constructor
  const neuroArt = m.contract("NeuroArt", [owner]);

  console.log("NeuroArt contract deployment module created.");
  // You can add post-deployment actions here if needed, like logging the address
  // m.call(neuroArt, "someFunction", []);

  return { neuroArt };
});