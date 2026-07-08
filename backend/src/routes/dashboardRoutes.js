import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getDashboard,
  getMonthlyExpenses,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", authMiddleware, getDashboard);
router.get("/monthly", authMiddleware, getMonthlyExpenses);

export default router;