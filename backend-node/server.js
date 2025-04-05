const express = require('express');

const app = express();
const PORT = process.env.PORT || 5001;

// Import Routes
const apiRoutes = require('./routes/apiRoutes');

// Temporary in-memory store for verification status
// Attach it to app.locals for application-wide access
app.locals.verificationStatus = {};

// Middleware
app.use(express.json());

// Routes
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// --- Self Protocol Routes ---

// POST /self/initiate-verification
// Expects { sessionId: '...' } in the request body
app.post('/self/initiate-verification', async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId' });
  }

  try {
    console.log(`Initiating verification for session: ${sessionId}`);
    // TODO: Replace with actual Self SDK logic to generate verification request
    // const { SomeSelfFunction } = require('@selfxyz/core');
    // const verificationRequestData = await SomeSelfFunction.generateRequest({ sessionId, /* other params */ });
    const verificationRequestData = { qrData: `selphid://request/${sessionId}/some_payload`, deepLink: `selphid://request/${sessionId}/some_payload` }; // Placeholder

    app.locals.verificationStatus[sessionId] = 'pending'; // Update status
    console.log('Current verification statuses:', app.locals.verificationStatus);

    res.status(200).json(verificationRequestData);
  } catch (error) {
    console.error('Error initiating Self verification:', error);
    res.status(500).json({ error: 'Failed to initiate verification' });
  }
});

// POST /self/callback
// Self Protocol service will call this endpoint with the proof
// Expects proof data in the request body (structure depends on Self SDK)
app.post('/self/callback', async (req, res) => {
  const proofData = req.body;
  // TODO: Extract sessionId reliably from proofData or callback context
  const sessionId = proofData?.sessionId; // Placeholder, adjust based on actual data

  if (!sessionId || !proofData) {
      console.warn('Received invalid callback data:', proofData);
      return res.status(400).json({ error: 'Invalid callback data' });
  }

  try {
    console.log(`Received callback for session: ${sessionId}`);
    // TODO: Replace with actual Self SDK logic to verify the proof
    // const { SelfBackendVerifier } = require('@selfxyz/core');
    // const verifier = new SelfBackendVerifier(/* config */);
    // const isValid = await verifier.verify(proofData);
    const isValid = true; // Placeholder

    if (isValid) {
      app.locals.verificationStatus[sessionId] = 'verified';
      console.log(`Verification successful for session: ${sessionId}`);
    } else {
      app.locals.verificationStatus[sessionId] = 'failed';
      console.warn(`Verification failed for session: ${sessionId}`);
    }
    console.log('Current verification statuses:', app.locals.verificationStatus);

    res.status(200).send('Callback received'); // Acknowledge receipt
  } catch (error) {
    console.error('Error processing Self callback:', error);
    res.status(500).json({ error: 'Failed to process callback' });
  }
});

// GET /self/status/:sessionId
// Checks the verification status for a given session ID
app.get('/self/status/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const status = app.locals.verificationStatus[sessionId] || 'not_found';

  console.log(`Checking status for session: ${sessionId}, Status: ${status}`);
  res.status(200).json({ sessionId, status });
});

// --- Main API Routes ---
app.use('/api', apiRoutes); // Mount the API routes

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// No longer need to export verificationStatus from here
// module.exports = { verificationStatus }; 