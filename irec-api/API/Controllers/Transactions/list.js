const prisma = require("../../Utils/prisma");

const List = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const items = await prisma.transactions.findMany({
      where: {
        userId: userId,
      },
      include: {
        users: true,
      },
    });

    const formattedTransactions = items.map((tx) => ({
      id: tx.id,
      type: tx.type,
      source: tx.source,
      quantity: tx.quantity,
      price: tx.type === "buy" || tx.type === "sell" ? tx.quantity * 15 : 0,
      date: tx.transaction_date.toISOString().split("T")[0],
    }));

    return res.status(200).json(formattedTransactions);
  } catch (error) {
    next(error);
  }
};

module.exports = List;
