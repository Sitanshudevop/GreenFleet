import React, { useState } from 'react';
import { Leaf, Battery, Zap, Wind, Download, TrendingUp } from 'lucide-react';

const Environment = () => {
  const [vehicleAge, setVehicleAge] = useState(5);
  const [distance, setDistance] = useState(78000);
  const [fuelPrice, setFuelPrice] = useState(90);
  
  // Basic calculations for CNG/EV planner
  const dieselEfficiency = 4.0; // km/L
  const cngEfficiency = 5.5; // km/kg
  const evEfficiency = 1.2; // km/kWh
  
  const dieselCost = (distance / dieselEfficiency) * fuelPrice;
  const cngCost = (distance / cngEfficiency) * 80; // assumes 80/kg CNG
  const evCost = (distance / evEfficiency) * 8; // assumes 8/kWh EV

  const dieselCO2 = (distance / dieselEfficiency) * 2.68;
  const cngCO2 = (distance / cngEfficiency) * 2.0;
  const evCO2 = 0; // tailpipe

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            CO2 & Environment Analytics <Leaf className="w-6 h-6 text-emerald-500" />
          </h1>
          <p className="text-slate-500 text-sm mt-1">Track emissions and plan your green transition</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Total CO2 Emissions</p>
          <h3 className="text-3xl font-bold text-slate-800">142.5 Tons</h3>
          <p className="text-sm text-emerald-500 mt-2 flex items-center gap-1"><TrendingUp className="w-4 h-4 rotate-180"/> 12% reduction this year</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Average CO2 per Trip</p>
          <h3 className="text-3xl font-bold text-slate-800">214 kg</h3>
          <p className="text-sm text-emerald-500 mt-2 flex items-center gap-1"><TrendingUp className="w-4 h-4 rotate-180"/> 4% reduction this month</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Fuel Saved</p>
          <h3 className="text-3xl font-bold text-slate-800">1,240 L</h3>
          <p className="text-sm text-slate-400 mt-2">Via AI route optimization</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mt-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
           <Zap className="w-5 h-5 text-indigo-500"/> CNG / EV Transition Planner
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Details</label>
              <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500">
                <option>GF-104 (Heavy Truck - Diesel)</option>
                <option>GF-108 (LCV - Diesel)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Annual Distance (km)</label>
              <input type="number" value={distance} onChange={(e)=>setDistance(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Diesel Price (₹/L)</label>
              <input type="number" value={fuelPrice} onChange={(e)=>setFuelPrice(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            
            <p className="text-xs text-slate-500 mt-4">* Calculations are estimated based on regional averages and manufacturer specifications.</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Transition Analysis</h3>
            
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800 flex items-center gap-2">Current (Diesel)</p>
                <p className="text-sm text-slate-600 mt-1">Cost: ₹{Math.round(dieselCost).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-red-500 font-bold">{Math.round(dieselCO2).toLocaleString()} kg</p>
                <p className="text-xs text-slate-500">CO2 / year</p>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-emerald-800 flex items-center gap-2">CNG Transition</p>
                <p className="text-sm text-emerald-700 mt-1">Cost: ₹{Math.round(cngCost).toLocaleString()}</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">Save ₹{Math.round(dieselCost - cngCost).toLocaleString()} / yr</p>
              </div>
              <div className="text-right">
                <p className="text-emerald-600 font-bold">{Math.round(cngCO2).toLocaleString()} kg</p>
                <p className="text-xs text-emerald-600/70">CO2 / year</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-blue-800 flex items-center gap-2"><Battery className="w-4 h-4"/> EV Transition</p>
                <p className="text-sm text-blue-700 mt-1">Cost: ₹{Math.round(evCost).toLocaleString()}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">Save ₹{Math.round(dieselCost - evCost).toLocaleString()} / yr</p>
              </div>
              <div className="text-right">
                <p className="text-blue-600 font-bold">0 kg</p>
                <p className="text-xs text-blue-600/70">Tailpipe CO2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Environment;
