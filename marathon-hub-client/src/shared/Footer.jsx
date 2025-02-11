import { Link } from "react-router-dom";
import logo from "../assets/marathon.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
        {/* Left Section: Logo and Description */}
        <aside className="text-center md:text-left flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Marathon Hub" className="w-12 h-12" />
            <h2 className="text-2xl font-bold text-white">Marathon Hub</h2>
          </div>
          <p className="mt-4 max-w-md">
            Organizing marathon events and connecting participants worldwide.
            Your ultimate platform for marathon management.
          </p>
          <p className="mt-2 text-sm">
            &copy; {new Date().getFullYear()} Marathon Hub. All Rights Reserved.
          </p>
        </aside>

        {/* Right Section: Useful Links */}
        <nav className="text-center md:text-left">
          <h6 className="text-lg font-semibold text-white mb-3">Explore</h6>
          <ul className="space-y-2">
            <li>
              <Link
                to="/marathons"
                className="hover:text-blue-400 transition duration-200"
              >
                Marathons
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-blue-400 transition duration-200"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-blue-400 transition duration-200"
              >
                About Us
              </a>
            </li>
            {/* <li>
              <Link
                to="/contact"
                className="hover:text-blue-400 transition duration-200"
              >
                Contact
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
