const mongoose = require("mongoose");

// account Schema

const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["Income", "Expenses"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Food",
        "Transportation",
        "Entertainment",
        "Shopping",
        "Utilities",
        "Health",
        "Travel",
        "Education",
        "Personal",
        "Groceries",
        "Bills",
        "Uncategorized",
      ],
      required: true,
    },
    color: {
      type: String,
    },
    account: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    notes: {
      type: String,
      toJSON: { virtuals: true },
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// model
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
