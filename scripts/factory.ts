import { ethers } from "hardhat";

async function main() {
  const [owner, admin2] = await ethers.getSigners();
  const admin = [owner.address, admin2.address, "0xE122199bB9617d8B0e814aC903042990155015b4"];

  const CloneMultiSig = await ethers.getContractFactory("cloneMultiSig");
  const cloneMultiSig = await CloneMultiSig.deploy();
  await cloneMultiSig.deployed();

  console.log(`Multisig Address is ${cloneMultiSig.address}`);
//   const newMultisig = await cloneMultiSig.createMultiSig(admin);
//   let event = await newMultisig.wait();
//   let newChild = event.events[0].args[0];
//   console.log(newChild);

  

  const childMultisig = await ethers.getContractAt("IMultisig","0xC57222F77e3F8a19f7bE360A3779E6909F7e128d");
  const addresses = await childMultisig.returnAdmins();
  console.log(addresses);

  await childMultisig.addAdmin("0x5D8e56493855e092ca9eFf3e7bf08b38baB0892b");
  await childMultisig.connect(admin2).addAdmin("0x5D8e56493855e092ca9eFf3e7bf08b38baB0892b");

  const addressesNew = await childMultisig.returnAdmins();
  console.log(addressesNew);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});