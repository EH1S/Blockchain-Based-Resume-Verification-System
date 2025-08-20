require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,        // Reads Alchemy/Infura URL from .env
      accounts: [process.env.PRIVATE_KEY]      // Reads your MetaMask private key from .env
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY       // Reads Etherscan API key from .env
  }
};
