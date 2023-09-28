import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      msg: "Log in first !",
    });
  }
  const decode = jwt.verify(token, "heyheyhey");
  req.user = await User.findById(decode._id);
  next();
};
