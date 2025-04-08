const ethers = require("ethers");
const contractABI = require("../../ABI/IREC.json");
const prisma = require("../../Utils/prisma");

const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

const Burn = async (req, res, next) => {
  try {
    const { source, quantity } = req.body;

    if (!source || !quantity) {
      throw {
        custom: true,
        message: "Please provide source and quantity",
      };
    }

    const sourceEnum = { Solar: 0, Wind: 1, Hydro: 2, Geothermal: 3 }[source];
    if (sourceEnum === undefined) {
      return res.status(400).json({ error: "Invalid source" });
    }

    // Encode the transaction data for the frontend to sign
    const txData = contract.interface.encodeFunctionData("burn", [
      sourceEnum,
      quantity,
    ]);

    const transaction = await prisma.transactions.create({
      data: {
        user_id: req.user.id,
        source: source,
        quantity: parseInt(quantity),
        type: "burn",
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

module.exports = Burn;
