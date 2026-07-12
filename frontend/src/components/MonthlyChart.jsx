import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

function MonthlyChart({ expenses }) {

  // Month labels
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Initialize totals
  const monthlyTotals = new Array(12).fill(0);

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = date.getMonth();

    monthlyTotals[month] += Number(expense.amount);
  });

  const data = {
    labels: monthNames,

    datasets: [
      {
        label: "Expenses",

        data: monthlyTotals,

        fill: true,

        tension: 0.45,

        borderColor: "#10b981",

        backgroundColor: "rgba(16,185,129,0.15)",

        borderWidth: 4,

        pointRadius: 5,

        pointHoverRadius: 8,

        pointBackgroundColor: "#10b981",
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) => `₹${context.raw.toLocaleString()}`,
        },
      },
    },

    scales: {

      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          callback: (value) => `₹${value}`,
        },

        grid: {
          color: "#f1f5f9",
        },
      },

    },

  };

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            📈 Monthly Spending
          </h2>

          <p className="text-gray-500 mt-1">
            Based on current filters
          </p>

        </div>

      </div>

      <div className="h-[340px] mt-6">

        <Line
          data={data}
          options={options}
        />

      </div>

    </div>

  );

}

export default MonthlyChart;