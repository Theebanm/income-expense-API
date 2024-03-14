const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const { appErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");

// register user
const registerUserCtrl = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  try {
    // check if feild are empty
    if (!fullname || !email || !password) {
      return next(appErr("Provide All Fields", 500));
    }
    // check if email exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User Alerady Exists", 400));
    }

    // hash user  password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "Success",
      fullname: user.fullname,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//login
const userLoginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // check all feilds
    if ((!email, !password)) {
      return next(appErr("Provide All Fields", 400));
    }
    // check if userFound
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appErr("Inavlid Login Credentials", 400));
    } //  password
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return res.json({ message: "Invalid login Credential" });
    }

    res.json({
      status: "Success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const userProfileCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });
    res.json({
      user,
    });
  } catch (error) {
    next(appErr(error));
  }
};

// delete
const deleteUserCtrl = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({
      status: "Success",
      data: null,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

// update
const updateUserCtrl = async (req, res, next) => {
  try {
    // check email exists
    if (req.body.email) {
      const userFound = await User.findOne({ email: req.body.email });

      if (userFound)
        return next(
          appErr("Email is taken or You Already have this email", 402)
        );
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //update the user
      const user = await User.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        { new: true, runvalidator: true }
      );
      return res.status(200).json({
        status: "Success",
        data: user,
      });
    }

    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidation: true,
    });

    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  registerUserCtrl,
  userLoginCtrl,
  userProfileCtrl,
  updateUserCtrl,
  deleteUserCtrl,
};
