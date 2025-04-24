import {
  AiOutlineAppstore,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";

const Stats = () => {
  const fakeStats = [
    { title: "Active Users", value: 24, icon: <AiOutlineAppstore size={28} /> },
    {
      title: "Active Marathons",
      value: 12,
      icon: <AiOutlineCheckCircle size={28} />,
    },
    {
      title: "Total Marathons",
      value: 5,
      icon: <AiOutlineClockCircle size={28} />,
    },
    { title: "Total Users", value: 145, icon: <AiOutlineUser size={28} /> },
  ];

  return (
    <section className="py-10 px-4 md:px-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-teal-600 mb-8">
        Statistics Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {fakeStats.map((stat, index) => (
          <div
            key={index}
            className="shadow-xl rounded-xl bg-white p-4 space-y-2"
          >
            <div className="flex items-center gap-3 text-gray-400">
              <span>{stat.icon}</span>
              <p className="text-sm font-medium">{stat.title}</p>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg lg:text-xl text-gray-500">
                {stat.value}
              </h2>
              <FaArrowTrendUp className="text-green-500 text-xl" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
