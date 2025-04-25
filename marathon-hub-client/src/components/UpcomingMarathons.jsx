import { useEffect, useState } from "react";

const UpcomingMarathons = () => {
  const [upcomingmarathons, setUpcomingmarathons] = useState([]);

  useEffect(() => {
    fetch("/staticCard.json")
      .then((res) => res.json())
      .then((data) => {
        setUpcomingmarathons(data);
      });
  }, []);

  return (
    <div className=" bg-gray-100 dark:bg-gray-900 py-8">
      <h1 className="text-3xl py-4 font-bold mb-6 text-center text-[#c3c400] dark:text-teal-300">
        Upcoming Marathons
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {upcomingmarathons.map((marathon) => (
          <div
            key={marathon.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={marathon.image_link}
              alt={marathon.title}
              className="rounded-t-lg h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-[#89ABE3] dark:text-teal-300 mb-2">
                {marathon.title}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {marathon.description}
              </p>
              <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
                <span className="font-bold">Location:</span> {marathon.location}
              </p>
              <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
                <span className="font-bold">Distance:</span> {marathon.distance}
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="font-bold">Organizer:</span>{" "}
                {marathon.organizer_name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMarathons;
