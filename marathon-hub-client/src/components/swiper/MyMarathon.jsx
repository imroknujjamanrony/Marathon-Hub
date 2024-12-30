import { useEffect, useState } from "react";
import axios from "axios";
import UseAuth from "../../context/UseAuth";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const MyMarathon = () => {
  const axiosSecure = useAxiosSecure();
  const [marathons, setMarathons] = useState([]);
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const { user } = UseAuth();
  const [updateData, setUpdateData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMarathons = async () => {
      try {
        const response = await axiosSecure.get(
          `/marathons/by-email?email=${user.email}`
        );
        setMarathons(response.data);
      } catch (error) {
        console.error("Error fetching marathons:", error);
      }
    };
    if (user?.email) {
      fetchMarathons();
    }
  }, [user?.email]);

  const handleUpdate = (marathon) => {
    setSelectedMarathon(marathon);
    setUpdateData(marathon);
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
          await axios.delete(
            `https://marathon-hub-server-chi.vercel.app/marathons/${id}`
          );
          setMarathons(marathons.filter((marathon) => marathon._id !== id));
          Swal.fire("Deleted!", "The marathon has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting marathon:", error);
          Swal.fire("Error!", "Failed to delete the marathon.", "error");
        }
      }
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(
        `https://marathon-hub-server-chi.vercel.app/marathons/${selectedMarathon._id}`,
        updateData
      );
      setIsModalOpen(false);
      setMarathons(
        marathons.map((marathon) =>
          marathon._id === selectedMarathon._id
            ? { ...marathon, ...updateData }
            : marathon
        )
      );
      Swal.fire(
        "Updated!",
        "The marathon has been updated successfully.",
        "success"
      );
    } catch (error) {
      console.error("Error updating marathon:", error);
      Swal.fire("Error!", "Failed to update the marathon.", "error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>My_Marathon</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-6">My Marathons</h1>
      {marathons.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 border border-gray-300">Image</th>
                <th className="px-4 py-2 border border-gray-300">Title</th>
                <th className="px-4 py-2 border border-gray-300">Location</th>
                <th className="px-4 py-2 border border-gray-300">Distance</th>
                <th className="px-4 py-2 border border-gray-300">Start Date</th>
                <th className="px-4 py-2 border border-gray-300">
                  Registration Count
                </th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {marathons.map((marathon, index) => (
                <tr
                  key={marathon._id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="px-4 py-2 border border-gray-300">
                    <img
                      src={marathon.image}
                      alt={marathon.title}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {marathon.title}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {marathon.location}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {marathon.distance}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(marathon.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {marathon.totalRegistrations}
                  </td>
                  <td className="px-4 flex flex-col gap-2 py-2 border border-gray-300">
                    <button
                      onClick={() => handleUpdate(marathon)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2 flex items-center gap-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(marathon._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1"
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
        <p className="text-center text-gray-500">No marathons found.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Update Marathon</h2>
            <label className="block mb-2">
              Title:
              <input
                type="text"
                value={updateData.title}
                onChange={(e) =>
                  setUpdateData({ ...updateData, title: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </label>
            <label className="block mb-2">
              Location:
              <input
                type="text"
                value={updateData.location || ""}
                onChange={(e) =>
                  setUpdateData({ ...updateData, location: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </label>
            <label className="block mb-2">
              Distance:
              <input
                type="text"
                value={updateData.distance || ""}
                onChange={(e) =>
                  setUpdateData({ ...updateData, distance: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </label>
            <label className="block mb-2">
              Start Date:
              <input
                type="date"
                value={
                  new Date(updateData.startDate).toISOString().split("T")[0]
                }
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    startDate: e.target.value,
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </label>
            <label className="block mb-4">
              Image URL:
              <input
                type="text"
                value={updateData.image || ""}
                onChange={(e) =>
                  setUpdateData({ ...updateData, image: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </label>
            <div className="flex justify-end">
              <button
                onClick={handleUpdateSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
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

export default MyMarathon;
