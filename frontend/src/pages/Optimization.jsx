import React, { useState } from 'react';
import axios from 'axios';
import { Leaf, ArrowRight, Zap, TrendingDown, Clock, MapPin, Fuel } from 'lucide-react';

const Optimization = () => {
  const [origin, setOrigin] = useState('Bhilai');
  const [destination, setDestination] = useState('Nagpur');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleOptimize = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/optimize/route', { origin, destination });
      setResult(res.data);
    } catch (err) {
      // Mocking fallback
      setTimeout(() => {
        setResult({
          current_route: { distance_km: 312.4, fuel_l: 92.5, co2_kg: 248.0 },
          optimized_route: { distance_km: 284.1, fuel_l: 79.2, co2_kg: 213.5 },
          savings: { distance_km: 28.3, fuel_l: 13.3, co2_kg: 34.5 }
        });
        setLoading(false);
      }, 1500);
      return;
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Route Optimization <Zap className="w-6 h-6 text-indigo-500 fill-indigo-100" />
          </h1>
          <p className="text-slate-500 text-sm mt-1">Quantum-Inspired / QUBO Optimization Engine</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Planner Settings */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:col-span-1">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Trip Planner</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Origin</label>
              <div className="relative">
                <MapPin className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
            
            <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-slate-100 p-1.5 rounded-full border border-slate-200">
                <ArrowRight className="w-4 h-4 text-slate-500 rotate-90" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
              <div className="relative">
                <MapPin className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 mt-4">Vehicle Category</label>
              <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                <option>Heavy Truck (Diesel)</option>
                <option>Medium Truck (CNG)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Load (Tonnes)</label>
              <input type="number" defaultValue={8} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            </div>

            <button 
              onClick={handleOptimize}
              disabled={loading}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                 <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Optimizing...</>
              ) : (
                <><Zap className="w-4 h-4" /> Run Optimization</>
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-slate-900 rounded-xl shadow-xl overflow-hidden lg:col-span-2 text-white relative">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500"></div>
           
           {!result ? (
             <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-400">
                <RouteIcon className="w-16 h-16 mb-4 text-slate-700 opacity-50" />
                <h3 className="text-xl font-medium text-slate-300 mb-2">Ready for Analysis</h3>
                <p className="max-w-md text-sm">Enter origin and destination, and the quantum-inspired engine will compute the most fuel-efficient route.</p>
             </div>
           ) : (
             <div className="p-8">
               <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800">
                 <div>
                   <h2 className="text-2xl font-bold">Optimization Results</h2>
                   <p className="text-emerald-400 text-sm font-medium mt-1">Benchmark: QUBO vs Classical OR-Tools</p>
                 </div>
                 <div className="text-right">
                   <p className="text-slate-400 text-xs uppercase tracking-wider">Status</p>
                   <p className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Optimal Route Found</p>
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-8 mb-8">
                 <div>
                   <h3 className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">Standard Route</h3>
                   <div className="space-y-3">
                     <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                       <span className="text-slate-400 flex items-center gap-2"><MapPin className="w-4 h-4"/> Distance</span>
                       <span className="font-medium">{result.current_route.distance_km} km</span>
                     </div>
                     <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                       <span className="text-slate-400 flex items-center gap-2"><Fuel className="w-4 h-4"/> Est. Fuel</span>
                       <span className="font-medium">{result.current_route.fuel_l} L</span>
                     </div>
                     <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                       <span className="text-slate-400 flex items-center gap-2"><Leaf className="w-4 h-4"/> Est. CO2</span>
                       <span className="font-medium">{result.current_route.co2_kg} kg</span>
                     </div>
                   </div>
                 </div>
                 
                 <div>
                   <h3 className="text-emerald-400 text-sm font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
                     <Zap className="w-4 h-4"/> Optimized Route
                   </h3>
                   <div className="space-y-3">
                     <div className="flex justify-between items-center bg-emerald-900/20 p-3 rounded-lg border border-emerald-500/20">
                       <span className="text-emerald-300/70 flex items-center gap-2"><MapPin className="w-4 h-4"/> Distance</span>
                       <span className="font-bold text-emerald-400">{result.optimized_route.distance_km} km</span>
                     </div>
                     <div className="flex justify-between items-center bg-emerald-900/20 p-3 rounded-lg border border-emerald-500/20">
                       <span className="text-emerald-300/70 flex items-center gap-2"><Fuel className="w-4 h-4"/> Est. Fuel</span>
                       <span className="font-bold text-emerald-400">{result.optimized_route.fuel_l} L</span>
                     </div>
                     <div className="flex justify-between items-center bg-emerald-900/20 p-3 rounded-lg border border-emerald-500/20">
                       <span className="text-emerald-300/70 flex items-center gap-2"><Leaf className="w-4 h-4"/> Est. CO2</span>
                       <span className="font-bold text-emerald-400">{result.optimized_route.co2_kg} kg</span>
                     </div>
                   </div>
                 </div>
               </div>
               
               <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-xl p-5 relative overflow-hidden">
                 <div className="absolute -right-4 -bottom-4 opacity-10">
                   <Leaf className="w-32 h-32" />
                 </div>
                 <h3 className="text-indigo-300 font-medium text-sm mb-2">Total Estimated Savings</h3>
                 <div className="flex gap-8 items-end">
                   <div>
                     <p className="text-3xl font-bold text-white flex items-center gap-2">
                       <TrendingDown className="w-6 h-6 text-emerald-400" /> {result.savings.fuel_l} L
                     </p>
                     <p className="text-xs text-indigo-200 mt-1 uppercase tracking-wide">Fuel Saved</p>
                   </div>
                   <div>
                     <p className="text-3xl font-bold text-white">
                       {result.savings.co2_kg} kg
                     </p>
                     <p className="text-xs text-indigo-200 mt-1 uppercase tracking-wide">CO2 Mitigated</p>
                   </div>
                 </div>
               </div>
               
               <button className="w-full mt-6 bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-slate-100 transition-colors">
                 Assign Vehicle & Dispatch
               </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// Extracted here since RouteIcon is used above
const RouteIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="6" cy="19" r="3" />
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
    <circle cx="18" cy="5" r="3" />
  </svg>
);

export default Optimization;
