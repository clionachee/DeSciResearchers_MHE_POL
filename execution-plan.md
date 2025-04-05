# NeuroArt Nexus - ETHGlobal Taipei Hackathon Execution Plan (Polygon + Self Protocol)

**Project Goal:** Develop a functional prototype of the "NeuroArt Nexus" platform within 3 days for the ETHGlobal Taipei Hackathon. The prototype will demonstrate a user journey involving Self Protocol identity verification, simulated neural data input, behavior data collection (black/white choice), NFT minting on Polygon, and integration with Curvegrid MultiBaas and ENS. The project aims to compete for Polygon, Curvegrid, ENS, and potentially Self Protocol awards.

**Core Strategy:** Utilize a shared backend service to coordinate interactions between a Unity application (handling visualization and core user experience) and the Self Protocol for identity verification. All blockchain operations will occur on the Polygon network via Curvegrid MultiBaas.

**Target Awards:**
*   Polygon: Real World Anything
*   Curvegrid: Best Overall Use, Best Use of MultiBaas x AI
*   ENS: Best use of ENS
*   Self Protocol: (Requires specific prize details)

**Architecture Diagram (Mermaid):**

```mermaid
graph LR
    subgraph User Experience (Unity MR - Partner)
        A[MR Environment] --> NeedsVerification{Needs Self Verification?};
        NeedsVerification -- Yes --> ShowQR[Show Self QR Code (WebView)];
        NeedsVerification -- No --> Test[Initiate EEG/EMG Test (Simulated)];
        ShowQR -- User Scans & Approves --> BackendCallback;
        Test --> B(Neural Art Visualization);
        A --> BW[Black/White Choice Screen];
        BW -- Choice (Black/White) --> A;
        B --> C{User Confirms Result};
    end

    subgraph Data Acquisition & Processing
        F[EEG/EMG Sensor (Simulated)] --> G(Raw Neural Data);
        G --> H[Python AI Component];
        H --> I(Processed Art Parameters JSON);
    end

    subgraph Backend & Blockchain (Polygon)
        SB[Backend Service (Python)]
        K[MultiBaas]
        L[Polygon Network]
        M[ERC-721 NeuroArt Contract]
        N[ENS]
        SP[Self Protocol]

        ShowQR -- Generates QR via --> SB; // Backend uses SelfAppBuilder (or frontend helper)
        SP -- Verification Proof --> BackendCallback{Backend Callback/Endpoint};
        BackendCallback -- Verify Proof --> SB; // Backend uses SelfBackendVerifier
        SB -- Update User Status --> DB[(User DB/State)];
        C -- Trigger Mint (User Address, Art Params, BW Choice) --> SB; // User confirms in Unity
        SB -- Check Verification Status --> DB;
        SB -- Build Metadata & Call Mint API --> K; // Backend calls MultiBaas
        K -- REST API Call (Mint) --> K; // MultiBaas uses REST API
        K -- TXM/Cloud Wallet Signs & Submits --> L; // MultiBaas handles TX
        L -- Mint NFT --> M; // NFT minted on Polygon
        K -- Monitor Events (Webhook/Index) --> M; // MultiBaas monitors events
        K -- Uses Wallet --> P((ENS: neuroart-minter.eth)); // MultiBaas wallet has ENS name
        P -- Resolves To --> K;

    end

    H -- Provides Local API? --> B; // AI data to Unity

    style F fill:#f9f,stroke:#333,stroke-width:2px;
    style H fill:#ccf,stroke:#333,stroke-width:2px;
    style SB fill:#d9f,stroke:#333,stroke-width:2px;
    style K fill:#f9d,stroke:#333,stroke-width:2px;
    style M fill:#9cf,stroke:#333,stroke-width:2px;
    style N fill:#9ff,stroke:#333,stroke-width:2px;
    style SP fill:#fbc,stroke:#333,stroke-width:2px;
```

**Detailed Execution Steps (3 Days):**

**Day 1: Foundations**
*   **(Morning) Environment Setup:**
    *   Set up Polygon dev environment (Hardhat - already initialized).
    *   Set up Python backend environment (Flask/FastAPI).
    *   Set up Curvegrid MultiBaas account, configure Polygon connection.
    *   Set up Self Protocol dev account/SDK.
    *   Register ENS name (`neuroart-minter.eth`).
    *   Set up Unity dev environment (Partner).
*   **(Afternoon) Core Contracts & Backend Base:**
    *   Develop ERC-721 NeuroArt contract (Solidity - initial version exists).
    *   Deploy contract to Polygon Testnet (Amoy).
    *   Register contract in MultiBaas.
    *   Build basic shared backend service (Python).
    *   Configure MultiBaas Cloud Wallet/TXM for Polygon.
    *   Set ENS resolution for `neuroart-minter.eth` to MultiBaas wallet.
*   **(Evening) Self Protocol & MultiBaas Integration:**
    *   Implement backend logic/endpoint to generate Self Protocol QR Code data (using SelfAppBuilder concepts).
    *   Implement backend endpoint to receive and verify Self Protocol proofs (using `SelfBackendVerifier`).
    *   Test basic MultiBaas REST API `mint` call from backend for Polygon.
    *   Configure basic MultiBaas Webhooks/Event Indexing for Polygon.

**Day 2: Core Logic & Integration**
*   **(Morning) AI Component & Unity Verification:**
    *   Develop/simulate Python AI component (EEG/EMG -> JSON).
    *   Define API/method for Unity to get AI params.
    *   (Partner) Unity: Implement check for verification status (call backend). If needed, show WebView with QR Code page. Handle callback/success signal from backend after verification.
*   **(Afternoon) Backend Core Logic:**
    *   Refine backend Self Protocol verification logic, update user status (e.g., in a simple DB or state).
    *   Implement backend endpoint for Unity to trigger mint (check verification status first).
    *   Implement metadata building (incl. BW choice).
    *   Implement full MultiBaas `mint` API call logic.
*   **(Evening) Unity Core & Initial Testing:**
    *   (Partner) Unity: Implement BW choice, (simulated) test flow, visualization, confirm mint button, call backend trigger.
    *   Initial Test: Self Verification -> (Simulated) Test -> Unity Confirm -> Backend -> MultiBaas -> Polygon Mint.

**Day 3: Testing, Polish & Docs**
*   **(Morning) End-to-End Testing & Data Flow:**
    *   Test full user flow rigorously.
    *   Ensure BW choice is correctly included in metadata.
    *   Test MultiBaas event monitoring.
    *   Debug and fix issues.
*   **(Afternoon) Award Compliance & Polish:**
    *   **Polygon Check:** Verify deployment and functionality on Polygon.
    *   **Curvegrid Check:** Verify REST API, TXM/Wallet, Events usage.
    *   **ENS Check:** Verify ENS name usage.
    *   **Self Protocol Check:** Verify verification flow works.
    *   Refine Unity UI/UX (Partner).
*   **(Evening) Documentation & Demo Prep:**
    *   Create GitHub Repo, write comprehensive README (incl. architecture, setup, protocol usage).
    *   Prepare Demo video/slides.
    *   Invite Curvegrid reviewer to MultiBaas deployment.

**Key Responsibilities:**
*   **You:** Shared Backend (Python), AI Component (Python), Smart Contracts (Solidity), MultiBaas/ENS/Self Protocol Integration.
*   **Partner:** Unity Application (PC/Mobile/MR Frontend, incl. WebView for Self QR).