// // import { useState } from "react";
// // import { Outlet, useLocation, Link } from "react-router-dom";
// // import { Helmet } from "react-helmet-async";
// // import {
// //   AiOutlineMenu,
// //   AiOutlineClose,
// //   AiOutlinePlusCircle,
// //   AiOutlineAppstore,
// //   AiOutlineUnorderedList,
// //   AiOutlineBarChart,
// // } from "react-icons/ai";
// // import { FaChartLine } from "react-icons/fa";
// // import Chart from "../components/Chart";

// // const DashboardLayout = () => {
// //   const location = useLocation();
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

// //   const fakeStats = [
// //     { title: "Active Users", value: 24, icon: <AiOutlineAppstore size={24} /> },
// //     {
// //       title: "Active Marathons",
// //       value: 12,
// //       icon: <AiOutlinePlusCircle size={24} />,
// //     },
// //     {
// //       title: "Total Marathons",
// //       value: 5,
// //       icon: <AiOutlineBarChart size={24} />,
// //     },
// //     {
// //       title: "Total Users",
// //       value: 145,
// //       icon: <AiOutlineUnorderedList size={24} />,
// //     },
// //   ];

// //   const navItems = [
// //     {
// //       path: "/dashboard/addMarathon",
// //       icon: <AiOutlinePlusCircle size={22} />,
// //       label: "Add Marathon",
// //     },
// //     {
// //       path: "/dashboard/myMarathon",
// //       icon: <AiOutlineAppstore size={22} />,
// //       label: "My Marathon",
// //     },
// //     {
// //       path: "/dashboard/myApplylist",
// //       icon: <AiOutlineUnorderedList size={22} />,
// //       label: "My Apply List",
// //     },
// //   ];

// //   const isDashboardRoot = location.pathname === "/dashboard";

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <Helmet>
// //         <title>Dashboard</title>
// //       </Helmet>

// //       <div className="flex h-screen overflow-hidden">
// //         {/* Sidebar */}
// //         <div
// //           className={`$ {
// //             isSidebarOpen ? "w-64" : "w-16"
// //           } bg-white shadow-lg transition-all duration-300 h-full sticky top-0 z-20`}
// //         >
// //           <button
// //             className="absolute top-4 right-4 text-xl text-gray-600 hover:text-blue-600"
// //             onClick={toggleSidebar}
// //           >
// //             {isSidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
// //           </button>

// //           <nav className="mt-16 flex flex-col gap-2 px-2">
// //             {navItems.map(({ path, icon, label }) => (
// //               <Link
// //                 to={path}
// //                 key={label}
// //                 className={`flex items-center gap-3 p-3 rounded-md transition-colors text-sm ${
// //                   location.pathname === path
// //                     ? "bg-blue-600 text-white"
// //                     : "text-gray-700 hover:bg-gray-200"
// //                 }`}
// //                 title={!isSidebarOpen ? label : ""}
// //               >
// //                 {icon}
// //                 {isSidebarOpen && <span>{label}</span>}
// //               </Link>
// //             ))}
// //           </nav>
// //         </div>

// //         {/* Main Content */}
// //         <main className="flex-1 overflow-y-auto p-4">
// //           {isDashboardRoot && (
// //             <>
// //               {/* Overview Stats */}
// //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// //                 {fakeStats.map((stat, index) => (
// //                   <div
// //                     key={index}
// //                     className="shadow-xl rounded-xl bg-white p-4 space-y-2 h-full flex flex-col justify-between"
// //                   >
// //                     <div className="flex items-center gap-3 text-gray-400">
// //                       <span>{stat.icon}</span>
// //                       <p className="text-sm font-medium">{stat.title}</p>
// //                     </div>
// //                     <div className="flex items-center justify-between mt-auto">
// //                       <h2 className="text-lg text-gray-700 font-semibold">
// //                         {stat.value}
// //                       </h2>
// //                       <FaChartLine className="text-green-500 text-xl" />
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //               <div className="max-w-full overflow-x-auto">
// //                 <Chart />
// //               </div>
// //             </>
// //           )}

// //           {/* Page-specific content */}
// //           <Outlet />
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardLayout;

// import { Outlet, Link, useLocation } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import {
//   FaPlus,
//   FaRegListAlt,
//   FaClipboardList,
//   FaChartPie,
//   FaBars,
// } from "react-icons/fa";
// import { useState } from "react";

