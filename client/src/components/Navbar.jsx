import { Link } from "react-router-dom";
import LogoImage from "../assets/images/logo.png";
const Navbar = () => {
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
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 border rounded bg-blue-600 hover:bg-blue-700 text-white"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
