import { FaFileCsv } from "react-icons/fa";
import Papa from "papaparse";
import toast from "react-hot-toast";

function ExportCSVButton({ expenses }) {
  const handleExport = () => {
    if (expenses.length === 0) {
      toast.error("No expenses available to export.");
      return;
    }

    const csvData = expenses.map((expense) => ({
      Title: expense.title,
      Category: expense.category,
      Amount: expense.amount,
      Date: new Date(expense.date).toLocaleDateString(),
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "expenses.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg transition hover:scale-105"
    >
      <FaFileCsv />
      Export CSV
    </button>
  );
}

export default ExportCSVButton;