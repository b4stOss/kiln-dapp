# NFT Minting dApp

A modern NFT claiming application built on Base Sepolia testnet. Users can connect their wallet, browse NFT collections, and claim free NFTs directly from the interface.

## 🎯 Features

- **Wallet Connection** - Connect via MetaMask or any injected Web3 wallet
- **NFT Gallery** - Browse available NFTs with an interactive gallery
- **Free Claiming** - Claim NFTs for free (gas only)
- **Real-time Balance** - Track your NFT holdings automatically
- **Transaction Notifications** - Live updates on transaction status
- **Responsive Design** - Optimized for desktop and mobile

## 🛠️ Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite (build tool)
- Mantine UI + Tailwind CSS

**Blockchain**
- Wagmi v2 + Viem (Ethereum interactions)
- Base Sepolia (L2 testnet)
- TanStack Query (state management)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MetaMask or compatible Web3 wallet
- Base Sepolia testnet ETH ([get faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nft-minting-dapp.git

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📝 Project Structure

```
src/
├── components/     # React components (Header, NFTGallery, ClaimPanel, etc.)
├── hooks/          # Custom hooks (useWallet, useClaim, useNFTBalance)
├── lib/            # Configuration (wagmi, API, IPFS)
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## 🔗 Smart Contract

The dApp interacts with an ERC-1155 NFT contract deployed on Base Sepolia testnet. The contract implements a free claiming mechanism with the following features:
- Free minting (users only pay gas)
- ERC-1155 standard for semi-fungible tokens
- Safe transfer functionality

## 📄 License

MIT
