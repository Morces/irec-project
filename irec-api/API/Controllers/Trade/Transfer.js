// irec-api/Controllers/Transfer.js

const ethers = require("ethers");
const contractABI = require("../../ABI/IREC.json");
const prisma = require("../../Utils/prisma");

const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

const Transfer = async (req, res, next) => {
  try {
    const { to, amount } = req.body;

    if (!ethers.isAddress(to) || !amount || amount <= 0) {
      throw {
        custom: true,
        message: "Invalid address or amount",
      };
    }

    // Encode the transaction data for the frontend to sign
    const txData = contract.interface.encodeFunctionData("transfer", [
      to,
      amount,
    ]);

    const transaction = await prisma.transactions.create({
      data: {
        user_id: req.user.id,
        source: "N/A",
        quantity: parseInt(amount),
        type: "transfer",
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

module.exports = Transfer;
