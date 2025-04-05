const hre = require("hardhat");

async function main() {
  // Get the signer
  const [signer] = await hre.ethers.getSigners();
  
  // Get the wallet address
  const address = await signer.getAddress();
  
  // Get the balance
  const balance = await hre.ethers.provider.getBalance(address);
  
  // Print the results
  console.log(`Wallet address: ${address}`);
  console.log(`Balance: ${hre.ethers.formatEther(balance)} MATIC`);
  
  // Also check our target owner address
  const ownerBalance = await hre.ethers.provider.getBalance("0x3fEc463De4Abd7f7CFd7508a802a3D421a86b4A0");
  console.log(`Owner address: 0x3fEc463De4Abd7f7CFd7508a802a3D421a86b4A0`);
  console.log(`Owner balance: ${hre.ethers.formatEther(ownerBalance)} MATIC`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 