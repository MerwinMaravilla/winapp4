import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("WIN", ["0x04F632A8C2E8710639A5B2Fc8F01f26829014EDd"]); //wallet add

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});