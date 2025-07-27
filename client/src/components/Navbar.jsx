import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import LogoImage from "../assets/images/logo.png";
const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-900">
      <Link
        to="/"
        className="flex items-center text-2xl font-bold text-gray-800 dark:text-white"
      >
        <div className="w-10 me-2.5">
          <img src={LogoImage} alt="" />
        </div>
        <div className="font-pop text-center">TaskNest</div>
      </Link>
      {isAuthenticated ? (
        <div>
          <Link
            to="/dashboard"
            className="text-black bg-white hover:bg-gray-950 hover:text-white font-semibold py-2 px-6 rounded-full transition duration-300 me-4"
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard"
            onClick={() => logout()}
            className="text-black bg-white hover:bg-gray-950 hover:text-white font-semibold py-2 px-6 rounded-full transition duration-300"
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 font-semibold rounded text-black bg-white hover:bg-gray-950 hover:text-white transition duration-400"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 font-semibold rounded text-black bg-white hover:bg-gray-950 hover:text-white transition duration-400"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
