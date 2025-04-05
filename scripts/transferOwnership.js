const hre = require("hardhat");
require('dotenv').config(); // Load .env file variables

async function main() {
  const contractAddress = "0x29af5e1d1B62308d7759F0B854B0F552fBB3b32F"; // The deployed NeuroArt contract address
  const newOwner = "0x3fEc463De4Abd7f7CFd7508a802a3D421a86b4A0"; // The MultiBaas Cloud Wallet address

  if (!newOwner || !hre.ethers.isAddress(newOwner)) {
    console.error("Error: New owner address is invalid or not provided:", newOwner);
    process.exit(1);
  }

  console.log(`Attempting to transfer ownership of NeuroArt contract (${contractAddress})`);
  console.log(`Current owner should be derived from DEPLOYER_PRIVATE_KEY in .env`);
  console.log(`New owner will be: ${newOwner}`);

  // Get the contract factory
  const NeuroArt = await hre.ethers.getContractFactory("NeuroArt");
  // Attach to the deployed contract instance
  const neuroArt = NeuroArt.attach(contractAddress);

  // Get the signer based on the DEPLOYER_PRIVATE_KEY in .env (current owner)
  // Hardhat automatically uses the first account derived from the private key in the network config
  const [currentOwnerSigner] = await hre.ethers.getSigners(); 
  console.log(`Using signer (current owner): ${await currentOwnerSigner.getAddress()}`);

  // Check current owner before transferring (optional but good practice)
  const currentOwner = await neuroArt.owner();
  console.log(`Current owner reported by contract: ${currentOwner}`);
  if (currentOwner.toLowerCase() !== (await currentOwnerSigner.getAddress()).toLowerCase()) {
      console.error("ERROR: The private key in .env does not correspond to the current contract owner!");
      console.error(`Contract owner is ${currentOwner}, but signer is ${await currentOwnerSigner.getAddress()}`);
      process.exit(1);
  }


  // Call the transferOwnership function
  console.log(`Calling transferOwnership(${newOwner})...`);
  const tx = await neuroArt.connect(currentOwnerSigner).transferOwnership(newOwner);

  console.log("Transaction sent. Waiting for confirmation...");
  console.log("Transaction Hash:", tx.hash);

  // Wait for the transaction to be mined
  await tx.wait();

  console.log("Ownership transfer transaction confirmed.");

  // Verify the new owner (optional but good practice)
  const finalOwner = await neuroArt.owner();
  console.log(`New owner reported by contract: ${finalOwner}`);

  if (finalOwner.toLowerCase() === newOwner.toLowerCase()) {
    console.log("Ownership successfully transferred!");
  } else {
    console.error("ERROR: Ownership transfer might have failed. New owner does not match.");
  }
}

main().catch((error) => {
  console.error("Error during ownership transfer:", error);
  process.exitCode = 1;
});