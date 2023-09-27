import { User } from "../models/user.js";
import * as bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // we wrote this code '.select("+password")' so as to get password with whatever it is returning
    const user = await User.findOne({ email }).select("+password");

    // check if user exists
    if (!user) return next(new ErrorHandler("Invalid email or password", 400));

    // check if password hashes match
    const isMatch = await bcrypt.compare(password, user.password);

    // if password doesn't match send this json
    if (!isMatch)
      return next(new ErrorHandler("Invalid email or password", 400));

    // if password matches, then set cookies
    sendCookie(user, res, `Welcome back, ${user.name}`);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler("User already exists!", 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    // set cookies
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
      });
  } catch (error) {
    next(error);
  }
};
