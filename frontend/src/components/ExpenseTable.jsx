import { FaEdit, FaTrash } from "react-icons/fa";

function ExpenseTable({ expenses, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800">
          Recent Expenses
        </h2>

        <span className="text-gray-500">
          {expenses.length} Expenses
        </span>
      </div>

      {expenses.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-12">

    <div className="text-6xl">
      💸
    </div>

    <h3 className="text-2xl font-bold mt-4 text-slate-800">
      No Expenses Yet
    </h3>

    <p className="text-gray-500 mt-2">
      Click the <span className="font-semibold text-emerald-600">Add Expense</span> button to create your first expense.
    </p>

  </div>


      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b text-gray-600">

                <th className="text-left py-4">Title</th>
                <th className="text-left">Category</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Date</th>
                <th className="text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {expenses.map((expense) => (

                <tr
                  key={expense.id}
                  className="border-b hover:bg-emerald-50 transition duration-300"
                >

                  <td className="py-4 font-medium">
                    {expense.title}
                  </td>

                  <td>{expense.category}</td>

                  <td className="font-semibold text-emerald-600">
                    ₹{expense.amount}
                  </td>

                  <td>
                    {new Date(expense.date).toLocaleDateString()}
                  </td>

                  <td>

                    <div className="flex justify-center gap-5">

                      <button
                        onClick={() => onEdit(expense)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <FaEdit size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(expense.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <FaTrash size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default ExpenseTable;