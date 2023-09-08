require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const RSK_TESTNET_PRIVATE_KEY = process.env.RSK_TESTNET_PRIVATE_KEY;
module.exports = {
  solidity: "0.8.1",
 networks: {
   hardhat: {},
   bitfinity_testnet: {
    url: "https://testnet.bitfinity.network",
    accounts: [`4bbdd176f06bf3f9876a1018e1d6b2761d07b9221f441ba5956a29ca27bafce8`],
    chainId: 355113
  }
 },
};
