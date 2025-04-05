# NeuroArt Nexus - ETHGlobal Taipei Hackathon Execution Plan (Two-Stage Minting)

**Project Goal:** Develop a functional prototype of the "NeuroArt Nexus" platform within 3 days for the ETHGlobal Taipei Hackathon. The prototype will demonstrate a user journey involving Self Protocol identity verification, simulated neural data input, behavior data collection (black/white choice), preparation of NFT metadata, and subsequent NFT minting on Polygon, integrating Curvegrid MultiBaas and Self Protocol. The project aims to compete for Polygon, Curvegrid, and Self Protocol awards.

**Core Strategy:** Utilize a shared backend service to coordinate interactions between a Unity application (handling visualization and core user experience) and the Self Protocol for identity verification. Implement a two-stage minting process: first prepare metadata and tokenURI via one API call, then execute the actual minting via a second API call using Curvegrid MultiBaas for Polygon interaction.

**Target Awards:**
*   Polygon: Real World Anything
*   Curvegrid: Best Overall Use, Best Use of MultiBaas x AI
*   Self Protocol: Best Offchain SDK Integration (or relevant category)

**Architecture Diagram (Mermaid):**

```mermaid
graph LR
    subgraph User Experience (Unity MR - Partner)
        A[MR Environment] --> NeedsVerification{Needs Self Verification?};
        NeedsVerification -- Yes --> ShowQR[Show Self QR Code (WebView)];
        NeedsVerification -- No --> AIData[Get AI Data (Internal)];
        ShowQR -- User Scans & Approves --> BackendCallback;
        AIData --> BW[Choose Background];
        BW --> ConfirmData[Confirm Data & Trigger Prepare];
        ConfirmData -- Prepare Request (sessionId, artParams, bgChoice, userAddress) --> PrepareNFT;
        PrepareNFT -- Prepared Data {tokenURI, recipientAddress} --> TriggerMint[Trigger Final Mint];
        TriggerMint -- Execute Request (tokenURI, recipientAddress) --> ExecuteMint;
    end

    subgraph Backend & Blockchain (Polygon)
        Verify[Self Verify Endpoints (/self/*)];
        PrepareNFT[POST /api/prepare-nft-data];
        ExecuteMint[POST /api/execute-mint];
        MultiBaas[Curvegrid MultiBaas];
        Contract[NeuroArt ERC-721 on Polygon];
        IPFS[(Simulated IPFS/Storage)];
        AI[AI Simulator (Python)]; // Backend calls AI sim

        BackendCallback --> Verify;
        PrepareNFT -- Check Status --> Verify;
        PrepareNFT -- Call AI Sim --> AI;
        PrepareNFT -- Build Metadata --> PrepareNFT;
        PrepareNFT -- Upload Metadata --> IPFS;
        IPFS -- tokenURI --> PrepareNFT;
        ExecuteMint -- Call safeMint --> MultiBaas;
        MultiBaas -- Signs & Sends TX --> Contract;

    end

    style AI fill:#ccf,stroke:#333,stroke-width:2px;
    style MultiBaas fill:#f9d,stroke:#333,stroke-width:2px;
    style Contract fill:#9cf,stroke:#333,stroke-width:2px;
    style IPFS fill:#fcf,stroke:#333,stroke-width:2px;
```

**Detailed Execution Steps (3 Days):**

**Day 1: Foundations (Mostly Done)**
*   **(Morning) Environment Setup:** (Completed) Polygon Dev Env (Hardhat), Node.js Backend Env (Express), Self SDK (Installed), Unity Env (Partner). (Pending) Curvegrid Setup, Self Dev Account.
*   **(Afternoon) Core Contracts & Backend Base:** (Completed) ERC-721 Deployed (`0x29...32F`), Basic Express Server (`server.js`), MultiBaas Client (`multibaasClient.js`). (Pending) MultiBaas Contract Registration, Cloud Wallet Config & Owner Check.
*   **(Evening) Initial Integrations:** (Completed Framework) Self Protocol Endpoints Framework (`server.js`), Basic MultiBaas API Test Logic (in client). (Pending) MultiBaas Webhooks/Events Config.

**Day 2: Core Logic Refactoring & Integration**
*   **(Morning) AI Component & Self Integration:**
    *   (Completed) Develop/Simulate Python AI Component (`ai_simulator.py`).
    *   (TODO) **Implement Actual Self Protocol SDK Logic:** Replace placeholders in `/self/initiate-verification` and `/self/callback` in `server.js` using `@selfxyz/core`. Configure required `.env` variables (`SELF_APP_ID`, `SELF_APP_KEY`, `SCOPE`, correct RPC).
*   **(Afternoon) Refactor Backend API for Two-Stage Minting:**
    *   (TODO) **Create `POST /api/prepare-nft-data`:** Move Self verification check, AI simulator call, metadata building, and **mock** IPFS upload logic into this new endpoint in `routes/apiRoutes.js`. It should return `{ tokenURI, recipientAddress }`.
    *   (TODO) **Create `POST /api/execute-mint`:** Create this new endpoint in `routes/apiRoutes.js`. It should receive `{ tokenURI, recipientAddress }` and call `multibaasClient.mintNFT(recipientAddress, tokenURI)`.
    *   (TODO) **Update `server.js`:** Mount the two new API routes.
*   **(Evening) Unity Integration (Partner) & Initial Testing:**
    *   (Partner TODO) Unity: Implement Self Verification flow (call `/initiate`, show QR, poll `/status`).
    *   (Partner TODO) Unity: Implement flow to get AI data, choose background, call `/prepare-nft-data`.
    *   (Partner TODO) Unity: Implement button to call `/execute-mint` using data from previous step.
    *   (TODO) **Test `/prepare-nft-data`:** Verify it returns mock `tokenURI`.
    *   (TODO) **Test `/execute-mint`:** **Crucially, test if the MultiBaas call now succeeds** (assuming MultiBaas config/owner is correct).

**Day 3: Testing, Polish & Docs**
*   **(Morning) End-to-End Testing (Two-Stage):**
    *   Test the complete flow: Self Verify -> Prepare Data -> Execute Mint.
    *   Verify metadata content.
    *   Test MultiBaas event monitoring (if configured).
    *   Debug and fix issues found during MultiBaas call testing.
*   **(Afternoon) Award Compliance & Polish:**
    *   (TODO) **Implement Real IPFS Upload:** Replace `uploadMetadataMock` with actual IPFS upload logic (requires `IPFS_API_URL` in `.env`).
    *   Verify Polygon, Curvegrid, Self Protocol award compliance based on implemented features.
    *   Refine Unity UI/UX (Partner).
*   **(Evening) Documentation & Demo Prep:** (Same as before)

**Key Responsibilities:** (Remain the same, focus shifts for backend tasks)
*   **You:** Shared Backend (Node.js - Refactoring API, Self Integration, IPFS), AI Component (Python), Smart Contracts (Solidity - Done), MultiBaas/Self Config Guidance.
*   **Partner:** Unity Application (PC/Mobile/MR Frontend - Self Flow, AI Data Input, Prepare/Execute Calls, Viz).