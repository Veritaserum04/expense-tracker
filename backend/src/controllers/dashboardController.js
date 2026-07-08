import prisma from "../config/prisma.js";

export const getDashboard = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const totalTransactions = expenses.length;

    const highestExpense =
      totalTransactions > 0
        ? Math.max(...expenses.map((e) => e.amount))
        : 0;

    const averageExpense =
      totalTransactions > 0
        ? totalExpenses / totalTransactions
        : 0;

    // Category totals
    const categoryWise = {};

    expenses.forEach((expense) => {
      categoryWise[expense.category] =
        (categoryWise[expense.category] || 0) + expense.amount;
    });

    // Last 5 expenses
    const recentExpenses = expenses.slice(0, 5);

    res.json({
      success: true,
      summary: {
        totalExpenses,
        totalTransactions,
        highestExpense,
        averageExpense,
      },
      categoryWise,
      recentExpenses,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getMonthlyExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: req.user.userId,
      },
    });

    const monthlyData = {};

    expenses.forEach((expense) => {
      const month = expense.date.toLocaleString("default", {
        month: "long",
      });

      monthlyData[month] =
        (monthlyData[month] || 0) + expense.amount;
    });

    const result = Object.keys(monthlyData).map((month) => ({
      month,
      total: monthlyData[month],
    }));

    res.json({
      success: true,
      monthlyExpenses: result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};