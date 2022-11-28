import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";

import { HardhatUserConfig } from "hardhat/config";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  paths: {
    artifacts: './artifacts',
    sources: './contracts'
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.ALCHEMY_PRIVATE_KEY!]
    }
  }
}

export default config;