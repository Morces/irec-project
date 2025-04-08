// irec-api/Controllers/GetSourceBalance.js

const ethers = require("ethers");
const contractABI = require("../../ABI/IREC.json");

const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

const GetSourceBalance = async (req, res, next) => {
  try {
    const { address, source } = req.query;

    if (!ethers.isAddress(address) || !source) {
      throw {
        custom: true,
        message: "Invalid address or source",
      };
    }

    const sourceEnum = { Solar: 0, Wind: 1, Hydro: 2, Geothermal: 3 }[source];
    if (sourceEnum === undefined) {
      return res.status(400).json({ error: "Invalid source" });
    }

    const balance = await contract.getSourceBalance(address, sourceEnum);
    return res.status(200).json({ source, balance: balance.toString() });
  } catch (error) {
    next(error);
  }
};

module.exports = GetSourceBalance;
