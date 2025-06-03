const UserModel = require("../models/user");
const bcryptjs = require("bcryptjs");
const sendResponse = require("../utils/sendResponse");
require("dotenv").config()

exports.registerTempUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Signup payload:", req.body);

  try {
    const existingUser = await UserModel.findOne({ email });
    console.log("existingUser", existingUser);

    if (existingUser) {
      return sendResponse(res, "User already exists", 400, false);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const data = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    return sendResponse(res, "Signup successful", 200, true, { data });
  } catch (err) {
    console.error("Error in registerTempUser:", err);
    return sendResponse(res, "Signup failed", 500, false);
  }
};

exports.loginUserController = async (req, res) => {
  // console.log("loginUserController", req.body);
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    const isPasswordValid = user && await bcryptjs.compare(password, user.password);

    if (!user || !isPasswordValid) {
      return sendResponse(res, "Invalid email or password", 401, false);
    }

    // Success
    return sendResponse(
      res,
      "Login successful",
      200,
      true,
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
      }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return sendResponse(res, "Internal server error", 500, false);
  }
};

// get all users

exports.getAlluser = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password"); // <-- Capital 'U'
    res.status(200).json(users);
  } catch (err) {
    console.error("err in get all users", err);
    res.status(500).json({ message: "server error" });
  }
};
