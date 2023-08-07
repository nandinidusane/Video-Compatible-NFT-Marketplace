require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const RSK_TESTNET_PRIVATE_KEY = process.env.RSK_TESTNET_PRIVATE_KEY;
module.exports = {
  solidity: "0.8.1",
 networks: {
   hardhat: {},
   rsk_testnet: {
    url: "https://filecoin-calibration.chainup.net/rpc/v1",
    accounts: [`a93c2fab9cb3eb0a4ae12b80fda2a5e7bc51a229f7936dae41461e6a06dd632a`],
    chainId: 31
  }
 },
};
