import { FaSearch, FaFolder } from "react-icons/fa";

function ExpenseFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">

      {/* Search */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>

      {/* Category */}
      <div className="relative">
        <FaFolder className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-56 pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          <option>All</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Entertainment</option>
          <option>Health</option>
          <option>Education</option>
          <option>Other</option>
        </select>
      </div>

      {/* From Date */}
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
      />

      {/* To Date */}
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
      />

    </div>
  );
}

export default ExpenseFilters;