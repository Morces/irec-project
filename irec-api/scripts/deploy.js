const hre = require("hardhat");

async function main() {
  const IREC = await hre.ethers.getContractFactory("IREC");
  console.log("Deploying IREC contract to Sepolia...");
  const irec = await IREC.deploy();
  await irec.waitForDeployment();
  const contractAddress = await irec.getAddress();
  console.log("IREC deployed to:", contractAddress);

  console.log("Waiting for block confirmations before verification...");
  await irec.deploymentTransaction().wait(5);
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
    console.log("Contract verified on Sepolia Etherscan!");
  } catch (error) {
    console.error("Verification failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
