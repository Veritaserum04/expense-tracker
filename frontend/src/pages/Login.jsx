import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", data);

      // Store JWT token
      localStorage.setItem("token", response.data.token);

      // Store logged-in user
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to dashboard
      toast.success("Welcome back!");

navigate("/dashboard");

    } catch (error) {
      toast.error(
  error.response?.data?.message || "Login failed."
);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-emerald-600">
          ExpenseFlow
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Welcome back 👋
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;