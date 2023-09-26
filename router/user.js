import express from "express";
import {
  getUser,
  login,
  logout,
  register,
} from "../controllers/user-controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/all", isAuthenticated, getUser);
export default router;