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

function MonthlyChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.month),

    datasets: [
      {
        label: "Monthly Expenses",

        data: data.map((item) => item.total),

        borderColor: "#10b981",

        backgroundColor: "rgba(16,185,129,0.15)",

        fill: true,

        tension: 0.45,

        pointRadius: 5,

        pointHoverRadius: 8,

        pointBackgroundColor: "#10b981",

        borderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        grid: {
          color: "#f1f5f9",
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-slate-800">
        📈 Monthly Spending
      </h2>

      <p className="text-gray-500 mt-2 mb-8">
        Track your monthly expenses over time.
      </p>

      <Line
        data={chartData}
        options={options}
      />

    </div>
  );
}

export default MonthlyChart;