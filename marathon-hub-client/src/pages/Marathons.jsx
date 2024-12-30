import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import useAxiosSecure from "../components/hook/useAxiosSecure";

const Marathons = () => {
  const [marathons, setMarathons] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // Default sortOrder
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch marathons data
  useEffect(() => {
    const fetchMarathons = async () => {
      try {
        const response = await axiosSecure.get(
          `/allMarathons?sortOrder=${sortOrder}`
        );
        setMarathons(response.data);
      } catch (error) {
        Swal.fire("Error!", "Unable to fetch marathons.", error.message);
      }
    };

    fetchMarathons();
  }, [sortOrder]); // Re-fetch when sortOrder changes

  // Toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="p-8">
      <Helmet>
        <title>Available Marathons</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center">
        Available Marathons
      </h2>
      <div className="flex justify-end mb-4">
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={toggleSortOrder}
        >
          {sortOrder === "asc" ? (
            <>
              <FaSortAmountUp /> Sort: Oldest First
            </>
          ) : (
            <>
              <FaSortAmountDown /> Sort: Newest First
            </>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marathons.map((marathon) => (
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

export default Marathons;
