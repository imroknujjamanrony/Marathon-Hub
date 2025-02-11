import { Link, NavLink } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import UseAuth from "../context/UseAuth";
import Swal from "sweetalert2";
import logo from "../assets/marathon.png";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire("Logged Out!", "You have successfully logged out!", "success");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section - Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content mt-3 p-2 shadow bg-gray-200 rounded-box w-52"
            >
              <li>
                <NavLink to="/marathons">Marathons</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/myProfile">Profile</NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img className="w-10" src={logo} alt="Marathon Hub Logo" />
            <span className="text-xl font-bold">Marathon Hub</span>
          </Link>
        </div>

        {/* Right Section - Links, Theme Toggle, and Auth */}
        <div className="flex items-center gap-4">
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-4">
            <NavLink to="/marathons">Marathons</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            {user && (
              <>
                <NavLink to="/myProfile">Profile</NavLink>
                <NavLink to="/dashboard/addMarathon">Add Marathon</NavLink>
                <NavLink to="/dashboard/myMarathon">My Marathon</NavLink>
                <NavLink to="/dashboard/myApplylist">My Applylist</NavLink>
              </>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white transition"
          >
            {theme === "dark" ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>

          {/* User Profile & Authentication */}
          {user ? (
            <div className="flex items-center gap-2">
              {/* User Avatar */}
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName || "User"}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex justify-center items-center">
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-blue-600 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm bg-blue-600 text-white hover:bg-red-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
