const mongoose = require("mongoose");
const _ = require("underscore");

const setName = (name) => _.escape(name).trim();

const ExpenseSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  amount: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Account",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

ExpenseSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
});

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);
module.exports = ExpenseModel;
