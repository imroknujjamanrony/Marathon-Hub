import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseAuth from "../context/UseAuth";
import axios from "axios";

const Registration = () => {
  const { id } = useParams();
  const [marathon, setMarathon] = useState(null);
  const { user } = UseAuth(); // Logged-in user info
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarathon = async () => {
      try {
        const response = await axios.get(
          `https://marathon-hub-server-chi.vercel.app/marathons/${id}`
        );
        setMarathon(response.data);
      } catch (error) {
        console.error("Error fetching marathon details:", error);
      }
    };

    fetchMarathon();
  }, [id]);

  const handleRegister = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const registrationData = {
      email: user.email,
      marathonTitle: marathon.title,
      startDate: marathon.startDate,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      contactNumber: formData.get("contactNumber"),
      additionalInfo: formData.get("additionalInfo"),
    };

    try {
      await axios.post(
        "https://marathon-hub-server-chi.vercel.app/registrations",
        registrationData
      );

      alert("Registration successful!");
      navigate("/dashboard/myApplylist"); // Navigate to My Apply list
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to register. Please try again.");
    }
  };

  if (!marathon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Register for {marathon.title}</h2>
      <form
        onSubmit={handleRegister}
        className="mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Marathon Title</label>
          <input
            type="text"
            name="marathonTitle"
            value={marathon.title}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="text"
            name="startDate"
            value={new Date(marathon.startDate).toLocaleDateString()}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Additional Info</label>
          <textarea
            name="additionalInfo"
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default Registration;
