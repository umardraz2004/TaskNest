import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import LogoImage from "../assets/images/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md w-full">
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-gray-800 dark:text-white"
          onClick={closeMenu}
        >
          <div className="w-10 me-2.5">
            <img src={LogoImage} alt="Logo" />
          </div>
          <span className="font-pop">TaskNest</span>
        </Link>

        {/* Hamburger icon */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-white focus:outline-none text-xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-4 items-center">
          {isAuthenticated && user ? (
            <>
              <Link
                to="/dashboard"
                className="text-black dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-950 hover:text-white font-semibold py-2 px-6 rounded-full transition duration-300 font-pop"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-black dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-950 hover:text-white font-semibold py-2 px-6 rounded-full transition duration-300 font-pop"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 font-semibold rounded text-black dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-950 hover:text-white transition duration-300 font-pop"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 font-semibold rounded text-black dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-950 hover:text-white transition duration-300 font-pop"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden px-6 pb-4 flex flex-col gap-4 bg-white dark:bg-gray-900 shadow-md overflow-hidden"
          >
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="text-black dark:text-white font-semibold py-2 px-4 rounded font-pop hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="text-black dark:text-white font-semibold py-2 px-4 rounded font-pop hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="font-pop py-2 px-4 rounded text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="font-pop py-2 px-4 rounded text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
