import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../utils/Schema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { showToast } from '../utils/toast'
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${baseURL}/api/auth/login`, data);
      const { token, user } = res.data;

      loginUser(token, user);

      navigate("/dashboard");
      showToast("Login successful", "success");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-[38.8rem] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white font-pop">
          Login
        </h2>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Enter your password"
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
          <span
            onClick={togglePassword}
            className="absolute right-3 pt-3.5 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-600 text-white py-2 rounded transition duration-300 cursor-pointer font-roboto"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
