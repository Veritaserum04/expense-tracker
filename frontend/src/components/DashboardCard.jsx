function DashboardCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-3xl font-bold text-emerald-600 mt-2">
        {value}
      </h2>
    </div>
  );
}

export default DashboardCard;