import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Expense Tracker API is running 🚀",
  });
});

export default app;