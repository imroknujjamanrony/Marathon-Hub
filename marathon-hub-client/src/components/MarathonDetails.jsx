import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseAuth from "../context/UseAuth";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Swal from "sweetalert2";
import { CountdownCircleTimer } from "react-countdown-circle-timer"; // Import the countdown component

const MarathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marathon, setMarathon] = useState(null);
  const [registrationCount, setRegistrationCount] = useState(0);
  const { user, loading } = UseAuth(); // Logged-in user info and loading

  useEffect(() => {
    const fetchMarathon = async () => {
      try {
        const response = await axios.get(
          `https://marathon-hub-server-chi.vercel.app/marathons/${id}`
        );
        const fetchedMarathon = response.data;

        setMarathon(fetchedMarathon);
        setRegistrationCount(fetchedMarathon.totalRegistrationCount || 0);
      } catch (error) {
        Swal.fire("Error!", "Unable to fetch marathon details.", error);
      }
    };

    fetchMarathon();
  }, [id]);

  if (loading || !marathon) {
    return <div>Loading...</div>;
  }

  // Calculate time remaining in seconds for the countdown
  const calculateTimeRemaining = () => {
    const marathonStartDate = new Date(marathon.startDate).getTime();
    const currentDate = new Date().getTime();
    const remainingTime = marathonStartDate - currentDate;

    return remainingTime > 0 ? remainingTime / 1000 : 0; // Return seconds
  };

  return (
    <div className="p-8">
      <Helmet>
        <title>{marathon.title || "Marathon Details"}</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center">{marathon.title}</h2>
      <img
        src={marathon.image}
        alt={marathon.title}
        className="w-full h-60 object-cover rounded-lg mb-6 shadow-lg"
      />
      <p className="text-gray-700">
        <strong>Location:</strong> {marathon.location}
      </p>
      <p className="text-gray-700">
        <strong>Distance:</strong> {marathon.distance}
      </p>
      <p className="text-gray-700">
        <strong>Registration Dates:</strong>{" "}
        {new Date(marathon.startRegistration).toLocaleDateString()} -{" "}
        {new Date(marathon.endRegistration).toLocaleDateString()}
      </p>
      <p className="text-gray-700">
        <strong>Marathon Start Date:</strong>{" "}
        {new Date(marathon.startDate).toLocaleDateString()}
      </p>

      {/* Countdown Timer */}
      <div className="my-8 text-center">
        <h3 className="text-xl font-semibold mb-4">
          Time Remaining until Marathon:
        </h3>
        <div className="flex justify-center items-center">
          <CountdownCircleTimer
            isPlaying
            duration={calculateTimeRemaining()}
            colors={[
              ["#004777", 0.33],
              ["#F7B801", 0.33],
              ["#A30000", 0.33],
            ]}
            size={150}
            strokeWidth={8}
            onComplete={() => console.log("Timer finished!")}
          >
            {({ remainingTime }) => {
              const hours = Math.floor(remainingTime / 3600);
              const minutes = Math.floor((remainingTime % 3600) / 60);
              const seconds = remainingTime % 60;
              return (
                <div className="text-lg font-bold text-center">
                  <div>{hours}h</div>
                  <div>{minutes}m</div>
                  <div>{seconds}s</div>
                </div>
              );
            }}
          </CountdownCircleTimer>
        </div>
      </div>

      <p className="text-gray-700">
        <strong>Registration Count:</strong> {marathon.totalRegistrations}
      </p>
      <p className="text-gray-700 mt-4">{marathon.description}</p>
      <div className="text-gray-700  gap-4">
        <div>
          <strong>Organizer:</strong> {marathon.organizerName}{" "}
        </div>
        <div>
          <strong>Email:</strong>
          {marathon.organizerEmail}
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full lg:w-full lg:py-3"
        onClick={() => navigate(`/registration/${id}`)}
      >
        Register for Marathon
      </button>
    </div>
  );
};

export default MarathonDetails;
