// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const location = useLocation();
//   return (
//     <div className="flex flex-col gap-4">
//       <Link
//         className={`btn ${
//           location.pathname === "/addMarathon"
//             ? "bg-[#0078D4] text-white"
//             : "bg-[#0078D4] text-white"
//         }`}
//         to={"addMarathon"}
//       >
//         Add Marathon
//       </Link>
//       <Link
//         className={`btn ${
//           location.pathname === "/myMarathon"
//             ? "bg-[#0078D4] text-white"
//             : "bg-[#0078D4] text-white"
//         }`}
//         to={"myMarathon"}
//       >
//         My Marathon
//       </Link>
//       <Link
//         className={`btn ${
//           location.pathname === "/myApplylist"
//             ? "bg-[#0078D4] text-white"
//             : "bg-[#0078D4] text-white"
//         }`}
//         to={"myApplylist"}
//       >
//         My Apply List
//       </Link>
//     </div>
//   );
// };

// export default Sidebar;

import { Link, useLocation } from "react-router-dom";
import {
  FaPlusCircle,
  FaRunning,
  FaClipboardList,
  FaTachometerAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/dashboard", label: "Overview", icon: <FaTachometerAlt /> },
    {
      path: "/dashboard/addMarathon",
      label: "Add Marathon",
      icon: <FaPlusCircle />,
    },
    {
      path: "/dashboard/myMarathon",
      label: "My Marathon",
      icon: <FaRunning />,
    },
    {
      path: "/dashboard/myApplylist",
      label: "My Apply List",
      icon: <FaClipboardList />,
    },
  ];

  return (
    <nav className="space-y-4">
      {links.map(({ path, label, icon }) => (
        <Link
          key={path}
          to={path}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
            location.pathname === path
              ? "bg-[#0078D4] text-white shadow"
              : "text-gray-700 hover:bg-blue-100"
          }`}
        >
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Sidebar;
