require('dotenv').config();
const axios = require('axios');

const baseURL = process.env.MULTIBAAS_BASE_URL;
const apiKey = process.env.MULTIBAAS_API_KEY;
const signerLabel = process.env.MULTIBAAS_SIGNER_LABEL; // Your Cloud Wallet label from MultiBaas
const contractLabel = 'NeuroArt'; // The label you gave the contract in MultiBaas

if (!baseURL || !apiKey || !signerLabel) {
  console.error('Error: MULTIBAAS_BASE_URL, MULTIBAAS_API_KEY, and MULTIBAAS_SIGNER_LABEL must be set in .env');
  // In a real app, you might want to throw an error or exit
  // process.exit(1);
}

const multibaasAPI = axios.create({
  baseURL: baseURL,
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
});

/**
 * Calls the safeMint function on the NeuroArt contract via MultiBaas.
 *
 * @param {string} recipientAddress The address to receive the NFT.
 * @param {string} tokenUri The URI pointing to the NFT's metadata.
 * @returns {Promise<object>} The response data from the MultiBaas API, typically including the transaction details.
 * @throws {Error} If the API call fails.
 */
async function mintNFT(recipientAddress, tokenUri) {
  const endpoint = `/contracts/${contractLabel}/methods/safeMint`;
  const requestBody = {
    signer: signerLabel, // Use the configured Cloud Wallet label
    args: [
      recipientAddress,
      tokenUri
    ]
  };

  console.log(`[MultiBaas Client] Calling safeMint for ${recipientAddress} with URI: ${tokenUri} using signer: ${signerLabel}`);

  try {
    const response = await multibaasAPI.post(endpoint, requestBody);
    console.log('[MultiBaas Client] Minting call successful:', response.data);
    // The response.data usually contains information like:
    // { "kind": "transaction", "tx": { ... transaction details ... } }
    return response.data;
  } catch (error) {
    console.error('[MultiBaas Client] Error calling safeMint:', error.response ? error.response.data : error.message);
    // Rethrow the error or handle it as needed
    throw new Error(`Failed to call safeMint via MultiBaas: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
  }
}

module.exports = {
  mintNFT
}; 