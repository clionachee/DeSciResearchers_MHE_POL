# Project Vision: NeuroArt Nexus (ETHGlobal Taipei Hackathon - Polygon + Self Protocol)

**Core Concept:** A platform enabling users to transform their (simulated) neural data (EEG/EMG) into personalized 3D NeuroArt NFTs on Polygon, fostering self-reflection and exploring the intersection of neuroscience, art, and Web3. The project emphasizes user behavior data collection (e.g., black/white choice) and utilizes Self Protocol for secure identity verification.

**Target Experience:**
*   **Unity Application (Primary Frontend - PC/Mobile/MR):** Handles Self Protocol verification (via WebView/QR), simulated EEG/EMG input, black/white choice, complex NeuroArt visualization, and triggers backend processes.
*   **Backend Service (Coordination Hub):** Verifies Self Protocol proofs, manages user state, processes data (potentially with AI component), builds NFT metadata, and interacts with Polygon via MultiBaas.

**Key Technologies:**
*   **Identity:** Self Protocol
*   **Frontend:** Unity Engine (C#)
*   **Backend:** Shared Python Service (Flask/FastAPI)
*   **AI:** Independent Python component (processing simulated EEG/EMG)
*   **Blockchain:** Polygon (for NFTs)
*   **NFTs:** ERC-721 (NeuroArt)
*   **Middleware:** Curvegrid MultiBaas (REST API, TXM/Cloud Wallet, Event Indexing/Webhooks for Polygon)
*   **Naming:** ENS (`neuroart-minter.eth` for backend wallet)

**Target Hackathon Awards:**
*   Polygon: Real World Anything
*   Curvegrid: Best Overall Use, Best Use of MultiBaas x AI
*   ENS: Best use of ENS
*   Self Protocol: (Specific requirements TBD)

**Core User Flow (MVP):**
1.  User initiates action in Unity requiring verification.
2.  Unity displays WebView with QR Code generated via backend (using SelfAppBuilder concepts).
3.  User scans QR with Self App and approves verification.
4.  Self Protocol sends proof to backend endpoint.
5.  Backend verifies proof using `SelfBackendVerifier`.
6.  Backend updates user's verified status.
7.  User proceeds with (simulated) EEG/EMG test in Unity.
8.  User makes black/white choice in Unity.
9.  Python AI processes data.
10. User confirms results in Unity.
11. Unity triggers backend mint request (passing user address, AI params, BW choice).
12. Backend checks verification status.
13. Backend builds metadata.
14. Backend calls MultiBaas API to mint ERC-721 NFT on Polygon.
15. MultiBaas handles transaction via TXM/Cloud Wallet (using ENS name).
16. MultiBaas events notify backend (optional confirmation).
17. Unity (or a separate display area) shows minted NFT info.