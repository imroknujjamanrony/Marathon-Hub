import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

const MainLayout = () => {
  return (
    <div className="  ">
      <Navbar></Navbar>

      <main>
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
