import { useRef } from "react";
import html2canvas from "html2canvas";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

export default function DailyScoreModal({ isOpen, onClose, completed, inProgress, pending, username }) {
  const popupRef = useRef(null);

  if (!isOpen) return null;

  const COLORS = ["#22c55e", "#3b82f6", "#f97316"];
  const data = [
    { name: "Completed", value: completed },
    { name: "In Progress", value: inProgress },
    { name: "Pending", value: pending },
  ];

  const handleShare = async () => {
    if (!popupRef.current) return;
    const canvas = await html2canvas(popupRef.current, {
      height:360,
      scale:2,

      });
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "daily_score.png";
    link.click();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 shadow-lg text-center relative">
      <motion.div
        ref={popupRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="dark:bg-gray-800 h-auto"
        
      >
         

        <h2 className="text-lg font-semibold mb-2">Daily Progress</h2>
        <p className="text-sm text-gray-500 mb-2">
          {username ? `${username}'s` : "Your"} task summary today
        </p>
        

        <PieChart width={280} height={240} className="mx-auto px-3 py-3 h-auto rounded-sm -mb-4">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={70}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip/>
          <Legend
                content={({ payload }) => (
                    <ul className="flex justify-center gap-4 text-xs py-2">
                    {payload.map((entry, index) => (
                        <li key={`item-${index}`} className="flex items-center gap-1">
                       
                        <span className="text-gray-700 dark:text-gray-300 text-center
                        ">
                          
                           <span
                            className="w-3 h-3 rounded-full inline-block"
                            style={{ backgroundColor: entry.color }}
                        >


                        </span><br/>
                          
                          {entry.value}</span>
                        </li>
                    ))}
                    </ul>
                )}
                />
                
        </PieChart>
        <span className="text-[10px] tracking-wide text-indigo-600 dark:text-gray-50 -mt-14">
          Track your progress with <b>DailyDo</b>
        </span>

               

      </motion.div>

              <div className="mt-6 flex flex-row justify-center items-center gap-4 text-sm">
                <button
                    onClick={handleShare}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Share
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                    Close
                </button>
  
                </div>
                

          </div>
    </div>
  );
}
