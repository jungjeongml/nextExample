"use client";

import AppleShopContract from "../artifacts/contracts/appleShop.sol/AppleShop.json";
import { useState, useEffect } from "react";
import useWeb3 from "./lock";

const AppleShop = () => {
  const [deployed, setDeployed] = useState(null);
  const [apple, setApple] = useState(0);
  const [account, web3] = useWeb3();

  if (!account || !web3) return <>If you use?, connect with metamask</>;

  const buy = async () => {
    await deployed.methods.buy().send({
      from: account,
      //to:"0x92d13d91da89562ff070a499355AF848afaab208" //생략 가능, 인스턴스 생성할때 ca적음
      value: web3.utils.toWei("1", "ether"), // 1*10**18
    });
    deployed.methods.get().call().then(setApple);
  };

  const sell = async () => {
    await deployed.methods.sell().send({
      from: account,
    });
    deployed.methods.get().call().then(setApple);
  };

  useEffect(() => {
    if (!deployed) return;
    deployed.methods.get().call().then(setApple);
  }, [deployed]); //사과의 수를 가져오기 위함.

  useEffect(() => {
    if (!web3) return;
    const instance = new web3.eth.Contract(
      AppleShopContract.abi,
      "0x92d13d91da89562ff070a499355AF848afaab208" // contract address
    ); //
    setDeployed(instance);
  }, []); //배포된 스마트 컨트랙트의 인스턴스 생성

  return (
    <>
      <h2>사과 가격: 1 ETH</h2>
      <div>
        내가 가진 사과 갯수: {apple} <button onClick={buy}>사과 구매</button>
      </div>
      <div>
        총 사과 판매 가격 {apple} ETH <button onClick={sell}>사과 판매</button>
      </div>
    </>
  );
};

export default AppleShop;
