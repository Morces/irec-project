const ethers = require("ethers");
const contractABI = require("../../ABI/IREC.json");
const prisma = require("../../Utils/prisma");

const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

const Mint = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== ADMIN_API_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { to, source, quantity } = req.body;

    if (!ethers.isAddress(to) || !source || !quantity || quantity <= 0) {
      throw {
        custom: true,
        message: "Invalid address, source, or quantity",
      };
    }

    const sourceEnum = { Solar: 0, Wind: 1, Hydro: 2, Geothermal: 3 }[source];
    if (sourceEnum === undefined) {
      return res.status(400).json({ error: "Invalid source" });
    }

    // Encode the transaction data for the frontend to sign
    const txData = contract.interface.encodeFunctionData("mint", [
      to,
      sourceEnum,
      quantity,
    ]);

    const transaction = await prisma.transactions.create({
      data: {
        user_id: req.user.id,
        source: source,
        quantity: parseInt(quantity),
        type: "mint",
        transaction_date: new Date().toISOString(),
      },
    });

    return res.status(200).json({
      message: "Transaction data prepared",
      to: contractAddress,
      value: "0",
      data: txData,
      transaction: transaction,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = Mint;