// const DashboardLayout = () => {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinks = [
//     {
//       name: "Add Marathon",
//       path: "/dashboard/addMarathon",
//       icon: <FaPlus />,
//     },
//     {
//       name: "My Marathon",
//       path: "/dashboard/myMarathon",
//       icon: <FaRegListAlt />,
//     },
//     {
//       name: "My Apply List",
//       path: "/dashboard/myApplylist",
//       icon: <FaClipboardList />,
//     },
//   ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col">
//       <Helmet>
//         <title>Dashboard</title>
//       </Helmet>

//       {/* Topbar for mobile */}
//       <div className="md:hidden p-4 bg-white flex justify-between items-center shadow-md">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="text-2xl text-blue-600"
//         >
//           <FaBars />
//         </button>
//         <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
//       </div>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <div
//           className={`${
//             isOpen ? "block" : "hidden"
//           } md:block bg-white w-64 p-4 shadow-md md:relative fixed z-40 h-full overflow-y-auto transition-all duration-300`}
//         >
//           <h2 className="text-xl font-bold text-blue-600 mb-6 hidden md:block">
//             Marathon Hub
//           </h2>
//           <div className="flex flex-col gap-2">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 onClick={() => setIsOpen(false)}
//                 className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
//                   isActive(link.path)
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-700 hover:bg-blue-100"
//                 }`}
//               >
//                 <span className="text-lg">{link.icon}</span>
//                 <span className="hidden md:inline">{link.name}</span>
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="flex-1 overflow-y-auto p-4 md:ml-64">
//           {/* Overview content when route is just /dashboard */}
//           {location.pathname === "/dashboard" && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//               {[
//                 { title: "Active Users", value: 24 },
//                 { title: "Active Marathons", value: 12 },
//                 { title: "Total Marathons", value: 5 },
//                 { title: "Total Users", value: 145 },
//               ].map((stat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-5 rounded-lg shadow-md flex flex-col justify-center items-start"
//                 >
//                   <p className="text-gray-500 text-sm">{stat.title}</p>
//                   <h3 className="text-xl font-bold text-gray-800">
//                     {stat.value}
//                   </h3>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Outlet for routed pages */}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  AiOutlineMenu,
  AiOutlinePlusCircle,
  AiOutlineUnorderedList,
  AiOutlineCheckCircle,
  AiOutlineAppstore,
  AiOutlineUser,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Chart from "../components/Chart";

const SidebarLinks = [
  {
    name: "Add Marathon",
    path: "/dashboard/addMarathon",
    icon: <AiOutlinePlusCircle size={20} />,
  },
  {
    name: "My Marathon",
    path: "/dashboard/myMarathon",
    icon: <AiOutlineUnorderedList size={20} />,
  },
  {
    name: "My Apply List",
    path: "/dashboard/myApplylist",
    icon: <AiOutlineCheckCircle size={20} />,
  },
];

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

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isOverview = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen flex bg-gray-100 overflow-hidden">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {/* Sidebar */}
      <div
        className={`$ {
          isOpen ? "w-64" : "w-16"
        } duration-300 bg-white shadow-lg h-screen fixed z-10 top-0 left-0 p-4 flex flex-col justify-between`}
      >
        <div>
          <button
            className="mb-6 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AiOutlineMenu size={24} />
          </button>
          <nav className="flex flex-col gap-4">
            {SidebarLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 transition-all text-sm font-medium text-gray-700 ${
                  location.pathname === link.path && "bg-blue-500 text-white"
                }`}
              >
                {link.icon}
                {isOpen && <span>{link.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="ml-16 md:ml-64 flex-1 p-6 overflow-x-hidden overflow-y-auto">
        {isOverview && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {fakeStats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white shadow-md p-4 rounded-xl space-y-2"
                >
                  <div className="flex items-center gap-3 text-gray-400">
                    {stat.icon}
                    <p className="text-sm font-medium">{stat.title}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl text-gray-700 font-semibold">
                      {stat.value}
                    </h2>
                    <FaArrowTrendUp className="text-green-500 text-xl" />
                  </div>
                </div>
              ))}
            </div>
            <Chart />
          </div>
        )}
        {!isOverview && <Outlet />}
      </main>
    </div>
  );
};

export default DashboardLayout;
