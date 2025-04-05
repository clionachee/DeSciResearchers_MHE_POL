require('dotenv').config();
const axios = require('axios');

const baseURL = process.env.MULTIBAAS_BASE_URL;
const apiKey = process.env.MULTIBAAS_API_KEY;
const signerLabel = process.env.MULTIBAAS_SIGNER_LABEL; // Your Cloud Wallet label from MultiBaas
const contractLabel = 'ethglobal-taipei-6'; // CORRECTED: Use the actual label from MultiBaas UI
const chainIdentifier = 'amoy'; // Use 'amoy' for Polygon Amoy testnet

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
  // Use the chainIdentifier constant
  const endpoint = `/chains/${chainIdentifier}/contracts/${contractLabel}/methods/safeMint`;
  const requestBody = {
    signer: signerLabel, // Use the configured Cloud Wallet label
    args: [
      recipientAddress,
      tokenUri
    ]
  };

  console.log(`[MultiBaas Client] Calling safeMint on chain '${chainIdentifier}' for ${recipientAddress} with URI: ${tokenUri} using signer: ${signerLabel}`);

  try {
    console.log('[MultiBaas Client] Attempting API call...');
    const response = await multibaasAPI.post(endpoint, requestBody);
    console.log('[MultiBaas Client] API call successful. Response status:', response.status);
    console.log('[MultiBaas Client] Response data:', JSON.stringify(response.data, null, 2));
    // Return the full response object which includes status and data
    return response; // Return the whole response including status
  } catch (error) {
    console.error('-----------------------------------------------------');
    console.error('[MultiBaas Client] !!!!!!!!!! ERROR calling safeMint !!!!!!!!!!');
    if (error.response) {
      console.error('[MultiBaas Client] Error Status:', error.response.status);
      console.error('[MultiBaas Client] Error Headers:', JSON.stringify(error.response.headers, null, 2));
      console.error('[MultiBaas Client] Error Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('[MultiBaas Client] Error Request:', error.request);
      console.error('[MultiBaas Client] No response received from MultiBaas.');
    } else {
      console.error('[MultiBaas Client] Error Message:', error.message);
    }
    console.error('[MultiBaas Client] Error Config:', JSON.stringify(error.config, null, 2));
    console.error('-----------------------------------------------------');
    // Rethrow the error object itself, preserving status code if available
    throw error; // Rethrow the original error
  }
}

/**
 * Tests the connection and authentication to the MultiBaas API
 * by fetching basic blockchain information.
 * @returns {Promise<boolean>} True if connection is successful, false otherwise.
 */
async function testMultiBaasConnection() {
    // Use the chainIdentifier constant
    const endpoint = `/chains/${chainIdentifier}`; // Basic read endpoint for the specified chain
    console.log(`[MultiBaas Client] Testing connection to chain '${chainIdentifier}': ${baseURL}${endpoint}`);
    try {
        const response = await multibaasAPI.get(endpoint);
        console.log('[MultiBaas Client] Connection test successful. Status:', response.status);
        return true;
    } catch (error) {
        console.error('-----------------------------------------------------');
        console.error('[MultiBaas Client] !!!!!!!!!! CONNECTION TEST FAILED !!!!!!!!!!');
         if (error.response) {
            console.error('[MultiBaas Client] Error Status:', error.response.status);
            console.error('[MultiBaas Client] Error Data:', JSON.stringify(error.response.data, null, 2));
         } else if (error.request) {
            console.error('[MultiBaas Client] No response received.');
         } else {
            console.error('[MultiBaas Client] Error Message:', error.message);
         }
        console.error('-----------------------------------------------------');
        return false;
    }
}

module.exports = {
  mintNFT,
  testMultiBaasConnection // Export the test function
}; 