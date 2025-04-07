# I-REC

I-REC is a full-stack decentralized application (dApp) for trading International Renewable Energy Certificates (I-RECs) on the Ethereum blockchain. The application allows users to buy, sell, and transfer I-RECs, view marketplace items, track their transaction history, and monitor I-REC value trends through a chart. The backend is built with Express.js and integrates with a smart contract deployed on the Sepolia testnet, while the frontend is an Angular application providing a sleek and responsive user interface.

## Features

- **Marketplace**: View available I-RECs (e.g., Solar, Wind, Hydro, Geothermal) with their quantities and prices
- **Trade I-RECs**: Buy, sell, or transfer I-RECs using a smart contract on the Sepolia testnet
- **Transaction History**: View a history of all buy, sell, and transfer transactions
- **I-REC Overview Chart**: Monitor the historical value of I-RECs with a responsive chart
- **Responsive Design**: A modern, mobile-friendly UI built with Angular, styled with Poppins font and linear gradients
- **Backend Integration**: The Express.js backend handles all blockchain interactions and syncs data with a Supabase database

## Tech Stack

- **Frontend**: Angular, TypeScript, Chart.js (ng2-charts), CSS
- **Backend**: Express.js, Node.js
- **Blockchain**: Hardhat, Ethers.js, Sepolia Testnet
- **Smart Contract**: Solidity (IREC contract based on ERC-20)
- **Database**: Supabase (PostgreSQL)
- **Other Tools**: OpenZeppelin (for ERC-20), Alchemy (for Sepolia node access)

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v16 or later) - [Download](https://nodejs.org/)
- npm (comes with Node.js)
- Angular CLI: `npm install -g @angular/cli`
- Git - [Download](https://git-scm.com/)
- MetaMask for interacting with Sepolia testnet
- Alchemy Account for Sepolia node access - [Sign up](https://www.alchemy.com/)
- Supabase Account for database - [Sign up](https://supabase.com/)

Additional requirements:

- Sepolia wallet with test ETH (use [Alchemy Sepolia Faucet](https://sepolia-faucet.alchemy.com/))
- Wallet private key for contract deployment and transaction signing

## Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:Morces/irec-project.git
cd irec-project
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd irec-api

# Install dependencies
npm install # or yarn

# Deploy IREC contract
npx hardhat run scripts/deploy.js --network sepolia

# Create and configure environment variables
cat << EOF > .env
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
PORT=3000
PRIVATE_KEY=your-wallet-private-key
ALCHEMY_API_KEY=your-alchemy-api-key
EOF

# Start development server
npm run dev # or yarn dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../irec-ux

# Install dependencies
npm install # or yarn

# Start development server
ng serve
```

> **Note**: Update the wallet address in `src/app/dashboard/dashboard.component.ts`:

```typescript
walletAddress = "0xYourWalletAddress"; // Replace with your Sepolia wallet address
```

## Testing on Sepolia

1. **Verify Transactions**: After performing a trade, check the transaction hash on Sepolia Etherscan
2. **Check Supabase**: Verify user balances and transactions in the Supabase dashboard
3. **Gas Fees**: Ensure your backend wallet has sufficient Sepolia ETH for gas fees

## License

This project is licensed under the MIT License. See the LICENSE file for details.
