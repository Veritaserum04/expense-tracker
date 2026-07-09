import { useEffect, useState } from "react";
import api from "../services/api";

function ExpenseModal({
  isOpen,
  onClose,
  onExpenseSaved,
  editingExpense,
}) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date.split("T")[0],
      });
    } else {
      setFormData({
        title: "",
        amount: "",
        category: "Food",
        date: "",
      });
    }
  }, [editingExpense, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (editingExpense) {
        await api.put(
          `/expenses/${editingExpense.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await api.post("/expenses", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      onExpenseSaved();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Failed to save expense");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-slate-800">
          {editingExpense ? "Edit Expense" : "Add Expense"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Lunch"
              required
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="250"
              required
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="Food">🍔 Food</option>
              <option value="Travel">✈️ Travel</option>
              <option value="Shopping">🛍️ Shopping</option>
              <option value="Bills">💡 Bills</option>
              <option value="Entertainment">🎬 Entertainment</option>
              <option value="Transport">🚕 Transport</option>
              <option value="Health">💊 Health</option>
              <option value="Education">📚 Education</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div className="flex gap-4 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border rounded-xl py-3 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3"
            >
              {editingExpense ? "Update Expense" : "Save Expense"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ExpenseModal;