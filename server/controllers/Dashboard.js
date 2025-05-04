const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

const getDashboardData = async (req, res) => {
  try {
    const owner = req.session.account._id;
    const totalIncome = await Income.aggregate([
      { $match: { owner: new Types.ObjectId(owner) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { owner: new Types.ObjectId(owner) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const last30DaysIncomeTransactions = await Income.find({
      owner,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast30Days = last30DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const last30DaysExpenseTransactions = await Expense.find({
      owner,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Last 5 overall transactions (income + expense)
    const lastIncome = (
      await Income.find({ owner }).sort({ date: -1 }).limit(5)
    ).map((txn) => ({ ...txn.toObject(), type: "income" }));

    const lastExpense = (
      await Expense.find({ owner }).sort({ date: -1 }).limit(5)
    ).map((txn) => ({ ...txn.toObject(), type: "expense" }));

    // Combine & sort by date
    const lastTransactions = [...lastIncome, ...lastExpense]
      .sort((a, b) => b.date - a.date)
      .slice(0, 5); // Top 5 most recent across both

    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysIncome: {
        total: incomeLast30Days,
        transactions: last30DaysIncomeTransactions,
      },
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getDashboardData,
};
