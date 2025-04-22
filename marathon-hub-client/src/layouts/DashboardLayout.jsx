import { Helmet } from "react-helmet-async";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
import { Outlet } from "react-router-dom";
import {
  AiOutlineAppstore,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";

const DashboardLayout = () => {
  const fakeStats = [
    { title: "Active Users", value: 24, icon: <AiOutlineAppstore size={24} /> },
    {
      title: "Active Marathons",
      value: 12,
      icon: <AiOutlineCheckCircle size={24} />,
    },
    {
      title: "Total Marathons",
      value: 5,
      icon: <AiOutlineClockCircle size={24} />,
    },
    { title: "Total Users", value: 145, icon: <AiOutlineUser size={24} /> },
  ];

  return (
    <div className="grid grid-cols-12 w-11/12 mx-auto py-10 gap-8 bg-gray-100">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <aside className="col-span-3 p-4 bg-white rounded-lg shadow-lg">
        <Sidebar />
      </aside>

      <main className="col-span-9 p-4 bg-white rounded-lg shadow-lg">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {fakeStats.map((stat, index) => (
            <div
              key={index}
              className="shadow-xl rounded-xl bg-white p-4 space-y-2"
            >
              <div className="flex items-center gap-3 text-gray-400">
                <span>{stat.icon}</span>
                <p className="text-sm font-medium">{stat.title}</p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-base md:text-lg lg:text-xl text-gray-500">
                  {stat.value}
                </h2>
                <FaArrowTrendUp className="text-green-500 text-xl" />
              </div>
            </div>
          ))}
        </div>

        <Chart />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
