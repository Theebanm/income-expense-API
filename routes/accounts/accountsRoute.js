const express = require("express");
const {
  createAccountCtrl,
  fetchAccountCtrl,
  fetchAccountsCtrl,
  deleteAccountCtrl,
  updateAccountCtrl,
} = require("../../controllers/accounts/accountsCtrl");
const isLogin = require("../../middleware/isLogin");
const accountsRoute = express.Router();

// post/api/v1/accounts
accountsRoute.post("/", isLogin, createAccountCtrl);

// post/api/v1/accounts
accountsRoute.get("/", fetchAccountsCtrl);

// get/api/v1/accounts/:id
accountsRoute.get("/:id", fetchAccountCtrl);

// delete/api/v1/accounts
accountsRoute.delete("/:id", deleteAccountCtrl);

// put/api/v1/accounts/:id
accountsRoute.put("/:id", updateAccountCtrl);
module.exports = accountsRoute;
