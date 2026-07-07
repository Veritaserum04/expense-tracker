import prisma from "../config/prisma.js";

export const createExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const expense = await prisma.expense.create({
      data: {
        title,
        amount: parseFloat(amount),
        category,
        date: new Date(date),
        userId: req.user.userId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      expense,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    res.json({
      success: true,
      count: expenses.length,
      expenses,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;

    // Check if expense belongs to logged-in user
    const existingExpense = await prisma.expense.findFirst({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!existingExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const updatedExpense = await prisma.expense.update({
      where: {
        id,
      },
      data: {
        title,
        amount: parseFloat(amount),
        category,
        date: new Date(date),
      },
    });

    res.json({
      success: true,
      message: "Expense updated successfully",
      expense: updatedExpense,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Check ownership
    const expense = await prisma.expense.findFirst({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    await prisma.expense.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Expense deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};