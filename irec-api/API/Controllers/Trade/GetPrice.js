// irec-api/Controllers/GetPrice.js

const ethers = require("ethers");
const contractABI = require("../../ABI/IREC.json");

const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

const GetPrice = async (req, res, next) => {
  try {
    const price = await contract.PRICE_PER_IREC();
    return res.status(200).json({ price: price.toString() });
  } catch (error) {
    next(error);
  }
};

module.exports = GetPrice;
