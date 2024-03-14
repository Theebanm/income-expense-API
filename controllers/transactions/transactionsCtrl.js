const Account = require("../../models/Account");
const Transaction = require("../../models/Transaction");
const User = require("../../models/user");

const { appErr } = require("../../utils/appErr");

// create
const createTransactionCtrl = async (req, res, next) => {
  const { name, transactionType, amount, category, account, notes } = req.body;
  try {
    if (
      !name ||
      !transactionType ||
      !amount ||
      !category ||
      !account ||
      !notes
    ) {
      return next(appErr("Please Provide All Fields", 401));
    }
    // 1.Find user
    const userFound = await User.findById(req.user);
    if (!userFound) return next(appErr("User Not Found", 404));
    //  2.Find account
    const accountFound = await Account.findById(account);
    if (!accountFound) return next(appErr("Account Not Found", 404));

    //  3.create transaction
    const transaction = await Transaction.create({
      name,
      transactionType,
      account,
      amount,
      category,
      notes,
      createdBy: req.user,
    });

    //push the transaction to account
    await accountFound.transactions.push(transaction._id);
    // 4. resave
    accountFound.save();
    res.json({
      status: "Succcess",
      data: transaction,
    });
  } catch (error) {
    console.log(error);
  }
};

// single
const fetchTransactionCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    res.status(200).json({
      status: "Success",
      data: transaction,
    });
  } catch (error) {
    console.log(error);
  }
};

// all

const fetchTransactionsCtrl = async (req, res, next) => {
  try {
    const transaction = await Transaction.find();
    res.status(200).json({
      status: "sucess",
      data: transaction,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

// delete
const deleteTransactionCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({
      status: "Success",
      message: "Delete Transaction Route",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

// update
const updateTransactionCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runvalidator: true,
    });
    res.status(200).json({
      status: "Success",
      data: transaction,
    });
  } catch (error) {
    next(appErr(error.mssage, 500));
  }
};

module.exports = {
  updateTransactionCtrl,
  fetchTransactionCtrl,
  fetchTransactionsCtrl,
  createTransactionCtrl,
  deleteTransactionCtrl,
};
