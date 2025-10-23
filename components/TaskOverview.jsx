import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import DailyScoreModal from './score';

const Chart = dynamic(() => import('./TaskOverviewChart'), { ssr: false });

export default function TaskOverview({ completed, inProgress, pending, name }) {
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    // This only runs on the client after hydration
    setLastUpdate(new Date().toLocaleString());
  }, []);

  const data = [
    { name: 'Completed', value: completed },
    { name: 'In Progress', value: inProgress },
    { name: 'Pending', value: pending },
  ];
  const COLORS = ['#22c55e', '#3b82f6', '#f97316']; // green, blue, orange

  const Stat = ({ label, value, cls }) => (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200 px-4 py-3 text-center">
      <div className={`text-lg font-semibold ${cls}`}>{String(value).padStart(2, '0')}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
  const [showDailyPopup, setShowDailyPopup] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 shadow p-5 w-96 justify-center">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>✓</span> Daily Task
      </h3>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <Stat label="Completed" value={completed} cls="text-green-600" />
        <Stat label="In Progress" value={inProgress} cls="text-blue-600" />
        <Stat label="Pending" value={pending} cls="text-orange-500" />
      </div>

      {/* PieChart */}

      <div className="mb-4 flex-row items-center grid">
        <Chart data={data} colors={COLORS} />
      </div>

      {/* Daily Score Modal */}
      <div className="flex flex-col items-center">
        <DailyScoreModal
          isOpen={showDailyPopup}
          onClose={() => setShowDailyPopup(false)}
          completed={completed}
          inProgress={inProgress}
          pending={pending}
          username={name}
        />

        <button
          onClick={() => setShowDailyPopup(true)}
          className="bottom-20 flex bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-sm text-blue-800 dark:text-blue-50 rounded-full shadow-lg px-4 py-3
                       hover:bg-blue-50 transition
                       dark:hover:bg-gray-700 border
                       

                       
                       "
        >
          ↗️ Share Score
        </button>
      </div>

      {/* Last Update */}

      {lastUpdate && (
        <p className="text-xs text-gray-300 dark:text-gray-400 py-2 text-center mt-2">Last Update: {lastUpdate}</p>
      )}
    </div>
  );
}
