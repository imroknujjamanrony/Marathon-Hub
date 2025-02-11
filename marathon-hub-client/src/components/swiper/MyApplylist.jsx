import { useState, useEffect } from "react";
import UseAuth from "../../context/UseAuth";
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import React Icons for Edit and Delete
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hook/useAxiosSecure";
import Loading from "./Loading";

const MyApplyList = () => {
  const [loading, setLoading] = useState(true);
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure(); // Use the custom Axios instance
  const [registrations, setRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocationFilter, setIsLocationFilter] = useState(false);

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get(
          `/registrations/by-email?email=${user.email}&${
            isLocationFilter ? "location" : "search"
          }=${searchQuery}`
        );
        setRegistrations(response.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) {
      fetchRegistrations();
    }
  }, [user?.email, searchQuery, isLocationFilter, axiosSecure]);
  if (loading) {
    return <Loading></Loading>;
  }

  const handleUpdate = (registration) => {
    setSelectedRegistration(registration);
    setUpdateData(registration);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/registrations/${id}`);
          setRegistrations(
            registrations.filter((registration) => registration._id !== id)
          );
          Swal.fire(
            "Deleted!",
            "Your registration has been deleted.",
            "success"
          );
        } catch (error) {
          console.error("Error deleting registration:", error);
        }
      }
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      await axiosSecure.put(
        `/registrations/${selectedRegistration._id}`,
        updateData
      );
      setIsModalOpen(false);
      setRegistrations(
        registrations.map((registration) =>
          registration._id === selectedRegistration._id
            ? { ...registration, ...updateData }
            : registration
        )
      );
    } catch (error) {
      console.error("Error updating registration:", error);
    }
  };

  const handleFilterToggle = () => {
    setIsLocationFilter(!isLocationFilter);
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>My Apply List</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-6">My Apply List</h1>

      <div className="flex justify-between py-3">
        <div className="mt-2 flex gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search by marathon title or location"
            className="input input-bordered w-full pr-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn bg-[#0078D4] text-white"
            onClick={handleFilterToggle}
          >
            {isLocationFilter ? "Filter by Title" : "Filter by Location"}
          </button>
        </div>
      </div>

      {registrations.length > 0 ? (
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="px-4 py-2 border border-gray-300">
                  Marathon Title
                </th>
                <th className="px-4 py-2 border border-gray-300">Start Date</th>
                <th className="px-4 py-2 border border-gray-300">First Name</th>
                <th className="px-4 py-2 border border-gray-300">Last Name</th>
                <th className="px-4 py-2 border border-gray-300">User Phone</th>
                <th className="px-4 py-2 border border-gray-300">Location</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration, index) => (
                <tr
                  key={registration._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="px-4 py-2 border border-gray-300">
                    {registration.marathonTitle}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(registration.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {registration.firstName}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {registration.lastName}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {registration.contactNumber}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {registration.additionalInfo}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      onClick={() => handleUpdate(registration)}
                      className="btn btn-sm bg-blue-500 text-white rounded mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(registration._id)}
                      className="btn btn-sm bg-red-500 text-white rounded"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No registrations found.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Update Registration</h2>
            <label className="block mb-2">
              Marathon Title:
              <input
                type="text"
                value={updateData.marathonTitle}
                readOnly
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </label>
            <label className="block mb-2">
              Start Date:
              <input
                type="text"
                value={new Date(updateData.startDate).toLocaleDateString()}
                readOnly
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </label>
            <label className="block mb-2">
              First Name:
              <input
                type="text"
                value={updateData.firstName || ""}
                onChange={(e) =>
                  setUpdateData({ ...updateData, firstName: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </label>
            <label className="block mb-2">
              Last Name:
              <input
                type="text"
                value={updateData.lastName || ""}
                onChange={(e) =>
                  setUpdateData({ ...updateData, lastName: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </label>
            <label className="block mb-2">
              User Phone:
              <input
                type="text"
                value={updateData.contactNumber || ""}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    contactNumber: e.target.value,
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </label>
            <label className="block mb-4">
              Location:
              <input
                type="text"
                value={updateData.additionalInfo || ""}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    additionalInfo: e.target.value,
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </label>
            <div className="flex justify-end">
              <button
                onClick={handleUpdateSubmit}
                className="btn btn-success text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-secondary text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplyList;
