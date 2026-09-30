import React from 'react';
import { Bell, Search, Play, Pause, RotateCcw } from 'lucide-react';

const Topbar = () => {
  const [demoMode, setDemoMode] = React.useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 w-96 focus-within:ring-2 ring-emerald-500/20">
        <Search className="w-5 h-5 text-slate-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search vehicles, drivers, or routes..." 
          className="bg-transparent border-none outline-none w-full text-sm text-slate-700"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Demo Mode Controls */}
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-colors ${demoMode ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-200'}`}>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">Demo Mode</span>
          {demoMode ? (
            <button onClick={() => setDemoMode(false)} className="text-indigo-600 hover:text-indigo-800 p-1 bg-white rounded-full shadow-sm" title="Pause Simulation">
              <Pause className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={() => setDemoMode(true)} className="text-emerald-600 hover:text-emerald-800 p-1 bg-white rounded-full shadow-sm border border-emerald-200" title="Start Full Demo">
              <Play className="w-4 h-4 fill-current" />
            </button>
          )}
          <button className="text-slate-400 hover:text-slate-700 p-1" title="Reset Demo Data">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
            D
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-700 leading-none">Dispatcher</p>
            <p className="text-xs text-slate-500 mt-1">Admin Role</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
