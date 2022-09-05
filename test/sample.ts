// import { expect } from "chai";
// import { ethers } from "hardhat";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { Lottery, Lottery__factory } from "../typechain";
// import {expandTo18Decimals} from"./utilities/utilities";



// describe("Lottery",async()=>{
//   let manager: SignerWithAddress;
//   let signers: SignerWithAddress[];
//   let user1 : SignerWithAddress;
//   let user2 : SignerWithAddress;
//   let user3 : SignerWithAddress;
//   let lottery : Lottery;

//   beforeEach("Initialise",async()=>{
//     signers = await ethers.getSigners();

//     manager= signers[0];
//     user1 = signers[1];
//     user2 = signers[2];
//     user3 = signers[3];
//     lottery = await new Lottery__factory(manager).deploy();
//     await user1.sendTransaction({to : lottery.address, value: ethers.utils.parseEther("2")});
//     await user2.sendTransaction({to : lottery.address, value: ethers.utils.parseEther("2")});
//     await user3.sendTransaction({to : lottery.address, value: ethers.utils.parseEther("2")});
//     });
  

//   // describe("cases",async()=>{
//   //   it("sending transacion to contracts",async()=>{
//   //     // await lottery.connect()
//   //     await user1.sendTransaction({to : lottery.address, value: ethers.utils.parseEther("2")});
//   //     await user2.sendTransaction({to : lottery.address, value: ethers.utils.parseEther("2")});
//   //     await user3.sendTransaction({to : lottery.address, value: ethers.utils.parseEther("2")});
      
//   //     console.log(await lottery.participants(0));
//   //     console.log(await lottery.participants(1));
//   //     console.log(await lottery.participants(2));
//   //     // console.log(await lottery.participants(3));
//   //     console.log(manager.address);

      
      
      
      
//   //   })
//   // })
//   describe("case2",async()=> {

//     it("contract balance is equal to the total ethers submitted", async()=>{
//       console.log(await lottery.getBalance());
//       expect(await lottery.getBalance()).to.be.equal(expandTo18Decimals(6));
//     })
//     it.only("Revert check",async()=>{
//       await lottery.connect(manager).selectWinner();
//       console.log(await lottery.getWinner());
//       console.log(user1.address,user2.address,user3.address,lottery.address);
//     })
  
//   });

// // });

//     // describe("case3",async()=>{
//     //   it("lottery address ",async()=>{
//     //     console.log(await lottery.address);
//     //   });
//     // })
//   }
// )