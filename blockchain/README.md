# First Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## Troubleshooting

### Nonce too high
This error appears after you restart the node with `npx hardhat node`. Need to reset a Metamask. Go to *Settings*, then *Advanced* and hit *Reset Account*.

