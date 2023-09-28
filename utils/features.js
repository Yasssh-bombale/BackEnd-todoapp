import jwt from "jsonwebtoken";

export const sendCookie = (res, user, statusCode, msg) => {
  const token = jwt.sign({ _id: user._id }, "heyheyhey");

  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      msg,
    });
};
