const models = require("../models");

const { Income } = models;

const addIncome = async (req, res) => {
  if (!req.body.source || !req.body.amount || !req.body.date) {
    console.log("All fields are required server!");

    return res.status(400).json({ error: "All fields are required! server" });
  }
  const { source, amount, date } = req.body;
  const incomeData = {
    source: source,
    amount: amount,
    date: date,
    owner: req.session.account._id,
  };

  try {
    const newIncome = new Income(incomeData);
    await newIncome.save();
    return res.status(201).json({
      source: newIncome.source,
      amount: newIncome.amount,
      date: newIncome.date,
    });
  } catch (err) {
    console.log(`error${err}`);
    if (err.name === 11000) {
      return res.status(400).json({ error: "Income already exists" });
    }
    return res
      .status(500)
      .json({ error: "An error occurred while creating the income." });
  }
};

const getIncomes = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Income.find(query)
      .populate({ path: "owner", select: "-_id username" })
      .lean()
      .exec();

    return res.json({ incomes: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error fetching Incomes" });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.body.id);
    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }
    return res.status(200).json({ message: "Income deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error deleting income" });
  }
};

module.exports = {
  addIncome,
  getIncomes,
  deleteIncome,
};
