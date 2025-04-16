

---


# 🎟 NFTicket — Own Your Entry

> A decentralized NFT-based ticketing system that ensures fair, fraud-free, and onchain event access.

---

## 📌 Problem Statement

**Problem Statement 4 – Craft the future of onchain consumer Experience with base**

---

## 🎯 Objective

Event ticketing is often plagued by fraud, scalping, and lack of transparency. NFTicket solves this by issuing **non-transferable NFT tickets** on the blockchain, ensuring authenticity and ownership without middlemen. It serves **event organizers and attendees** who want secure, verifiable access to events using a transparent and decentralized system.

---

## 🧠 Team & Approach

### Team Name:  
**Tickemist**

### Team Members:  

- Aditya ([GitHub](https://github.com/Aditya-alchemist) / Full Stack )

### Our Approach:  
- Chose this problem for its massive real-world impact and scalability in entertainment, sports, and conferences  
- Focused on making NFTs **non-transferable** to prevent scalping  
- Brainstormed on onchain metadata storage and chose **IPFS + Pinata** for verifiable ticket content  
- Pivoted to **Base Sepolia + OnchainKit** for faster development and gasless UX

---

## 🛠 Tech Stack

### Core Technologies Used:
- Frontend: React.js + OnchainKit  
- Backend: Solidity (Ethereum Smart Contracts)  
- Database: IPFS (via Pinata)  
- APIs: Pinata SDK, Wagmi, Viem  
- Hosting: Vercel

### Sponsor Technologies Used:
- ✅ *Base:* Used Base Sepolia for deployment, OnchainKit for wallet UX  
- [ ] *Groq:*  
- [ ] *Monad:*  
- [ ] *Fluvio:*  
- [ ] *Screenpipe:*  
- [ ] *Stellar:*  

---

## ✨ Key Features

- ✅ Mint non-transferable NFT tickets with metadata stored on IPFS  
- ✅ Wallet-based event entry — tickets tied to the wallet that minted them  
- ✅ OnchainKit integration for seamless wallet connection  
- ✅ Smart contract deployed on **Base Sepolia**, ensuring low fees and scalability  

---

## 📽 Demo & Deliverables

- *Demo Video Link:* [https://youtu.be](https://youtu.be/LaU0-yZE__0?si=XUMQSbhZSYt3d4Za)  


---

## ✅ Tasks & Bonus Checklist

- ✅ All members of the team completed the mandatory task  
- ✅ All members completed Bonus Task 1 (Badge sharing)  
- ✅ All members completed Bonus Task 2 (Sprint.dev signup)

---

## 🧪 How to Run the Project

### Requirements:
- Node.js v18+  
- Metamask wallet (connected to Base Sepolia)  
- Pinata API Key (for IPFS uploads)
- Base Sepolia chain should be already initialized in your wallet or else it will throw error or will not mint ticket.
 
- configuration in wallet (metamask):-

![Screenshot 2025-04-16 153840](https://github.com/user-attachments/assets/538fe5fe-e478-4969-aca1-60e57804e0f7)


### Local Setup:

```bash
# Clone the repo
git clone https://github.com/ChainCatalysts/nft-ticketing-dapp

# Install dependencies
cd nft-ticketing-dapp
npm install

# Set up environment variables
cp .env.example .env
# Add your Pinata keys and contract address to .env

# Start development server
npm run dev
```

> Contract is deployed on Base Sepolia. You can verify tickets via token ID or connect your wallet to see your NFT ticket.

---

## 🧬 Future Scope

- 📱 Mobile wallet ticket scanner for event entry  
- 🏷 Role-based ticket types (VIP, regular, student)  
- 🌍 Multi-language and multi-chain support  
- 📊 Dashboard for event organizers to track attendance and sales  

---



## 📎 Resources / Credits

- [OnchainKit](https://docs.base.org/) for wallet & account abstraction  
- [Base Sepolia](https://docs.base.org/) testnet for low-cost deployment  
- [Pinata](https://www.pinata.cloud/) for IPFS-based NFT metadata  
- [wagmi.sh](https://wagmi.sh) and [viem.sh](https://viem.sh) for frontend web3 interactions  
 

---

## 🏁 Final Words

NFTicket was built with the belief that events should be accessible, secure, and verifiable — without relying on centralized platforms. 

