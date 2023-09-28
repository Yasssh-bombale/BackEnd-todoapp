import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import errorHandler from "../middlewares/error.js";
export const getUser = (req, res) => {
  return res.json({
    success: true,
    msg: "all users fetched!",
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return next(new errorHandler("User already exists", 404, false));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return next(new errorHandler("user registered successfully", 201, true));
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new errorHandler("User not exists !", 404, false));
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new errorHandler("Invalid user or password !", 404, false));
    }
    sendCookie(res, user, 200, `welcome back dear ${user.name}`);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      msg: "Log out successfully !",
    });
};

export const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find({});
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
