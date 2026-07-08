import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import api from "../services/api";

import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import MonthlyChart from "../components/MonthlyChart";
import ExpenseTable from "../components/ExpenseTable";
import AddExpenseModal from "../components/AddExpenseModal";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch dashboard summary
  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSummary(response.data.summary);
    } catch (error) {
      console.error("Summary Error:", error);
    }
  };

  // Fetch monthly chart data
  const fetchMonthlyData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard/monthly", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMonthlyData(response.data.monthlyExpenses);
    } catch (error) {
      console.error("Monthly Error:", error);
    }
  };

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(response.data.expenses);
    } catch (error) {
      console.error("Expense Error:", error);
    }
  };

  // Refresh everything
  const refreshDashboard = () => {
    fetchSummary();
    fetchMonthlyData();
    fetchExpenses();
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <Navbar />

      <DashboardCards summary={summary} />

      <div className="flex justify-end mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl hover:bg-emerald-700 transition"
        >
          <FaPlus />
          Add Expense
        </button>
      </div>

      <div className="mt-8">
        <MonthlyChart data={monthlyData} />
      </div>

      <div className="mt-8">
        <ExpenseTable expenses={expenses} />
      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExpenseAdded={refreshDashboard}
      />

    </div>
  );
}

export default Dashboard;