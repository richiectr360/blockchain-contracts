# Decentralized Exchange with Flash Loans

This project implements a decentralized exchange (DEX) with flash loan capabilities using Hardhat and Solidity. The backend includes smart contracts for token management, exchange functionality, and flash loans.

## Smart Contracts

- `Token.sol`: ERC20 token implementation for DAPP, mUSDC, and mLINK tokens
- `Exchange.sol`: DEX implementation with order book and flash loan functionality
- `FlashLoanUser.sol`: Contract for executing flash loan operations

## Features

- Token transfers and approvals
- Deposit and withdrawal of tokens
- Order creation, cancellation, and filling
- Flash loan functionality
- Fee collection system
- Order book management

## Development Setup

1. Install dependencies:
```shell
npm install
```

2. Start local Hardhat node:
```shell
npx hardhat node
```

3. Deploy contracts:
```shell
npx hardhat ignition deploy ignition/modules/Token.js --network localhost
npx hardhat ignition deploy ignition/modules/Exchange.js --network localhost
npx hardhat ignition deploy ignition/modules/FlashLoanUser.js --network localhost
```

4. Seed the exchange with test data:
```shell
npx hardhat run scripts/seed.js --network localhost
```

## Testing

Run the test suite:
```shell
npx hardhat test
```

## Project Structure

- `/contracts`: Smart contract source code
- `/test`: Contract test files
- `/scripts`: Deployment and interaction scripts
- `/ignition/modules`: Hardhat Ignition deployment modules

## Frontend Integration

The smart contracts are ready to be integrated with a frontend application. Contract addresses will be available after deployment for frontend configuration.

## License

MIT
