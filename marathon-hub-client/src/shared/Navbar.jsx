//after added tooltip
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../context/UseAuth";
import Swal from "sweetalert2";
import logo from ".././assets/marathon.png";

const Navbar = () => {
  const { user, logOut } = UseAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire("Logged Out!", "You have successfully logged out!", "success");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  return (
    <nav className="bg-[#F8F9FA] bg-opacity-90 text-[#212529] p-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo and Dropdown */}
        <div className="flex items-center gap-4">
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
              className="dropdown-content mt-3 p-2 shadow bg-gray-700 rounded-box w-52"
            >
              <li>
                <NavLink to="/marathons" className="hover:text-gray-300">
                  Marathons
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className="hover:text-gray-300">
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Logo and Title */}
          <Link to="/" className="flex items-center gap-2">
            <img className="w-10" src={logo} alt="Marathon Hub Logo" />
            <span className="text-xl font-bold">Marathon Hub</span>
          </Link>
        </div>

        {/* Right: User Info */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex gap-4">
            <NavLink to="/marathons" className="hover:text-gray-300">
              Marathons
            </NavLink>
            <NavLink to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              {/* User Avatar with Tooltip */}
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
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-[#0078D4] btn-outline text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm bg-[#0078D4] btn-outline text-white hover:bg-red-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm bg-[#0078D4] btn-outline text-white hover:bg-red-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
