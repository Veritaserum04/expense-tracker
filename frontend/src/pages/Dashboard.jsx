import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import api from "../services/api";

import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import MonthlyChart from "../components/MonthlyChart";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseModal from "../components/ExpenseModal";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    refreshDashboard();
  }, []);

  const getHeaders = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const fetchSummary = async () => {
    try {
      const response = await api.get("/dashboard", getHeaders());
      setSummary(response.data.summary);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const response = await api.get(
        "/dashboard/monthly",
        getHeaders()
      );

      setMonthlyData(response.data.monthlyExpenses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await api.get(
        "/expenses",
        getHeaders()
      );

      setExpenses(response.data.expenses);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshDashboard = () => {
    fetchSummary();
    fetchMonthlyData();
    fetchExpenses();
  };

  const handleAddExpense = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };
  const handleDeleteExpense = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this expense?"
  );

  if (!confirmed) return;

  try {
    await api.delete(`/expenses/${id}`, getHeaders());

    refreshDashboard();

  } catch (error) {
    console.error(error);
    alert("Failed to delete expense");
  }
};
  const handleCloseModal = () => {
    setEditingExpense(null);
    setIsModalOpen(false);
  };

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-lg">
            Loading Dashboard...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <Navbar />

      <DashboardCards summary={summary} />

      <div className="flex justify-end mt-8">

        <button
          onClick={handleAddExpense}
          className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
        >
          <FaPlus />
          Add Expense
        </button>

      </div>

      <div className="mt-8">
        <MonthlyChart data={monthlyData} />
      </div>

      <div className="mt-8">

        <ExpenseTable
  expenses={expenses}
  onEdit={handleEditExpense}
  onDelete={handleDeleteExpense}
/>

      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onExpenseSaved={refreshDashboard}
        editingExpense={editingExpense}
      />

    </div>
  );
}

export default Dashboard;