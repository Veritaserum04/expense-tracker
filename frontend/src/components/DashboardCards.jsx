import DashboardCard from "./DashboardCard";

function DashboardCards({ summary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

      <DashboardCard
        title="Total Expenses"
        value={`₹${summary.totalExpenses.toLocaleString()}`}
      />

      <DashboardCard
        title="Transactions"
        value={summary.totalTransactions}
      />

      <DashboardCard
        title="Highest Expense"
        value={`₹${summary.highestExpense.toLocaleString()}`}
      />

      <DashboardCard
        title="Average Expense"
        value={`₹${summary.averageExpense.toLocaleString()}`}
      />

    </div>
  );
}

export default DashboardCards;