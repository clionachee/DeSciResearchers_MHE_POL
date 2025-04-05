const hre = require("hardhat");

async function main() {
  // Get the signer
  const [signer] = await hre.ethers.getSigners();
  
  // Get the wallet address
  const address = await signer.getAddress();
  console.log(`Using wallet address: ${address}`);
  
  // Get the contract instance
  const neuroArt = await hre.ethers.getContractAt(
    "NeuroArt", 
    "0x2F81fFcD282CED88E29a2924885125282d22844d" // 新部署的合約地址
  );
  
  // Print current token count
  const tokenCount = await neuroArt.balanceOf(address);
  console.log(`Current token count: ${tokenCount}`);
  
  // Test mint an NFT to our own address
  console.log(`Minting new NFT to ${address}...`);
  const tx = await neuroArt.safeMint(
    address, // 接收者地址
    "ipfs://test-uri-from-unity" // 測試的 URI
  );
  
  // Wait for transaction to be mined
  console.log(`Transaction hash: ${tx.hash}`);
  await tx.wait();
  console.log(`Transaction confirmed!`);
  
  // Verify the new token count
  const newTokenCount = await neuroArt.balanceOf(address);
  console.log(`New token count: ${newTokenCount}`);
  
  // Success!
  console.log(`Successfully minted NFT without owner restriction!`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 