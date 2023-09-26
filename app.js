import express from "express";
import { mongoConnection } from "./data/database.js";
import userRouter from "./router/user.js";
import { User } from "./models/user.js";
import cookieParser from "cookie-parser";
const app = express();

mongoConnection();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.get("/", (req, res) => {
  return res.send("hey there !");
});
app.listen(8000, () => {
  console.log(`Successfully conncted to sever !`);
});
