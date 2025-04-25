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

  const navLinkClass =
    "text-white dark:text-[#EA738D] font-medium hover:text-[#519B52] transition";

  return (
    <nav className="bg-[#89ABE3] dark:bg-[#6D394D] text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section - Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <label
              tabIndex={0}
              className="btn btn-sm bg-white text-[#6D394D] hover:bg-[#EA738D] hover:text-white transition"
            >
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
              className="dropdown-content mt-3 p-2 shadow bg-[#EA738D] text-white rounded-box w-52"
            >
              <li>
                <NavLink to="/marathons" className={navLinkClass}>
                  Marathons
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/myProfile" className={navLinkClass}>
                    Profile
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img className="w-10" src={logo} alt="Marathon Hub Logo" />
            <span className="text-xl font-bold text-white dark:text-[#EA738D]">
              Marathon Hub
            </span>
          </Link>
        </div>

        {/* Right Section - Links, Theme Toggle, and Auth */}
        <div className="flex items-center gap-4">
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-4">
            <NavLink to="/marathons" className={navLinkClass}>
              Marathons
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            {user && (
              <>
                <NavLink to="/myProfile" className={navLinkClass}>
                  Profile
                </NavLink>
                <NavLink to="/dashboard/addMarathon" className={navLinkClass}>
                  Add Marathon
                </NavLink>
                <NavLink to="/dashboard/myMarathon" className={navLinkClass}>
                  My Marathon
                </NavLink>
                <NavLink to="/dashboard/myApplylist" className={navLinkClass}>
                  My Applylist
                </NavLink>
              </>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white text-[#6D394D] hover:bg-[#EA738D] hover:text-white transition"
          >
            {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* User Profile & Authentication */}
          {user ? (
            <div className="flex items-center gap-2">
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName || "User"}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white text-[#6D394D] flex justify-center items-center font-bold">
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-1 border border-white text-white rounded hover:bg-white hover:text-[#EA738D] transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1 bg-[#EA738D] text-white rounded hover:bg-[#519B52] transition"
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
