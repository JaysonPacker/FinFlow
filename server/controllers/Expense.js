const models = require("../models");

const { Expense } = models;

const addExpense = async (req, res) => {
  if (!req.body.source || !req.body.amount || !req.body.date) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  const { source, amount, date } = req.body;
  const expenseData = {
    source: source,
    amount: amount,
    date: date,
    owner: req.session.account._id,
  };

  try {
    const newExpense = new Expense(expenseData);
    await newExpense.save();
    return res.status(201).json({
      source: newExpense.source,
      amount: newExpense.amount,
      date: newExpense.date,
    });
  } catch (err) {
    console.log(`error${err}`);
    if (err.name === 11000) {
      return res.status(400).json({ error: "Expense already exists" });
    }
    return res
      .status(500)
      .json({ error: "An error occurred while creating the expense." });
  }
};

const getExpenses = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Expense.find(query)
      .populate({ path: "owner", select: "-_id username" })
      .lean()
      .exec();

    return res.json({ expenses: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error fetching Expenses" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.body.id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error deleting expense" });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
};
