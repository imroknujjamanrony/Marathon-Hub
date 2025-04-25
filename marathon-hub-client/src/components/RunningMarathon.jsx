import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "./hook/useAxiosSecure";

const RunningMarathon = () => {
  const axiosSecure = useAxiosSecure();
  const [runningmarathons, setRunningmarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRunningMarathon = async () => {
      try {
        const response = await axiosSecure.get("/runningMarathon");
        setRunningmarathons(response.data);
      } catch (error) {
        Swal.fire("Error!", "Unable to fetch marathons.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchRunningMarathon();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 text-[#1C1C1C] dark:text-white">
      <h2 className="text-3xl py-4 font-bold mb-6 text-center text-[#c3c400] dark:text-teal-300">
        Available Marathons
      </h2>

      {runningmarathons.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No active marathons available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {runningmarathons.map((marathon) => (
            <div
              key={marathon._id}
              className="bg-white dark:bg-gray-800 text-[#333] dark:text-gray-200 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={marathon.image}
                alt={`Image of ${marathon.title}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-[#89ABE3] dark:text-teal-400">
                  {marathon.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold"> Description:</span>{" "}
                  {marathon.description}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold"> Location:</span>{" "}
                  {marathon.location}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Registration:</span>
                  {new Date(
                    marathon.startRegistration
                  ).toLocaleDateString()} -{" "}
                  {new Date(marathon.endRegistration).toLocaleDateString()}
                </p>
                <button
                  className="mt-4 px-4 py-2 rounded-lg bg-[#00509D] hover:bg-[#003f7d] text-white font-medium transition duration-300"
                  onClick={() => navigate(`/marathons/${marathon._id}`)}
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RunningMarathon;
