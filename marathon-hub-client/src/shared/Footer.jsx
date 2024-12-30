import { Link } from "react-router-dom";
import logo from "../assets/marathon.png";

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-10">
      {/* Left Section: Logo and Description */}
      <aside>
        <div className="flex items-center gap-2">
          <img src={logo} alt="" />
          <h2 className="text-2xl font-bold">Marathon Hub</h2>
        </div>
        <p className="mt-4">
          Organizing marathon events and connecting participants worldwide. Your
          ultimate platform for marathon management.
        </p>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} Marathon Hub. All Rights Reserved.
        </p>
      </aside>

      {/* Right Sections: Useful Links */}
      <nav>
        <h6 className="footer-title">Explore</h6>
        <Link to={"/marathons"} className="link link-hover">
          Upcoming Marathons
        </Link>
        <Link to={"/dashboard"} className="link link-hover">
          Dashboard
        </Link>
        <Link to={"/about"} className="link link-hover">
          About Us
        </Link>
        <Link to={"/contact"} className="link link-hover">
          Contact
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Support</h6>
        <Link to={"/help"} className="link link-hover">
          Help Center
        </Link>
        <Link to={"/faq"} className="link link-hover">
          FAQs
        </Link>
        <Link to={"/terms"} className="link link-hover">
          Terms of Service
        </Link>
        <Link to={"/privacy"} className="link link-hover">
          Privacy Policy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
