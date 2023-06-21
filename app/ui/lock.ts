"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useWeb3 = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts: string[]) => {
        setAccount(accounts[0]);
        const web3 = new ethers.providers.Web3Provider(window.ethereum);
        setWeb3(web3);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }, []);
  
  return [account, web3];
};

export default useWeb3;
