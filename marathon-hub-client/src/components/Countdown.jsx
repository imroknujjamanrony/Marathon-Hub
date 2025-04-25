import Countdown from "react-countdown";

const MyCountdown = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-white px-12  py-8 flex flex-col lg:flex-row justify-between items-center shadow-lg gap-6">
      {/* Left - Marathon Info */}
      <div>
        <h2 className="text-3xl font-extrabold text-[#c3c400] uppercase mb-2">
          Upcoming Marathon
        </h2>
        <p className="text-lg font-medium text-gray-400">
          Get ready for the challenge —{" "}
          <span className="text-gray-400 font-semibold">
            August 12-13, 2025
          </span>
        </p>
      </div>

      {/* Right - Countdown */}
      <Countdown
        date={new Date("2025-08-12T00:00:00")}
        renderer={({ days, hours, minutes, seconds }) => (
          <div className="flex gap-3">
            {[
              { label: "days", value: days },
              { label: "hours", value: hours },
              { label: "mins", value: minutes },
              { label: "secs", value: seconds },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#2b2b2b] px-5 py-4 text-center rounded-md shadow-md border border-[#3a3a3a]"
              >
                <div className="text-3xl font-bold text-white">
                  {item.value}
                </div>
                <div className="text-sm text-[#c3c400] uppercase mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default MyCountdown;
