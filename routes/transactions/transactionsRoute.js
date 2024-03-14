const express = require("express");
const {
  createTransactionCtrl,
  fetchTransactionsCtrl,
  fetchTransactionCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
} = require("../../controllers/transactions/transactionsCtrl");
const isLogin = require("../../middleware/isLogin");

const transactionsRoute = express.Router();

// post/api/v1/transaction

transactionsRoute.post("/", isLogin, createTransactionCtrl);

// get/api/v1/transactions/:id
transactionsRoute.get("/:id", fetchTransactionCtrl);
// get/api/v1/transactions
transactionsRoute.get("/", isLogin, fetchTransactionsCtrl);

// delete/api/v1/transactions/:id
transactionsRoute.delete("/:id", deleteTransactionCtrl);

// put/api/v1/transactions/:id
transactionsRoute.put("/:id", updateTransactionCtrl);

module.exports = transactionsRoute;
