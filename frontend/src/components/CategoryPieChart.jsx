import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function CategoryPieChart({ expenses }) {

  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }

    categoryTotals[expense.category] += Number(expense.amount);
  });

  const labels = Object.keys(categoryTotals);

  const values = Object.values(categoryTotals);

  const total = values.reduce((a, b) => a + b, 0);

  const data = {
    labels,

    datasets: [
      {
        data: values,

        backgroundColor: [
          "#10b981",
          "#3b82f6",
          "#f97316",
          "#8b5cf6",
          "#ec4899",
          "#06b6d4",
          "#f59e0b",
          "#ef4444",
          "#14b8a6",
        ],

        borderWidth: 3,
        borderColor: "#fff",

        hoverOffset: 15,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "78%",

    plugins: {

      legend: {

        position: "right",

        labels: {

          usePointStyle: true,

          pointStyle: "circle",

          padding: 18,

          font: {
            size: 13,
            weight: "600",
          },

        },

      },

      tooltip: {

        callbacks: {

          label: function (context) {

            return `${context.label}: ₹${context.raw}`;

          },

        },

      },

    },

  };

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6 h-full">

      <h2 className="text-2xl font-bold text-slate-800">
         Expense Breakdown
      </h2>

      <p className="text-gray-500 mt-2">
        Spending by category
      </p>

      {expenses.length === 0 ? (

        <div className="h-72 flex items-center justify-center text-gray-400">

          No expenses available

        </div>

      ) : (

        <>

          <div className="text-center mt-6">

            <p className="text-gray-500 text-sm">

              Total Spending

            </p>

            <h2 className="text-3xl font-bold text-emerald-600">

              ₹{total.toLocaleString()}

            </h2>

          </div>

          <div className="h-[260px] mt-6">

            <Doughnut
              data={data}
              options={options}
            />

          </div>

        </>

      )}

    </div>

  );

}

export default CategoryPieChart;