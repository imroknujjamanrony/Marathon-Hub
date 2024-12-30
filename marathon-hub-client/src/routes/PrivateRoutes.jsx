import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/swiper/Loading";
import UseAuth from "../context/UseAuth";

// eslint-disable-next-line react/prop-types
const PrivateRoutes = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoutes;

//
// import { Navigate, useLocation } from "react-router-dom";
// import Loading from "../components/swiper/Loading";
// import UseAuth from "../context/UseAuth";
// import { useEffect, useState } from "react";
// import axiosInstance from "../components/axiosInstance";

// // eslint-disable-next-line react/prop-types
// const PrivateRoutes = ({ children }) => {
//   const { user, loading } = UseAuth();
//   const location = useLocation();
//   const [isVerified, setIsVerified] = useState(false);
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const response = await axiosInstance.get("/verify-token", {
//           params: { email: user?.email },
//         });
//         if (response.data.success) {
//           setIsVerified(true);
//         } else {
//           setIsVerified(false);
//         }
//       } catch (error) {
//         console.error("Token verification failed:", error);
//         setIsVerified(false);
//       } finally {
//         setChecking(false);
//       }
//     };

//     if (user) {
//       verifyUser();
//     } else {
//       setIsVerified(false);
//       setChecking(false);
//     }
//   }, [user]);

//   if (loading || checking) {
//     return <Loading />;
//   }

//   if (!user || !isVerified) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default PrivateRoutes;
