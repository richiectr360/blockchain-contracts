# Decentralized Exchange with Flash Loans

## Problem Statement

Traditional centralized exchanges face several challenges:
- Lack of transparency in order execution
- Custody risks of user funds
- Limited access to advanced trading features
- High barriers to entry for new tokens

This project solves these problems by implementing:
- A fully decentralized exchange where users maintain control of their funds
- Transparent order book management on-chain
- Flash loan capabilities for advanced trading strategies
- Permissionless token listing system

## Tech Stack

### Smart Contract Development
- **Solidity**: Smart contract programming language
- **Hardhat**: Development environment and testing framework
- **Hardhat Ignition**: Deployment management system
- **Ethers.js**: Ethereum web library
- **OpenZeppelin**: Smart contract security standards and implementations

### Testing & Quality Assurance
- **Chai**: Assertion library for testing
- **Mocha**: Testing framework
- **Hardhat Network**: Local blockchain for development

### Backend Infrastructure
- **EVM Compatible**: Works with any EVM-based blockchain
- **Event System**: Real-time updates for frontend integration
- **Gas Optimization**: Efficient contract design for lower transaction costs

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
