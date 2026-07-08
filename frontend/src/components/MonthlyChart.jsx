import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function MonthlyChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.month),

    datasets: [
      {
        label: "Monthly Expenses",

        data: data.map((item) => item.total),

        borderColor: "#10B981",

        backgroundColor: "#A7F3D0",

        tension: 0.4,

        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-5">
        Monthly Expenses
      </h2>

      <Line data={chartData} />

    </div>
  );
}

export default MonthlyChart;