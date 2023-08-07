const hre = require("hardhat");
async function main() {
    const NFTMarketPlaceAurora = await hre.ethers.getContractFactory('NFTMarketPlaceAurora');
    const contract = await NFTMarketPlaceAurora.deploy();
     await contract.deployed();
     console.log("Address of Contract : ",contract.address);  
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });