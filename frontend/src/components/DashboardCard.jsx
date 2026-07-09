import {
  FaWallet,
  FaMoneyBillWave,
  FaArrowTrendUp,
  FaChartLine,
} from "react-icons/fa6";

const icons = {
  "Total Expenses": <FaWallet size={26} />,
  Transactions: <FaMoneyBillWave size={26} />,
  "Highest Expense": <FaArrowTrendUp size={26} />,
  "Average Expense": <FaChartLine size={26} />,
};

const colors = {
  "Total Expenses": "from-emerald-500 to-emerald-600",
  Transactions: "from-blue-500 to-blue-600",
  "Highest Expense": "from-orange-500 to-red-500",
  "Average Expense": "from-violet-500 to-purple-600",
};

function DashboardCard({ title, value }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-lg
        hover:shadow-2xl
        transition-all
        duration-300
        hover:-translate-y-2
        overflow-hidden
      "
    >
      {/* Top Gradient */}
      <div className={`h-2 bg-gradient-to-r ${colors[title]}`}></div>

      <div className="p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm font-medium">
              {title}
            </p>

            <h2 className="text-4xl font-black text-slate-800 mt-3">
              {value}
            </h2>

          </div>

          <div
            className={`
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-r
              ${colors[title]}
              flex
              items-center
              justify-center
              text-white
              shadow-lg
            `}
          >
            {icons[title]}
          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardCard;