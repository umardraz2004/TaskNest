import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegistrationSchema } from "../utils/Schema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import EmailSendingModal from "../components/EmailSendingModal";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("Sending you mail...");
  const [showSpin, setShowSpin] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegistrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      setSending(true);
      const res = await axios.post(`${baseURL}/api/auth/register`, data);
      if (res.status === 200) {
        setMessage("Email sent successful! Please check your email.");
        setShowSpin(false);
        setTimeout(() => {
          setSending(false);
        }, 5000);
      }
    } catch (err) {
      console.error("Registration failed", err.response?.data || err.message);
      setSending(false);
      setShowSpin(false);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-[38.8rem] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white font-pop">
          Register
        </h2>

        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName")}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

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

        {/* Password */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 pt-3.5 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 pt-3.5 cursor-pointer text-gray-500"
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-600 text-white py-2 rounded transition duration-300 cursor-pointer font-roboto"
        >
          Register
        </button>
      </form>
      <EmailSendingModal open={sending} text={message} showSpin={showSpin} />
    </div>
  );
};

export default Registration;
