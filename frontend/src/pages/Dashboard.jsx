import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../services/api";
import ExportCSVButton from "../components/ExportCSVButton";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import ExpenseFilters from "../components/ExpenseFilters";
import MonthlyChart from "../components/MonthlyChart";
import ExpenseTable from "../components/ExpenseTable";
import CategoryPieChart from "../components/CategoryPieChart";
import ExpenseModal from "../components/ExpenseModal";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
      const response = await api.get("/dashboard/monthly", getHeaders());
      setMonthlyData(response.data.monthlyExpenses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses", getHeaders());
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

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch = expense.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        expense.category === selectedCategory;

      const expenseDate = new Date(expense.date);

      const matchesFrom =
        !fromDate || expenseDate >= new Date(fromDate);

      const matchesTo =
        !toDate || expenseDate <= new Date(toDate);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [
    expenses,
    searchTerm,
    selectedCategory,
    fromDate,
    toDate,
  ]);

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

      toast.success("Expense deleted successfully!");

      refreshDashboard();

    } catch (error) {
      console.error(error);
      toast.error("Failed to delete expense.");
    }
  };

  const handleCloseModal = () => {
    setEditingExpense(null);
    setIsModalOpen(false);
  };

  if (!summary) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50 flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-lg text-gray-600">
            Loading Dashboard...
          </p>

        </div>

      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50 px-4 py-6 md:px-8 lg:px-10">
      <Navbar />

      <DashboardCards summary={summary} />

<div className="mt-8 flex flex-wrap items-center justify-between gap-6">

  <ExpenseFilters
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    selectedCategory={selectedCategory}
    setSelectedCategory={setSelectedCategory}
    fromDate={fromDate}
    setFromDate={setFromDate}
    toDate={toDate}
    setToDate={setToDate}
  />

  <div className="flex flex-wrap gap-4">

    <ExportCSVButton
      expenses={filteredExpenses}
    />

    <button
      onClick={handleAddExpense}
      className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg transition hover:scale-105"
    >
      <FaPlus />
      Add Expense
    </button>

  </div>

</div>
<div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-6">

  <div className="xl:col-span-8">
    <MonthlyChart expenses={filteredExpenses} />
  </div>

  <div className="xl:col-span-4">
    <CategoryPieChart expenses={filteredExpenses} />
  </div>

</div>
<div className="mt-10">
  <ExpenseTable
    expenses={filteredExpenses}
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