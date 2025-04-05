const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs/promises'); // For async file operations
require('dotenv').config();
console.log(process.env);
const multibaasClient = require('../multibaasClient');

// const { verificationStatus } = require('../server'); // No longer require server directly

const router = express.Router();
const tmpDir = path.join(__dirname, '../tmp'); // Define tmp directory path relative to this file's location

// Ensure tmp directory exists
const ensureTmpDir = async () => {
  try {
    await fs.mkdir(tmpDir, { recursive: true });
    console.log(`[API Routes] Ensured tmp directory exists at: ${tmpDir}`);
  } catch (error) {
    console.error('[API Routes] Error creating tmp directory:', error);
    // Handle error appropriately, maybe prevent startup?
  }
};
ensureTmpDir(); // Call on module load

// POST /api/mint-neuroart
router.post('/mint-neuroart', async (req, res) => {
  const { userAddress, artParams, backgroundChoice, sessionId } = req.body;
  const verificationStatus = req.app.locals.verificationStatus; // Access from app.locals

  // Basic validation
  if (!userAddress || !artParams || !backgroundChoice || !sessionId) {
    return res.status(400).json({ error: 'Missing required fields: userAddress, artParams, backgroundChoice, sessionId' });
  }

  // 1. Check verification status
  const status = verificationStatus[sessionId];
  console.log(`[API Mint] Checking verification for session ${sessionId}: Status = ${status}`);
  if (status !== 'verified') {
    return res.status(403).json({ error: 'User identity not verified for this session.', status: status || 'not_found' });
  }

  let aiParameters;
  try {
    // 2. Call AI Simulator (Task 7)
    console.log('[API Mint] Calling AI simulator with params:', artParams);
    const aiResultJson = await callAiSimulator(artParams); // Call the helper
    aiParameters = JSON.parse(aiResultJson);
    console.log('[API Mint] AI Simulator Result:', aiParameters);
  } catch (error) {
    console.error('[API Mint] Error calling AI simulator:', error);
    return res.status(500).json({ error: 'Failed to process art parameters with AI simulator.', details: error.message });
  }

  let tokenURI;
  try {
    // 3. Prepare Metadata & Upload Mock
    console.log('[API Mint] Preparing metadata JSON...');
    const metadata = {
      name: `NeuroArt #${Date.now()}`,
      description: "AI-generated art on the NeuroArt Nexus platform.",
      image: "ipfs://IMAGE_CID_PLACEHOLDER", // Still a placeholder, needs actual image generation/upload
      attributes: [
        { trait_type: "Background", value: backgroundChoice },
        // Add traits from aiParameters (handle potential structure differences)
        ...(aiParameters?.generated_parameters ? Object.entries(aiParameters.generated_parameters).map(([key, value]) => ({
          trait_type: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Format key as Title Case
          value: Array.isArray(value) ? value.join(', ') : value // Join array values
        })) : []),
        { trait_type: "Verified User Session", value: sessionId },
        { trait_type: "AI Simulation Mode", value: aiParameters?.simulation_mode || false }
      ]
    };
    console.log('[API Mint] Metadata prepared:', metadata);

    tokenURI = await uploadMetadataMock(metadata); // Use the mock upload function
    console.log(`[API Mint] Mock metadata uploaded. Token URI: ${tokenURI}`);

  } catch (error) {
    console.error('[API Mint] Error preparing or mocking metadata upload:', error);
    return res.status(500).json({ error: 'Failed to prepare NFT metadata.', details: error.message });
  }

  // 4. Call MultiBaas to mint
  try {
    // console.log(`[API Mint] Calling MultiBaas mintNFT for ${userAddress} with URI: ${tokenURI}`);
    // const mintResult = await multibaasClient.mintNFT(userAddress, tokenURI);
    // console.log('[API Mint] Minting initiated successfully via MultiBaas:', mintResult);

    res.status(202).json({
      message: 'NFT minting process initiated successfully.',
      tokenURI: tokenURI, // Include the generated token URI
      transactionDetails: mintResult
    });

  } catch (error) {
    console.error('[API Mint] Error during the minting process:', error);
    res.status(500).json({ error: 'Failed to initiate NFT minting.', details: error.message });
  }
});

// --- Helper function for calling Python AI script ---
async function callAiSimulator(params) {
  // Pass params as a JSON string argument to the Python script
  const scriptPath = path.join(__dirname, '../../ai_simulator.py');
  const paramsString = JSON.stringify(params);

  console.log(`[AI Sim Caller] Running: python "${scriptPath}" '${paramsString}'`);

  return new Promise((resolve, reject) => {
    // Use shell=true on Windows if python isn't directly in PATH or for complex args,
    // but be mindful of security implications. For simple cases, direct execution is better.
    const pythonProcess = spawn('python', [scriptPath, paramsString], { shell: process.platform === 'win32' });
    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
      console.log(`[AI Sim stdout]: ${data.toString()}`); // Log stdout
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
      console.error(`[AI Sim stderr]: ${data.toString()}`); // Log stderr
    });

    pythonProcess.on('close', (code) => {
      console.log(`[AI Sim Caller] Python script exited with code ${code}`);
      if (code !== 0) {
        reject(new Error(`AI simulator script exited with code ${code}. Error: ${errorOutput}`));
      } else {
        // Try to find the JSON output within the potentially verbose stdout
        const jsonMatch = output.match(/\{.*\}/s); // Simple match for JSON object
        if (jsonMatch) {
             try {
                // Validate if it's actually JSON before resolving
                JSON.parse(jsonMatch[0]);
                resolve(jsonMatch[0]);
            } catch (parseError) {
                 console.error("[AI Sim Caller] Output wasn't valid JSON despite matching brackets.", parseError);
                 reject(new Error(`AI simulator script output could not be parsed as JSON. Output: ${output}`));
            }
        } else {
            console.error("[AI Sim Caller] No JSON object found in script output.");
            reject(new Error(`AI simulator script did not produce valid JSON output. Output: ${output}`));
        }
      }
    });

    pythonProcess.on('error', (err) => {
      console.error('[AI Sim Caller] Failed to start Python process:', err);
      reject(new Error(`Failed to start AI simulator script: ${err.message}`));
    });
  });
}

// --- Helper function for mocking metadata upload ---
async function uploadMetadataMock(metadata) {
  const timestamp = Date.now();
  const filename = `metadata-${timestamp}.json`;
  const filePath = path.join(tmpDir, filename);

  try {
    await fs.writeFile(filePath, JSON.stringify(metadata, null, 2));
    console.log(`[Metadata Mock] Metadata successfully written to ${filePath}`);
    // Return a file URI (adjust if needed for actual testing)
    return `file://${path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/')}`; // Relative path from backend-node

  } catch (error) {
    console.error(`[Metadata Mock] Error writing metadata file to ${filePath}:`, error);
    throw new Error(`Failed to mock metadata upload: ${error.message}`);
  }
}

module.exports = router; 