# Project Vision: NeuroArt Nexus (ETHGlobal Taipei Hackathon - Polygon + Self Protocol)

**Core Concept:** A platform enabling users to transform their (simulated) neural data (EEG/EMG) into personalized 3D NeuroArt NFTs on Polygon, fostering self-reflection and exploring the intersection of neuroscience, art, and Web3. The project emphasizes user behavior data collection (e.g., black/white choice) and utilizes Self Protocol for secure identity verification.

**AI Role:**
*   **MVP Focus (Simulation):** In the initial MVP, the AI component primarily serves to *simulate* the generation of diverse art parameters based on basic inputs (like prompt length or keywords), enabling the end-to-end minting flow.
*   **Long-Term Vision (Analysis & Personalization):** The long-term goal is for the AI to analyze user behavioral data (e.g., black/white choices, interaction patterns) combined with potential neural data insights (simulated in MVP) to understand psychological patterns. These analyses will be used *after* the NFT is minted to deliver personalized feedback, insights, or tailored experiences related to the user's NeuroArt NFT.

**Target Experience:**
*   **Unity Application (Primary Frontend - PC/Mobile/MR):** Handles Self Protocol verification (via WebView/QR), simulated EEG/EMG input, black/white choice, complex NeuroArt visualization, and triggers backend processes.
*   **Backend Service (Coordination Hub):** Verifies Self Protocol proofs, manages user state, processes data (using the *simulated* AI component for MVP), builds NFT metadata, interacts with Polygon via MultiBaas, and (in the future) orchestrates the delivery of personalized post-mint information based on deeper AI analysis.

**Key Technologies:**
*   **Identity:** Self Protocol
*   **Frontend:** Unity Engine (C#)
*   **Backend:** Shared Node.js Service (Express)
*   **AI:** Independent Python component (MVP: parameter simulation; Future: behavioral/psychological analysis)
*   **Blockchain:** Polygon (for NFTs)
*   **NFTs:** ERC-721 (NeuroArt)
*   **Middleware:** Curvegrid MultiBaas (REST API, TXM/Cloud Wallet, Event Indexing/Webhooks for Polygon)
*   **Naming:** (ENS Removed)

**Target Hackathon Awards:**
*   Polygon: Real World Anything
*   Curvegrid: Best Overall Use, Best Use of MultiBaas x AI
*   Self Protocol: Best Offchain SDK Integration

**Core User Flow (MVP - Two-Stage Minting):**
1.  **Verification:** User initiates action in Unity -> Unity calls backend `/self/initiate-verification` -> Unity displays QR -> User scans/approves in Self App -> Self sends proof to backend `/self/callback` -> Backend verifies proof -> Unity polls `/self/status/:sessionId` to confirm 'verified'.
2.  **Data Gathering:** User proceeds with (simulated) EEG/EMG test and makes black/white choice in Unity. Python AI *simulates* processing.
3.  **Prepare NFT Data:** User confirms in Unity -> Unity calls backend `POST /api/prepare-nft-data` (with sessionId, AI params, choice, userAddress) -> Backend re-checks verification, builds metadata, (simulates) uploads to IPFS -> Backend returns `{ tokenURI, recipientAddress }` to Unity.
4.  **Execute Mint:** User triggers final mint in Unity -> Unity calls backend `POST /api/execute-mint` (with tokenURI, recipientAddress) -> Backend calls MultiBaas `safeMint` API -> MultiBaas handles transaction on Polygon.
5.  **Display:** Unity shows minted NFT info (potentially using MultiBaas event monitoring later).
6.  **(Future):** Deeper AI analysis and personalized insights.