import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, MoreVertical, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

const Fleet = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      setVehicles([
        {vehicle_id: "GF-101", registration_number: "MH-12-AB-1234", vehicle_type: "Heavy Truck", fuel_type: "Diesel", status: "Active", risk_score: 12.5, current_location: "Mumbai", health: "Good"},
        {vehicle_id: "GF-102", registration_number: "MH-14-CD-5678", vehicle_type: "Medium Truck", fuel_type: "CNG", status: "Active", risk_score: 8.0, current_location: "Pune", health: "Excellent"},
        {vehicle_id: "GF-104", registration_number: "CG-04-GH-3456", vehicle_type: "Heavy Truck", fuel_type: "Diesel", status: "Maintenance", risk_score: 65.0, current_location: "Nagpur", health: "Maintenance Required"}
      ]);
      setLoading(false);
    };
    fetchVehicles();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-3.5 h-3.5"/> Active</span>;
      case 'In Transit': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Clock className="w-3.5 h-3.5"/> In Transit</span>;
      default: return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><ShieldAlert className="w-3.5 h-3.5"/> {status}</span>;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fleet Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and monitor all your vehicles</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Add Vehicle
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="flex items-center bg-white border border-slate-300 rounded-lg px-3 py-1.5 w-72 focus-within:ring-2 ring-emerald-500/20">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input type="text" placeholder="Search vehicle ID or registration..." className="bg-transparent border-none outline-none w-full text-sm text-slate-700" />
          </div>
          <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-medium px-3 py-1.5 border border-slate-300 rounded-lg bg-white">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-medium">Vehicle ID</th>
                <th className="p-4 font-medium">Registration</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Risk Score</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {loading ? (
                <tr><td colSpan="7" className="p-8 text-center text-slate-500">Loading fleet data...</td></tr>
              ) : vehicles.map((v, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{v.vehicle_id}</td>
                  <td className="p-4 text-slate-600">{v.registration_number}</td>
                  <td className="p-4">
                    <div className="text-slate-900">{v.vehicle_type}</div>
                    <div className="text-xs text-slate-500">{v.fuel_type}</div>
                  </td>
                  <td className="p-4">{getStatusBadge(v.status)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${v.risk_score > 50 ? 'bg-red-500' : (v.risk_score > 20 ? 'bg-amber-500' : 'bg-emerald-500')}`} style={{width: `${Math.min(v.risk_score, 100)}%`}}></div>
                      </div>
                      <span className="text-xs font-medium text-slate-600">{v.risk_score}/100</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{v.current_location}</td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Fleet;
