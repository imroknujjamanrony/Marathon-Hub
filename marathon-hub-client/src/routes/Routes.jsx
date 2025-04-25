import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import LogIn from "../pages/LogIn";
import DashboardLayout from "../layouts/DashboardLayout";
import AddMarathon from "../components/swiper/AddMarathon";
import MyMarathon from "../components/swiper/MyMarathon";
import MyApplylist from "../components/swiper/MyApplylist";
import Marathons from "../pages/Marathons";
import PrivateRoutes from "./PrivateRoutes";
import MarathonDetails from "../components/MarathonDetails";
import Registration from "../components/Registration";
import Error from "../components/Error";
import MyProfile from "../pages/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "myProfile",
        element: (
          <PrivateRoutes>
            <MyProfile></MyProfile>
          </PrivateRoutes>
        ),
      },

      {
        path: "/marathons",
        element: (
          <PrivateRoutes>
            <Marathons></Marathons>
          </PrivateRoutes>
        ),
      },
      {
        path: "/marathons/:id",
        element: (
          <PrivateRoutes>
            <MarathonDetails></MarathonDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "/registration/:id",
        element: (
          <PrivateRoutes>
            <Registration></Registration>
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <DashboardLayout></DashboardLayout>
          </PrivateRoutes>
        ),
        children: [
          {
            index: true, // ✅ Default overview
            element: <div></div>, // Optional empty, since overview is in layout
          },
          {
            path: "addMarathon",
            element: <AddMarathon></AddMarathon>,
          },
          {
            path: "myMarathon",
            element: <MyMarathon></MyMarathon>,
          },
          {
            path: "myApplylist",
            element: <MyApplylist></MyApplylist>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

export default router;
