const hre = require("hardhat");

async function main() {
  const IRECCertificate = await hre.ethers.getContractFactory(
    "IRECCertificate"
  );
  const irecCertificate = await IRECCertificate.deploy();
  await irecCertificate.waitForDeployment();

  console.log(
    "IRECCertificate deployed to:",
    await irecCertificate.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
