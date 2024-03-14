const Account = require("../../models/Account");

const User = require("../../models/user");
const { appErr } = require("../../utils/appErr");

// create
const createAccountCtrl = async (req, res, next) => {
  const { name, initialBalance, accountType, notes } = req.body;
  try {
    // 1.find logged in user
    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(appErr("user not found ", 404));
    }
    // 2.creae the account
    const account = await Account.create({
      name,
      initialBalance,
      accountType,
      notes,
      createBy: req.user,
    });
    // push the account into account feild
    userFound.accounts.push(account._id);
    // 4.resave  the user
    await userFound.save();
    res.json({
      status: "Success",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

// fetch all account

const fetchAccountsCtrl = async (req, res) => {
  try {
    const account = await Account.find().populate("transactions");
    res.json({
      account,
    });
  } catch (error) {
    next(appErr(error.messaage, 500));
  }
};

// fetch account
const fetchAccountCtrl = async (req, res, next) => {
  try {
    console.log(req.params.id);
    // find the id from params
    const account = Account.findById(req.params.id).populate("transactions");
    if (!account) {
      return next(appErr("Account Not Found", 404));
    }
    res.json({
      status: "success",
      data: account,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

// delete
const deleteAccountCtrl = async (req, res) => {
  try {
    // find the account by req.params
    const { id } = req.params;
    await Account.findByIdAndDelete(id);
    res.status(200).json({
      Status: "Success",
      Message: "Account Deleted SuccessFully",
      data: null,
    });
  } catch (error) {
    next(appErr(error.messaage, 500));
  }
};

// update

const updateAccountCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const accountFound = await Account.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
    });
    console.log(accountFound);
    res.json({
      status: "Success",
      data: accountFound,
    });
  } catch (error) {
    next(appErr(error.messaage, 500));
  }
};

module.exports = {
  createAccountCtrl,
  fetchAccountCtrl,
  fetchAccountsCtrl,
  deleteAccountCtrl,
  updateAccountCtrl,
};
