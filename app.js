import express from "express";

import userRouter from "./router/user.js";
import taskRouter from "./router/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import { config } from "dotenv";
import cors from "cors";

export const app = express();

config({ path: "./data/config.env" });

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // ! credentials must be true ortherwise cookies will not be accessed by frontEnd;
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);
app.get("/", (req, res) => {
  return res.send("hey there !");
});

// Using error middleware ;
app.use(errorMiddleware);
