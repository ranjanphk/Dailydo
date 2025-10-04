// pages/Overview.js
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";

// Load Chart client-side only
const LineChartComponent = dynamic(() => import("../components/LineChartComponent"), { ssr: false });

export default function Overview({ tasks }) {
  const [lastUpdate, setLastUpdate] = useState("");
  const [viewMode, setViewMode] = useState("weekly"); // "weekly" | "monthly"

  useEffect(() => {
    setLastUpdate(new Date().toLocaleString());
  }, []);

  // 🔹 Weekly Data (last 7 days)
  const weeklyData = useMemo(() => {
    const grouped = {};
    const now = new Date();

    // prepare 7 days slot
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toISOString().split("T")[0];
      grouped[key] = {
        date: `${d.toLocaleDateString("en-US", { weekday: "short" })} ${d.getDate()}`, // e.g., Mon 23
        completed: 0,
        inProgress: 0,
        pending: 0,
      };
    }

    tasks.forEach((task) => {
      if (!task.createdAt) return;     
      const key = new Date(task.createdAt).toISOString().split("T")[0];
      if (grouped[key]) {
        if (task.status === "Completed") grouped[key].completed += 1;
        else if (task.status === "In Progress") grouped[key].inProgress += 1;
        else if (task.status === "Pending") grouped[key].pending += 1;
      }
    });

    return Object.values(grouped);
  }, [tasks]);

// 🔹 Monthly Data (current month only, by week)
const monthlyData = useMemo(() => {
  const grouped = {};
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Number of weeks in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalWeeks = Math.ceil(daysInMonth / 7);

  // Pre-populate all weeks
  for (let w = 1; w <= totalWeeks; w++) {
    const key = `${year}-${month + 1}-W${w}`;
    grouped[key] = {
      date: `Week ${w}`,
      completed: 0,
      inProgress: 0,
      pending: 0,
    };
  }

  // Count tasks for the current month
  tasks.forEach((task) => {
    if (!task.createdAt) return;
    const d = new Date(task.createdAt);
    if (d.getFullYear() !== year || d.getMonth() !== month) return;

    const weekOfMonth = Math.ceil(d.getDate() / 7);
    const key = `${year}-${month + 1}-W${weekOfMonth}`;

    if (task.status === "Completed") grouped[key].completed += 1;
    else if (task.status === "In Progress") grouped[key].inProgress += 1;
    else if (task.status === "Pending") grouped[key].pending += 1;
  });

  return Object.values(grouped);
}, [tasks]);



  const chartData = viewMode === "weekly" ? weeklyData : monthlyData;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          📊 {viewMode === "weekly" ? "Weekly" : "Monthly"} Overview
        </h2>

        {/* Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("weekly")}
            className={`px-3 py-1 rounded ${
              viewMode === "weekly" ? "bg-blue-500 text-gray-100" : "bg-gray-200 text-gray-800"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setViewMode("monthly")}
            className={`px-3 py-1 rounded ${
              viewMode === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <LineChartComponent data={chartData} />
      </div>

      {/* Footer */}
      {lastUpdate && (
        <p className="text-xs text-gray-400 text-center mt-4">
          Last Update: {lastUpdate}
        </p>
      )}
    </div>
  );
}
