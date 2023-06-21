// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract AppleShop {
	mapping(address => uint256) myApple;
    
    
    function buy() public payable {
    	myApple[msg.sender] += 1;
    }
    //payable로 선언해서 ether를 주고 받을 수 있다. 선언하지 않으면 어떻게 되는지 아래내용에서 보여줄 것.
    // myApple이 비어있으면 msg.sender로 키값을, value값은 default로 0으로 생성해서 적용한다.
    
    function get() public view returns (uint256){
    	return myApple[msg.sender];
    }
    
    function sell() public payable {
    	uint256 refund = myApple[msg.sender] * 10 ** 18; //이더단위적용
        
        myApple[msg.sender] = 0; // 전체환불이기 때문에 0으로 초기화한다.
        payable(msg.sender).transfer(refund); //가지고 있는 것 모두 보냄.
    }
    // payable(msg.sender)의 return값이 객체임. transfer는 payable()의 내장 객체
    
}