import axios from "axios";
import { useEffect } from "react";
import UseAuth from "../../context/UseAuth";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://marathon-hub-server-chi.vercel.app", // Base URL for your backend
  withCredentials: true, // Include credentials (cookies) with requests
});

const useAxiosSecure = () => {
  const { logOut } = UseAuth(); // Custom hook to handle logout
  const navigate = useNavigate();

  useEffect(() => {
    // Add an interceptor to handle responses
    axiosInstance.interceptors.response.use(
      (response) => {
        // If the response is successful, simply return it
        return response;
      },
      (error) => {
        // Check for error response status
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          console.log(
            "Token expired or unauthorized access detected. Logging out..."
          );

          logOut() // Log out the user
            .then(() => {
              console.log("Logged out successfully due to token expiration.");
              navigate("/login"); // Redirect to login page
            })
            .catch((err) => {
              console.error("Error during logout:", err);
            });
        } else {
          // Log other errors for debugging purposes
          console.error("An error occurred in Axios:", error);
        }

        // Reject the promise to propagate the error
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  // Return the customized Axios instance
  return axiosInstance;
};

export default useAxiosSecure;
