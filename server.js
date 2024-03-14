require("dotenv").config();
require("./config/dbConnect");
const cors = require("cors");
const express = require("express");
const usersRoute = require("./routes/users/usersRoute");
const accountsRoute = require("./routes/accounts/accountsRoute");
const transactionsRoute = require("./routes/transactions/transactionsRoute");
const globalErrHandler = require("./middleware/globalErrHandler");

const app = express();
app.use(express.json());

// middleware

// cors middleware
app.use(cors());
// routes

//! users Route
app.use("/api/v1/users", usersRoute);
//! accounts  Route
app.use("/api/v1/accounts", accountsRoute);

//! Transaction Route
app.use("/api/v1/transactions", transactionsRoute);

// Error handlers
app.use(globalErrHandler);
// Listern to server

const PORT = process.env.PORT || 8393;

app.listen(PORT, () => {
  console.log(`Server is Running On ${PORT}`);
});
