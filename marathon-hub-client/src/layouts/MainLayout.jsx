import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

const MainLayout = () => {
  return (
    <div className=" min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ">
      <Navbar></Navbar>

      <main>
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
