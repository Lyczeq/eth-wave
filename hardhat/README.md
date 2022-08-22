# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
# Returns a list of the accounts
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Running script:

```sh
    npx hardhat run scripts/run.js
```

It actually:

1. Creating a new local Ethereum network.
2. Deploying your contract.
3. Then, when the script ends Hardhat will automatically destroy that local network.

## Running tests:

```sh
    npx hardhat test
```

It runs all the tests in the `test` directory.

## Deploying locally

Keep this command running:

```sh
    npx hardhat node
```

It starts a local Ethereum network that stays alive. It gives 20 accounts with their private keys with **10000 fake ETH** each.

Open a second terminal and run this command:

```sh
    npx hardhat run scripts/deploy.js --network localhost
```

Expected output:

First terminal:

```sh

  Contract deployment: WavePortal
  Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3
  Transaction:         0x815f13abf337ce63123d0a711470c98edf173c907fb06bc1fee79529d92de3ba
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            657694 of 657694
  Block "#"1:            0x491c397c9bf0e5a0c3365df587c09e42c79cc828e354571d163afd9f7b0cabb5
...
```

Second one:
```
    Deploying contracts with account:  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    Account balance:  10000000000000000000000
    WavePortal address:  0x5FbDB2315678afecb367f032d93F642f64180aa3
```
