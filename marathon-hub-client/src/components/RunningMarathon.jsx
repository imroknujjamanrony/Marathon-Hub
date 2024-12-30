import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "./hook/useAxiosSecure";

const RunningMarathon = () => {
  const axiosSecure = useAxiosSecure();
  const [runningmarathons, setRunningmarathons] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRunningMarathon = async () => {
      try {
        const response = await axiosSecure.get("/runningMarathon");
        setRunningmarathons(response.data);
      } catch (error) {
        Swal.fire("Error!", "Unable to fetch marathons.", error);
      }
    };
    fetchRunningMarathon();
  }, []);
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Available Marathons
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {runningmarathons.map((marathon) => (
          <div
            key={marathon._id}
            className="card bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={marathon.image}
              alt={marathon.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{marathon.title}</h3>
              <p className="text-gray-700">Location: {marathon.location}</p>
              <p className="text-gray-700">
                Registration:{" "}
                {new Date(marathon.startRegistration).toLocaleDateString()} -{" "}
                {new Date(marathon.endRegistration).toLocaleDateString()}
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => navigate(`/marathons/${marathon._id}`)}
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RunningMarathon;
