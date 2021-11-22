# 3space-nft

This repository is the source code of three space nft.

### Setup

Set up .env file in the project directory and add the following environment variables:

```
# Secret key for deploying contracts
ADMIN=
INFURA_API_KEY=
ETHERSCAN_API_KEY=

```

Before running any command, make sure to install dependencies:

```
yarn
```

### Tasks

Mint test assets from deployer to deployer address.

```
yarn task mint --network {networkName}
```

### Deploy

```
yarn hardhat deploy --network {networkName}
```

### Test

```
yarn hardhat test
```
