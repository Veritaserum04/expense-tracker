function ExpenseTable({ expenses }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-10">

      <h2 className="text-2xl font-bold mb-5">
        Recent Expenses
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">
              Title
            </th>

            <th className="text-left">
              Category
            </th>

            <th className="text-left">
              Amount
            </th>

            <th className="text-left">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {expenses.map((expense) => (

            <tr
              key={expense.id}
              className="border-b hover:bg-slate-50"
            >

              <td className="py-3">
                {expense.title}
              </td>

              <td>
                {expense.category}
              </td>

              <td>
                ₹{expense.amount}
              </td>

              <td>
                {new Date(expense.date).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ExpenseTable;