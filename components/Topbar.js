import { LucideSearch, LucideSettings, LucideBell } from 'lucide-react';
import Image from 'next/image';

const Topbar = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <h1 className="text-2xl font-bold text-indigo-600">Heymate</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <LucideSearch size={20} />
        </button>
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <LucideSettings size={20} />
        </button>
        <div className="relative">
          <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
            <LucideBell size={20} />
          </button>
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </div>
        <Image
          src="/avatar.png"
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full border-2 border-purple-500"
        />
      </div>
    </header>
  );
};

export default Topbar;
