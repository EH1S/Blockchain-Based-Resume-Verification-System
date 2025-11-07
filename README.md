# 🧾 Blockchain-Based Resume Verification System  

A **decentralized application (DApp)** built using **React, Solidity, Pinata (IPFS)**, and **Ethereum blockchain** that enables users to securely upload, store, and verify resumes on-chain — eliminating document tampering and the need for third-party verification.  

---

## 🚀 Features  

### 👩‍🎓 For Users  
- Upload one or multiple resumes (PDF/DOC/DOCX).  
- Files are securely stored on **IPFS** using **Pinata**.  
- Resume metadata (CID, name, timestamp) is recorded immutably on the **Ethereum blockchain**.  

### 👨‍💼 For Admin (Verifier)  
- View all uploaded resumes of any user.  
- Verify the authenticity of uploaded resumes directly on-chain.  
- Verified resumes are displayed with a ✅ badge.  

### 💡 Tech Highlights  
- Frontend: **React + Tailwind CSS**  
- Blockchain: **Solidity (Smart Contract on Ethereum Sepolia Testnet)**  
- Storage: **Pinata (IPFS)**  
- Interaction: **Ethers.js + MetaMask**  
- Backend: **Node.js + Express**  

---

## 🔗 Smart Contract Overview  

**Contract:** `ResumeVerifier.sol`  

```solidity
uploadResume(name, ipfsCid) → User uploads a resume.  

verifyResume(candidate, index) → Admin verifies a resume.  

getAllResumes(address) → Returns all resumes for a given user.  

getResume(address, index) → Fetches a single resume.  

transferAdmin(address) → Transfer admin ownership.  


## 🧱 Project Architecture  

```plaintext
root
│
├── frontend/               # React app (user interface)
│   ├── src/
│   │   ├── components/     # UI components (Upload, Verify, Dashboard, etc.)
│   │   ├── contracts/      # ABI of deployed smart contract
│   │   └── eth.js          # Blockchain connection logic
│
├── backend/                # Express backend for Pinata uploads
│   ├── server.js           # Upload to IPFS via Pinata
│   └── .env                # Pinata JWT & backend configs
│
├── contracts/              # Solidity smart contract
│   └── ResumeVerifier.sol
│
└── artifacts/              # Generated ABI after contract compilation
