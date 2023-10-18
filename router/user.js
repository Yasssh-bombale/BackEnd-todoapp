import express from "express";
import {
  getAllUser,
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/user-controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/all", isAuthenticated, getAllUser);
router.get("/me", isAuthenticated, getMyProfile);

export default router;
