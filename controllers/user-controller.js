import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
export const getUser = (req, res) => {
  return res.json({
    success: true,
    msg: "all users fetched!",
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(404).json({
      success: false,
      msg: "User already exists !",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return res.status(201).json({
    success: true,
    msg: "User Registered Successfully !",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      msg: "User not exists !",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      success: false,
      msg: "invalid user or password !",
    });
  }
  sendCookie(res, user, 200, `welcome back dear ${user.name}`);
};

export const logout = (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      msg: "Log out successfully !",
    });
};
