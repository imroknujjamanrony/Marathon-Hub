import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseAuth from "../context/UseAuth";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Swal from "sweetalert2";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Loading from "./swiper/Loading";

const MarathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marathon, setMarathon] = useState(null);
  const { user, loading } = UseAuth();

  useEffect(() => {
    const fetchMarathon = async () => {
      try {
        const response = await axios.get(
          `https://marathon-hub-server-chi.vercel.app/marathons/${id}`
        );
        setMarathon(response.data);
      } catch (error) {
        Swal.fire("Error!", "Unable to fetch marathon details.", "error");
      }
    };
    fetchMarathon();
  }, [id]);

  if (loading || !marathon) {
    return <Loading />;
  }

  const calculateTimeRemaining = () => {
    const marathonStartDate = new Date(marathon.startDate).getTime();
    const currentDate = new Date().getTime();
    return Math.max((marathonStartDate - currentDate) / 1000, 0);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Helmet>
        <title>{marathon.title || "Marathon Details"}</title>
      </Helmet>

      <h2 className="text-3xl text-[#c3c400] dark:text-teal-300 font-bold text-center mb-4">
        {marathon.title}
      </h2>
      <img
        src={marathon.image}
        alt={marathon.title}
        className="w-full h-60 object-cover rounded-lg mb-6 shadow-lg"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p>
            <strong>Location:</strong> {marathon.location}
          </p>
          <p>
            <strong>Distance:</strong> {marathon.distance}
          </p>
          <p>
            <strong>Registration:</strong>{" "}
            {new Date(marathon.startRegistration).toLocaleDateString()} -{" "}
            {new Date(marathon.endRegistration).toLocaleDateString()}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(marathon.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Organizer:</strong> {marathon.organizerName}
          </p>
          <p>
            <strong>Email:</strong> {marathon.organizerEmail}
          </p>
          <p className="text-gray-700">{marathon.description}</p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Time Remaining</h3>
          <CountdownCircleTimer
            isPlaying
            duration={calculateTimeRemaining()}
            colors={["#004777", "#F7B801", "#A30000"]}
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

      <button
        className="mt-6 px-4 py-2 bg-[#00509D] text-white rounded-lg hover:bg-[#003f7d] font-medium transition duration-300 w-full"
        onClick={() => navigate(`/registration/${id}`)}
      >
        Register for Marathon
      </button>
    </div>
  );
};

export default MarathonDetails;
