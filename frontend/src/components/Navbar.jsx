import LogoutButton from "./LogoutButton";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">

      <div>

        <h1 className="text-5xl font-black text-slate-800">
          💰 Expense Tracker
        </h1>

        <p className="text-gray-500 text-lg mt-2">
          Manage your finances smarter,
          <span className="font-bold text-emerald-600">
            {" "}
            {user?.name}
          </span>
          👋
        </p>

      </div>

      <LogoutButton />

    </div>
  );
}

export default Navbar;