// irec-api/Controllers/GetBalance.js

const ethers = require("ethers");
const contractABI = require("../../ABI/IREC.json");

const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

const GetBalance = async (req, res, next) => {
  try {
    const { address } = req.query;

    if (!ethers.isAddress(address)) {
      throw {
        custom: true,
        message: "Invalid address",
      };
    }

    const balance = await contract.balanceOf(address);
    return res.status(200).json({ balance: balance.toString() });
  } catch (error) {
    next(error);
  }
};

module.exports = GetBalance;
