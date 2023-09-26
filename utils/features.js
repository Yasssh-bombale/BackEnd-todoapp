import jwt from "jsonwebtoken";

export const sendCookie = (res, user, statusCode, msg) => {
  const token = jwt.sign({ _id: user._id }, "heyheyhey");

  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      msg,
    });
};
