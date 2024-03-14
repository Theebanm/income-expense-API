const express = require("express");
const {
  registerUserCtrl,
  userLoginCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
} = require("../../controllers/users/usersCtrl");
const isLogin = require("../../middleware/isLogin");

const usersRoute = express.Router();

//POST/api/v1/users/register

usersRoute.post("/register", registerUserCtrl);

//POST/api/v1/users/login

usersRoute.post("/login", userLoginCtrl);

//get/api/v1/users/profile/:id
usersRoute.get("/profile/", isLogin, userProfileCtrl);

//delete/api/v1/users/profile/:id
usersRoute.delete("/", isLogin, deleteUserCtrl);

// put/api/v1/users/profile/:id
usersRoute.put("/", isLogin, updateUserCtrl);
module.exports = usersRoute;
