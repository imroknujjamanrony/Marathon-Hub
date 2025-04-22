import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col gap-4">
      <Link
        className={`btn ${
          location.pathname === "/addMarathon"
            ? "bg-[#0078D4] text-white"
            : "bg-[#0078D4] text-white"
        }`}
        to={"addMarathon"}
      >
        Add Marathon
      </Link>
      <Link
        className={`btn ${
          location.pathname === "/myMarathon"
            ? "bg-[#0078D4] text-white"
            : "bg-[#0078D4] text-white"
        }`}
        to={"myMarathon"}
      >
        My Marathon
      </Link>
      <Link
        className={`btn ${
          location.pathname === "/myApplylist"
            ? "bg-[#0078D4] text-white"
            : "bg-[#0078D4] text-white"
        }`}
        to={"myApplylist"}
      >
        My Apply List
      </Link>
    </div>
  );
};

export default Sidebar;
