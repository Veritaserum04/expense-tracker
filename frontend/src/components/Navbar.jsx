import LogoutButton from "./LogoutButton";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex justify-between items-center mb-10">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Expense Tracker
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back,
          <span className="text-emerald-600 font-semibold">
            {" "}
            {user?.name || "User"} 👋
          </span>
        </p>
      </div>

      <LogoutButton />

    </div>
  );
}

export default Navbar;