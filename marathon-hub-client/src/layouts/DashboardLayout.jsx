// import { Link, Outlet } from "react-router-dom";
// import { Helmet } from "react-helmet-async";

// const DashboardLayout = () => {
//   return (
//     <div className="grid grid-cols-12 w-11/12 mx-auto py-10 gap-8">
//       <Helmet>
//         <title>Dashboard</title>
//       </Helmet>
//       <aside className="col-span-3">
//         <div className="flex flex-col gap-4">
//           <Link className="btn btn-success" to={"addMarathon"}>
//             Add Marathon
//           </Link>
//           <Link className="btn btn-success" to={"myMarathon"}>
//             My Marathon
//           </Link>
//           <Link className="btn btn-success" to={"myApplylist"}>
//             My Apply List
//           </Link>
//         </div>
//       </aside>
//       <div className="col-span-9">
//         <Outlet></Outlet>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import { Link, Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="grid grid-cols-12 w-11/12 mx-auto py-10 gap-8 bg-gray-100">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <aside className="col-span-3 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col gap-4">
          <Link
            className={`btn ${
              location.pathname === "/addMarathon"
                ? "btn-primary"
                : "btn-success"
            }`}
            to={"addMarathon"}
          >
            Add Marathon
          </Link>
          <Link
            className={`btn ${
              location.pathname === "/myMarathon"
                ? "btn-primary"
                : "btn-success"
            }`}
            to={"myMarathon"}
          >
            My Marathon
          </Link>
          <Link
            className={`btn ${
              location.pathname === "/myApplylist"
                ? "btn-primary"
                : "btn-success"
            }`}
            to={"myApplylist"}
          >
            My Apply List
          </Link>
        </div>
      </aside>
      <div className="col-span-9 p-4 bg-white rounded-lg shadow-lg">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
