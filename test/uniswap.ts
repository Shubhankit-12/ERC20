// import { ethers } from "hardhat";
// import { expect } from "chai";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

// import {
//   CalHash,
//   CalHash__factory,
//   Factory,
//   Token1,
//   Token1__factory,
//   Token2,
//   Token2__factory,
//   UniswapV2ERC20,
//   UniswapV2ERC20__factory,
//   UniswapV2Factory,
//   UniswapV2Factory__factory,
//   UniswapV2Migrator,
//   UniswapV2Migrator__factory,
//   UniswapV2Pair,
//   UniswapV2Pair__factory,
//   UniswapV2Router01,
//   UniswapV2Router01__factory,
//   UniswapV2Router02,
//   UniswapV2Router02__factory,
//   WETHToken,
//   WETHToken__factory,
// } from "../typechain";

// import { addressFromNumber, expandTo18Decimals } from "./utilities/utilities";
// import { hashMessage } from "ethers/lib/utils";
// import { Console } from "console";

// describe("UNISWAP", function () {
//   let owner: SignerWithAddress;
//   let signers: SignerWithAddress[]; //getting signers address in array

//   let s1: SignerWithAddress;
//   let s2:SignerWithAddress
//   let cal: CalHash;
//   let token1: Token1;
//   let token2: Token2;
//   let Factory: UniswapV2Factory;
//   let UniswapV2P: UniswapV2Pair;
//   let Router2: UniswapV2Router02;
//   let pair: UniswapV2Pair;
//   let weth: WETHToken;

//   beforeEach(async function () {
//     signers = await ethers.getSigners(); //ethers is proividing address of the signer
//     owner = signers[0]; //signer is giving address in array to owner from 0th place....to last place
//     s1 = signers[1];
//     s2 = signers[2];
//     token1 = await new Token1__factory(owner).deploy(
//       "Token1",
//       "shfjywq",
//       expandTo18Decimals(60000)
//     );
//     token2 = await new Token2__factory(owner).deploy(
//       "Token2",
//       "ewytdw",
//       expandTo18Decimals(60000)
//     );
//     Factory = await new UniswapV2Factory__factory(owner).deploy(owner.address);
//     weth = await new WETHToken__factory(owner).deploy();
//     cal = await new CalHash__factory(owner).deploy();
//     pair = await new UniswapV2Pair__factory(owner).deploy();
//     Router2 = await new UniswapV2Router02__factory(owner).deploy(
//       Factory.address,
//       weth.address
//     );
//   });

//   describe("Uniswap function", async () => {
//     it("generate hash", async () => {
//       let hash3 = await cal.getInitHash();
//       console.log(hash3);
//     });

//     it("addLiquidity", async () => {
//       await token1
//         .connect(owner)
//         .approve(Router2.address, expandTo18Decimals(15000));
//       await token2
//         .connect(owner)
//         .approve(Router2.address, expandTo18Decimals(15000));
//       const pairCreate = await Factory.createPair(
//         token1.address,
//         token2.address
//       );

//       await Router2.connect(owner).addLiquidity(
//         token1.address,
//         token2.address,
//         expandTo18Decimals(12000),
//         expandTo18Decimals(10000),
//         expandTo18Decimals(80),
//         expandTo18Decimals(60),
//         owner.address,
//         1713585312
//       );

//       const pair = Factory.getPair(token1.address, token2.address);
//       //   console.log("pairetyukukr", await pair);
//       const pairInstance = await new UniswapV2Pair__factory(owner).attach(
//         await pair
//       );
//       console.log("pairInstance", pairInstance.address);

//       let xyz = await token1.balanceOf(owner.address);
//       let zxy = await token1.balanceOf(owner.address);
//       console.log("removing a token 1" + (await token1.connect(owner.address)));
//       console.log(
//         "removing  a token 2" + (await token2.connect(owner.address))
//       );
//       let lptoken = await pairInstance.balanceOf(owner.address);
//       console.log("balance of lp token" + lptoken);

//       //   console.log("pairInstance", pairInstance);
//       const Reserves = await pairInstance.getReserves();
//       console.log("Reserves", Reserves);

//       const reserve0 = String(Reserves._reserve0);
//       const reserve1 = String(Reserves._reserve1);
//       expect(reserve0).to.be.equal(expandTo18Decimals(10000));
//       expect(reserve1).to.be.equal(expandTo18Decimals(12000));

//       // expect(Reserves).to.be.equal(expandTo18Decimals(300));
//     });
//     it("addLiquidity to eth", async () => {
//       await token1
//         .connect(owner)
//         .approve(Router2.address, expandTo18Decimals(12000));
//       console.log("wgdwfdy", Router2.functions);
//       console.log(
//         "before adding eth:" + (await ethers.provider.getBalance(owner.address))
//       );
//       await Router2.connect(owner).addLiquidityETH(
//         token1.address,
//         expandTo18Decimals(3000),
//         expandTo18Decimals(20),
//         expandTo18Decimals(1),
//         owner.address,
//         1681962912,
//         { value: 5 }
//       );
//       console.log(
//         "after adding eth:" + (await ethers.provider.getBalance(owner.address))
//       );
//     });

