import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("./TaskOverviewChart"), { ssr: false });

export default function TaskOverview({ completed, inProgress, pending }) {
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    // This only runs on the client after hydration
    setLastUpdate(new Date().toLocaleString());
  }, []);

  const data = [
    { name: "Completed", value: completed },
    { name: "In Progress", value: inProgress },
    { name: "Pending", value: pending },
  ];
  const COLORS = ["#22c55e", "#3b82f6", "#f97316"]; // green, blue, orange

  const Stat = ({ label, value, cls }) => (
    <div className="bg-white rounded-lg shadow border px-4 py-3 text-center">
      <div className={`text-lg font-semibold ${cls}`}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );

  return (
    <div className="bg-white shadow p-5 w-96 justify-center">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>✓</span> Daily Task
      </h3>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <Stat label="Completed" value={completed} cls="text-green-600" />
        <Stat label="In Progress" value={inProgress} cls="text-blue-600" />
        <Stat label="Pending" value={pending} cls="text-orange-500" />
      </div>

      <Chart data={data} colors={COLORS} />

      {lastUpdate && (
        <p className="text-xs text-gray-400 text-center mt-2">
          Last Update: {lastUpdate}
        </p>
      )}
    </div>
  );
}
