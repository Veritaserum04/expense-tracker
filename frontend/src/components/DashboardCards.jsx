import DashboardCard from "./DashboardCard";

function DashboardCards({ summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <DashboardCard
        title="Total Expenses"
        value={`₹${summary.totalExpenses}`}
      />

      <DashboardCard
        title="Transactions"
        value={summary.totalTransactions}
      />

      <DashboardCard
        title="Highest Expense"
        value={`₹${summary.highestExpense}`}
      />

      <DashboardCard
        title="Average Expense"
        value={`₹${summary.averageExpense}`}
      />

    </div>
  );
}

export default DashboardCards;