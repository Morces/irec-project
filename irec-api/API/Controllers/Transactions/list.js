const prisma = require("../../Utils/prisma");

const List = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const DEMO_WALLET = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

    // Get database transactions
    const items = await prisma.transactions.findMany({
      where: {
        userId: userId,
      },
      include: {
        users: true,
      },
    });

    // Create dummy transactions
    const dummyTransactions = [
      {
        id: "dummy-1",
        type: "buy",
        source: DEMO_WALLET,
        quantity: 100,
        price: 1500,
        date: "2024-04-05",
      },
      {
        id: "dummy-2",
        type: "sell",
        source: DEMO_WALLET,
        quantity: 50,
        price: 750,
        date: "2024-04-06",
      },
      {
        id: "dummy-3",
        type: "transfer",
        source: DEMO_WALLET,
        quantity: 25,
        price: 0,
        date: "2024-04-07",
      },
      {
        id: "dummy-4",
        type: "buy",
        source: DEMO_WALLET,
        quantity: 75,
        price: 1125,
        date: "2024-04-07",
      },
      {
        id: "dummy-5",
        type: "sell",
        source: DEMO_WALLET,
        quantity: 30,
        price: 450,
        date: "2024-04-08",
      },
    ];

    // Format database transactions
    const formattedTransactions = items.map((tx) => ({
      id: tx.id,
      type: tx.type,
      source: tx.source,
      quantity: tx.quantity,
      price: tx.type === "buy" || tx.type === "sell" ? tx.quantity * 15 : 0,
      date: tx.transaction_date.toISOString().split("T")[0],
    }));

    // Combine real and dummy transactions
    const allTransactions = [...formattedTransactions, ...dummyTransactions];

    // Sort by date (newest first)
    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    return res.status(200).json(allTransactions);
  } catch (error) {
    next(error);
  }
};

module.exports = List;
