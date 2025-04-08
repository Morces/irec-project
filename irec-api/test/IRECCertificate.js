// test/IRECCertificate.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IRECCertificate", function () {
  let IRECCertificate;
  let certificate;
  let owner;
  let addr1;

  beforeEach(async function () {
    // Get the signers
    [owner, addr1] = await ethers.getSigners();

    // Deploy the contract
    IRECCertificate = await ethers.getContractFactory("IRECCertificate");
    certificate = await IRECCertificate.deploy();
    await certificate.deployed();
  });

  it("Should deploy the contract", async function () {
    expect(await certificate.name()).to.equal("IRECCertificate");
    expect(await certificate.symbol()).to.equal("IREC");
  });

  it("Should mint a certificate", async function () {
    const tokenId = await certificate.safeMint(addr1.address);
    expect(await certificate.ownerOf(tokenId)).to.equal(addr1.address);
  });

  it("Should return true if certificate exists", async function () {
    const tokenId = await certificate.safeMint(addr1.address);
    expect(await certificate._exists(tokenId)).to.equal(true);
  });

  it("Should return false if certificate does not exist", async function () {
    const nonExistentTokenId = 999;
    expect(await certificate._exists(nonExistentTokenId)).to.equal(false);
  });
});
