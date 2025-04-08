// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const IRECCertificate = await ethers.getContractFactory("IRECCertificate");
  const certificate = await IRECCertificate.deploy();
  console.log("IRECCertificate deployed to:", certificate.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
