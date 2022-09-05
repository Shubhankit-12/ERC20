import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MyToken ,MyToken__factory} from "../typechain";
import {expandTo18Decimals, sendTransaction} from"./utilities/utilities";
// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
describe("ERC20 contract",async()=>{
    let owner: SignerWithAddress;
    let signers: SignerWithAddress[];
    let user1 : SignerWithAddress;
    let user2 : SignerWithAddress;
    let user3 : SignerWithAddress;
    let mytoken : MyToken;
    beforeEach("Initilaize",async()=>{
        signers = await ethers.getSigners();
        owner= signers[0];
        user1=signers[1];
        user2=signers[2];
        user3=signers[3];
        mytoken=await new MyToken__factory(owner).deploy();
        await mytoken.connect(owner).approve(user2.address,expandTo18Decimals(4));

    })
    describe("case1",async()=>{
        it("checking totalSupply , balanceOf the token NTR",async()=>{
            expect(await mytoken.totalSupply()).to.be.equal(expandTo18Decimals(10));
            console.log(await mytoken.balanceOf(owner.address));
            console.log("contract bal - ");
            
            console.log(await mytoken.balanceOf(mytoken.address));
        })
        it("checking transfer function" , async()=>{
            await mytoken.connect(owner).transfer(user1.address,expandTo18Decimals(3));
            console.log("balance of user1 after transfer");
            console.log(await mytoken.balanceOf(user1.address));
            
            
        })
           
        it(" checking approve and allowance function",async()=>{
            await mytoken.connect(owner).approve(user2.address,expandTo18Decimals(3));
            expect(await mytoken.connect(owner).allowance(owner.address,user2.address)).to.be.equal(expandTo18Decimals(3));
            expect(await mytoken.connect(user2.address).allowance(owner.address,user2.address)).to.be.equal(expandTo18Decimals(3));

        })
        it("checking transferFrom function of token NTR",async()=>{
            await mytoken.connect(user2).transferFrom(owner.address,user2.address,expandTo18Decimals(4));
            expect(await mytoken.balanceOf(user2.address)).to.be.equal(expandTo18Decimals(4));
            console.log(await mytoken.balanceOf(user2.address));
        })
        it("checking increase allowance",async()=>{
            await mytoken.connect(owner).increaseAllowance(user2.address,expandTo18Decimals(3));
            expect(await mytoken.allowance(owner.address,user2.address)).to.be.equal(expandTo18Decimals(7));
            console.log(await mytoken.allowance(owner.address,user2.address));
        })
        it("checking decrease allowance",async()=>{
            await mytoken.connect(owner).decreaseAllowance(user2.address,expandTo18Decimals(3));
            expect(await mytoken.allowance(owner.address,user2.address)).to.be.equal(expandTo18Decimals(1));
            console.log(await mytoken.allowance(owner.address,user2.address));
            console.log(user2.address,owner.address,user1.address);

        })
        it("checking burn function",async()=>{
            await mytoken.burn(expandTo18Decimals(1));
            // expect(await mytoken.allowance(owner.address,user2.address)).to.be.equal(expandTo18Decimals(1));
            // console.log(await mytoken.allowance(owner.address,user2.address));
            // console.log(user2.address,owner.address,user1.address);
            expect(await mytoken.balanceOf(owner.address)).to.be.equal(expandTo18Decimals(9));
            
            console.log(await mytoken.balanceOf(owner.address));
            
        })
        it.only("checking burnFrom function",async()=>{
            await mytoken.connect(user2).burnFrom(owner.address,expandTo18Decimals(1));
            
            expect(await mytoken.balanceOf(owner.address)).to.be.equal(expandTo18Decimals(9));
            
            console.log(await mytoken.balanceOf(owner.address));
        


    })
})
})
