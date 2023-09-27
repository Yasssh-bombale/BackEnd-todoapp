import express from "express";

import userRouter from "./router/user.js";

import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.get("/", (req, res) => {
  return res.send("hey there !");
});

// Using error middleware ;
app.use(errorMiddleware);
