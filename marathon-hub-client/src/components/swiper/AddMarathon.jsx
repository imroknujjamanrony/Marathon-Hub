import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";
import UseAuth from "../../context/UseAuth";
import { Helmet } from "react-helmet-async";

const AddMarathon = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  const [marathonDetails, setMarathonDetails] = useState({
    title: "",
    startRegistration: null,
    endRegistration: null,
    startDate: null,
    location: "",
    distance: "",
    description: "",
    image: "",
    totalRegistrationCount: 0,
    createdAt: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarathonDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire(
        "Error!",
        "You must be logged in to create a marathon.",
        "error"
      );
      return;
    }

    if (
      !marathonDetails.startRegistration ||
      !marathonDetails.endRegistration ||
      !marathonDetails.startDate
    ) {
      Swal.fire("Error!", "Please fill out all date fields.", "error");
      return;
    }

    try {
      const formattedData = {
        ...marathonDetails,
        organizerName: user.displayName || "Anonymous",
        organizerEmail: user.email,
        startRegistration: marathonDetails.startRegistration?.toISOString(),
        endRegistration: marathonDetails.endRegistration?.toISOString(),
        startDate: marathonDetails.startDate?.toISOString(),
      };

      const response = await axios.post(
        "https://marathon-hub-server-chi.vercel.app/addNewmarathons",
        formattedData
      );

      if (response.status >= 200 && response.status < 300) {
        Swal.fire("Success!", "Marathon created successfully!", "success");
        setMarathonDetails({
          title: "",
          startRegistration: null,
          endRegistration: null,
          startDate: null,
          location: "",
          distance: "",
          description: "",
          image: "",
          totalRegistrationCount: 0,
          createdAt: new Date(),
        });
        navigate("/marathons");
      }
    } catch (error) {
      console.error("Error submitting marathon:", error);
      Swal.fire("Error!", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Helmet>
        <title>Add Marathon</title>
      </Helmet>
      <div className="card w-full max-w-3xl bg-base-100 shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4 dark:text-[#c3c400]">
          Add Marathon
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Marathon Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={marathonDetails.title}
              onChange={handleChange}
              placeholder="Enter marathon title"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Start Registration Date</span>
            </label>
            <DatePicker
              selected={marathonDetails.startRegistration}
              onChange={(date) =>
                setMarathonDetails((prev) => ({
                  ...prev,
                  startRegistration: date,
                }))
              }
              className="input input-bordered w-full"
              placeholderText="Select start registration date"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">End Registration Date</span>
            </label>
            <DatePicker
              selected={marathonDetails.endRegistration}
              onChange={(date) =>
                setMarathonDetails((prev) => ({
                  ...prev,
                  endRegistration: date,
                }))
              }
              className="input input-bordered w-full"
              placeholderText="Select end registration date"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Marathon Start Date</span>
            </label>
            <DatePicker
              selected={marathonDetails.startDate}
              onChange={(date) =>
                setMarathonDetails((prev) => ({ ...prev, startDate: date }))
              }
              className="input input-bordered w-full"
              placeholderText="Select marathon start date"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              name="location"
              value={marathonDetails.location}
              onChange={handleChange}
              placeholder="Enter marathon location"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Running Distance</span>
            </label>
            <select
              name="distance"
              value={marathonDetails.distance}
              onChange={handleChange}
              className="select select-bordered"
              required
            >
              <option value="" disabled>
                Select distance
              </option>
              <option value="25k">25k</option>
              <option value="10k">10k</option>
              <option value="3k">3k</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              value={marathonDetails.description}
              onChange={handleChange}
              placeholder="Enter marathon description"
              className="textarea textarea-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Marathon Image (URL)</span>
            </label>
            <input
              type="text"
              name="image"
              value={marathonDetails.image}
              onChange={handleChange}
              placeholder="Enter marathon image URL"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button className="mt-4 px-4 py-2 rounded-lg bg-[#00509D] hover:bg-[#003f7d] text-white font-medium transition duration-300">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMarathon;