//     it("removeLiquidity", async () => {
//       await token1
//         .connect(owner)
//         .approve(Router2.address, expandTo18Decimals(9000));
//       await token2
//         .connect(owner)
//         .approve(Router2.address, expandTo18Decimals(8000));
//       await Router2.connect(owner).addLiquidity(
//         token1.address,
//         token2.address,
//         expandTo18Decimals(8000),
//         expandTo18Decimals(7000),
//         expandTo18Decimals(60),
//         expandTo18Decimals(50),
//         owner.address,
//         1713585312
//       );
//       // console.log(runn);
//       let pair = await Factory.getPair(token1.address, token2.address);
//       //   console.log("pairetyukukr", await pair);
//       const pairInstance = await new UniswapV2Pair__factory(owner).attach(pair);
//       let lptoken = await pairInstance.balanceOf(owner.address);
//       console.log("balance of lptoken removing" + lptoken);
//       await pairInstance.approve(Router2.address, lptoken);
//       await Router2.connect(owner).removeLiquidity(
//         token1.address,
//         token2.address,
//         lptoken,
//         expandTo18Decimals(60),
//         expandTo18Decimals(50),
//         owner.address,
//         1713585312
//       );
//       let resultLPBalance = await pairInstance.balanceOf(owner.address);
//       console.log("LP balance:" + resultLPBalance);
//       // expect(resultLPBalance).to.be.eq(0);
//     });
//     it("removeLiquidityETH", async () => {
//       await token1
//         .connect(owner)
//         .approve(Router2.address, expandTo18Decimals(9000));
//       console.log(1);
//       await Router2.connect(owner).addLiquidityETH(
//         token1.address,
//         expandTo18Decimals(3000),
//         expandTo18Decimals(1),
//         expandTo18Decimals(1),

//         owner.address,
//         1681962912,
//         { value: 5 }
//       );
//       console.log(1);
//       let Pair = await Factory.getPair(token1.address, weth.address);
//       console.log(1);
//       const pairInstance = await new UniswapV2Pair__factory(owner).attach(Pair);
//       console.log(1);
//       let lptoken = await pairInstance.balanceOf(owner.address);
//       console.log(1);
//       await pairInstance.approve(Router2.address, lptoken);
//       await Router2.connect(owner).removeLiquidityETH(
//         token1.address,
//         lptoken,
//         expandTo18Decimals(2000),
//         1,
//         owner.address,
//         1713585552
//       );
//     });

//     //swapExactTokensForTokens
//     it("swapExactETHForTokens",async()=>{

      
      
//       await token1
//       .connect(owner)
//       .approve(Router2.address, expandTo18Decimals(12000));
//     // console.log("wgdwfdy", Router2.functions);

//     console.log(
//       "before adding eth:" + (await ethers.provider.getBalance(owner.address))
//     );
//     await Router2.connect(owner).addLiquidityETH(
//       token1.address,
//       expandTo18Decimals(2000),
//       expandTo18Decimals(10),
//       expandTo18Decimals(1),
//       owner.address,
//       1681962912,
//       { value: 5 }
//     );
//     console.log(
//       "after adding eth:" + (await ethers.provider.getBalance(owner.address))
//     );


//    let xyz= await Router2.getAmountsOut(expandTo18Decimals(1),[weth.address,token1.address,])

//    console.log("dfwdytsw",xyz)

//    const arr = [weth.address,token1.address];
//    let zxy=await Router2.connect(owner).swapExactETHForTokens(expandTo18Decimals(800),arr,owner.address,1713671717,{value:"211"})
//    console.log("edewdv",zxy)
      
//     })

//   it("swapETHForExactTokens",async()=>{
//     await token1
//       .connect(owner)
//       .approve(Router2.address, expandTo18Decimals(12000));
//      let abf= await token1.connect(owner).transfer(s2.address,expandTo18Decimals(15000))
//      let rsd=await token1.balanceOf(s2.address)
//      await token1.connect (s2).approve(Router2.address,expandTo18Decimals(11000))

//     // console.log("wgdwfdy", Router2.functions);
//     console.log(
//       "before adding eth:" + (await ethers.provider.getBalance(s2.address))
//     );
    
//     await Router2.connect(owner).addLiquidityETH(
//       token1.address,
//       expandTo18Decimals(2000),
//       expandTo18Decimals(10),
//       expandTo18Decimals(1),
//       owner.address,
//       1681962912,
//       { value: 5 }
//     );
//     console.log(
//       "after adding eth:" + (await ethers.provider.getBalance(s2.address))
//     );


//    let qnc= await Router2.getAmountsOut(expandTo18Decimals(1),[weth.address,token1.address])

//    console.log("dfwdytsw",qnc);

//    const arr = [weth.address,token1.address];
//    await Router2.connect(s2).swapExactETHForTokens(expandTo18Decimals(800),arr,s2.address,1713671717,{value:"211"})
//    let acd=await token1.balanceOf(s2.address)
//    expect(Number(rsd)).to.be.lessThan(Number(acd))
   

//   //  console.log("edewdv",xyz)
      

//   })  
//   it.only("swapExactTokensForTokens",async()=>{
//     await token1
//     .connect(owner)
//     .approve(Router2.address, expandTo18Decimals(10000));
//   await token2
//     .connect(owner)
//     .approve(Router2.address, expandTo18Decimals(9000));
//   await Router2.connect(owner).addLiquidity(
//     token1.address,
//     token2.address,
//     expandTo18Decimals(8000),
//     expandTo18Decimals(7000),
//     expandTo18Decimals(60),
//     expandTo18Decimals(50),
//     owner.address,
//     1713585312
//   );
//   // console.log(runn);
//   let pair = await Factory.getPair(token1.address, token2.address);
//   //   console.log("pairetyukukr", await pair);
//   const pairInstance = await new UniswapV2Pair__factory(owner).attach(pair);
//   let lptoken = await pairInstance.balanceOf(owner.address);
//   console.log("balance of lptoken removing" + lptoken);
//   await pairInstance.approve(Router2.address, lptoken);
//   let arr=[weth.address,token1.address,token2.address]
//   await Router2.connect(owner).swapExactTokensForTokens(expandTo18Decimals(19000),expandTo18Decimals(13000),arr,owner.address,1713671717)
//   })
//   });
// });
