// Chart.jsx
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Chart = () => {
  // Doughnut Chart Data
  const doughnutData = {
    labels: ["My Added", "My Applied", "Remaining"],
    datasets: [
      {
        label: "Marathon Stats",
        data: [5, 7, 8],
        backgroundColor: ["#34D399", "#60A5FA", "#FCD34D"],
        borderColor: ["#10B981", "#3B82F6", "#FBBF24"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // Bar Chart Data
  const barData = {
    labels: [
      "Total User",
      "Active Marathons",
      "Pending Marathons",
      "Total Marathons",
      "Accepted",
      "Rejected",
      "Pending Marathons",
    ],
    datasets: [
      {
        label: "Jobs Count",
        data: [240, 120, 150, 145, 250, 300, 250],
        backgroundColor: [
          "#4ade80",
          "#60a5fa",
          "#facc15",
          "#f97316",
          "#a78bfa",
          "#f87171",
          "#34d399",
        ],
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#374151",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Job Statistics Overview",
        color: "#1f2937",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
  };

  return (
    <div className="grid gap-10">
      <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Marathon Overview
        </h2>
      </div>

      <div className="">
        <div className="h-96 bg-white p-4 rounded-xl shadow-md">
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="h-96 mt-8">
          <h2 className="text-teal-300 font-bold text-3xl">
            My Dashboard Overview
          </h2>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
