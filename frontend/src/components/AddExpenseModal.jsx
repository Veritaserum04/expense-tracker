import { useState } from "react";
import api from "../services/api";

function AddExpenseModal({ isOpen, onClose, onExpenseAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/expenses", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        title: "",
        amount: "",
        category: "Food",
        date: "",
      });

      onExpenseAdded();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Failed to add expense");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6">
          Add Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Transport</option>
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <div className="flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-xl py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-emerald-600 text-white rounded-xl py-3"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddExpenseModal;