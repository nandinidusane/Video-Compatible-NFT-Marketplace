import React, { useEffect, useState } from 'react';
import abi from './artifacts/contracts/NFTMarketPlaceAurora.sol/NFTMarketPlaceAurora.json';
import Home from './Components/Home';
import Web3 from 'web3';
import { ethers } from 'ethers';

import { Web3Provider } from "@ethersproject/providers";
const App = () => {
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  useEffect(()=>{
    const connectWallet = async(e)=>{
      const contractAddress = "0x7128f9BA588715f9A039702410e537FA72684407";
      const contractABI =abi.abi;
    try{
      const {ethereum} = window;
      if(ethereum){
        const account = await ethereum.request({method : "eth_requestAccounts",});
        ethereum.on("accountsChanged", (newAccounts) => {
          setAccount(Web3.utils.toChecksumAddress(newAccounts[0].toLowerCase()));
          window.location.reload();
        });
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        })
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractABI,signer);
        setContract(contract);
        setAccount(Web3.utils.toChecksumAddress(account[0].toLowerCase()));
        console.log(account);
      }else{
        alert("Please install metamask");
      }
    }catch(e){
      console.log(e);
    }}
  connectWallet();
  },[account])
  return (
    <div>
      <Home contract={contract} account={account} />
    </div>
  );
};

export default App;
