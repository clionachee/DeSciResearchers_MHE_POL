# Current Tasks: NeuroArt Nexus MVP (Polygon + Self Protocol)

## Phase 1: Foundations (Day 1)
- [ ] Setup: Polygon Dev Env (Hardhat)
- [x] Setup: Node.js Backend Env (Express)
- [ ] Setup: Curvegrid MultiBaas Account & Polygon Connection
- [ ] Setup: Self Protocol Dev Account/SDK
- [ ] Setup: Unity Dev Env (Partner)
- [x] Develop: ERC-721 NeuroArt Contract (Solidity) - Initial Version
- [x] Deploy: ERC-721 Contract to Polygon Testnet (Amoy) at 0x29af5e1d1B62308d7759F0B854B0F552fBB3b32F
- [ ] Configure: Register Contract 0x29...32F in MultiBaas (Task 2a - Manual/Pending - BLOCKER?)
- [x] Develop: Basic Shared Backend Service (Node.js/Express) - Initial Setup (Task 1)
- [ ] Configure: MultiBaas Cloud Wallet/TXM for Polygon (Target Owner: 0xe4...) & Verify Owner (Task 2b - Manual/Pending - BLOCKER?)
- [ ] Verify: MultiBaas API Key / Permissions (Task 2c - Manual/Pending - BLOCKER?)
- [ ] Diagnose & Fix: MultiBaas API Call Failure (Task - DEBUG) - **PAUSED**
- [ ] Implement: Backend Self Protocol Endpoints (Task 4a - Verification Logic Done, Request Logic TODO)
- [ ] Confirm: Self Protocol Request Generation SDK/API Usage (Task 4b)
- [x] Implement: Backend MultiBaas Client (Task 5)
- [x] Implement: Backend Prepare NFT Data Endpoint (`/api/prepare-nft-data`) (Task 6a - Refactored)
- [x] Implement: Backend Execute Mint Endpoint (`/api/execute-mint`) (Task 6b - Refactored)
- [ ] Configure: MultiBaas Webhooks/Event Indexing (Polygon)

## Phase 2: Core Logic & Integration (Day 2)
- [ ] Develop/Simulate: Python AI Component (EEG/EMG -> JSON)
- [x] Develop/Simulate: Python AI Component (Task 7 - Reads from stdin)
- [x] Define: API/Method for Unity to get AI params & Backend Integration - Documented
- [ ] Implement: (Partner) Unity Self Verification Flow (Check Status, Show WebView QR)
- [x] Implement: Backend Self Protocol Verification Logic (Task 4a - Based on SDK)
- [x] Implement: Backend Metadata Building Logic (Moved to Task 6a)
- [ ] Implement: Backend Real IPFS Upload (Task 6c - TODO)
- [x] Implement: Backend AI Simulator Invocation (Task 7)
- [ ] Implement: (Partner) Unity Core Flow (Self Verify, BW Choice, Test Sim, Viz, Confirm Mint)

## Phase 3: Testing, Polish & Docs (Day 3)
- [ ] Test: Full End-to-End Flow (Self Verify -> Prepare -> Execute Mint)
- [ ] Test: Metadata Content (BW Choice)
- [ ] Test: MultiBaas Event Monitoring
- [ ] Debug & Fix Issues
- [ ] Verify: Polygon Award Compliance
- [ ] Verify: Curvegrid Award Compliance (3+ features used) - Requires successful MultiBaas call
- [ ] Verify: Self Protocol Award Compliance (Based on requirements) - BLOCKED by incomplete integration
- [ ] Refine: Unity UI/UX (Partner)
- [ ] Create: GitHub Repo & README
- [ ] Prepare: Demo Video/Slides
- [ ] Invite: Curvegrid Reviewer to MultiBaas Deployment