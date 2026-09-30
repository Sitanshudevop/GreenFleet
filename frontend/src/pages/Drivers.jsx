import React from 'react';
import { Users, ShieldAlert, Award, TrendingUp } from 'lucide-react';

const Drivers = () => {
  const drivers = [
    { id: 'D-101', name: 'Rajesh Kumar', score: 92, status: 'Excellent', vehicle: 'GF-102', issues: 'None' },
    { id: 'D-102', name: 'Suresh Singh', score: 87, status: 'Good', vehicle: 'GF-101', issues: '1 Harsh Braking' },
    { id: 'D-103', name: 'Amit Patel', score: 74, status: 'Warning', vehicle: 'GF-103', issues: 'Excessive Idling' },
    { id: 'D-104', name: 'Vikram Sharma', score: 62, status: 'Critical', vehicle: 'GF-104', issues: 'Overspeeding, Fuel Anomaly' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Driver Analytics <Users className="w-6 h-6 text-blue-500" />
          </h1>
          <p className="text-slate-500 text-sm mt-1">Monitor driver safety scores and behavior</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-2 md:col-span-1">
          <p className="text-sm font-medium text-slate-500 mb-1">Fleet Avg Safety Score</p>
          <div className="flex items-end gap-3 mt-2">
            <h3 className="text-4xl font-bold text-slate-800">84</h3>
            <span className="text-sm font-medium text-slate-400 mb-1">/ 100</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full mt-4">
            <div className="bg-blue-500 h-full rounded-full" style={{width: '84%'}}></div>
          </div>
        </div>
        
        <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-sm col-span-2 md:col-span-3 flex flex-col justify-center relative overflow-hidden">
           <Award className="absolute -right-4 -bottom-4 w-32 h-32 text-indigo-500 opacity-30" />
           <h3 className="font-bold text-lg mb-2 relative z-10">Top Driver of the Month</h3>
           <p className="text-indigo-100 text-sm max-w-md relative z-10">Rajesh Kumar achieved a safety score of 92 with zero instances of harsh braking or idling this month, saving an estimated 4% in fuel.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
              <th className="p-4 font-medium">Driver ID</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Safety Score</th>
              <th className="p-4 font-medium">Assigned Vehicle</th>
              <th className="p-4 font-medium">Recent Issues</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {drivers.map((d, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-900">{d.id}</td>
                <td className="p-4 text-slate-600 font-semibold">{d.name}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${d.score >= 85 ? 'text-emerald-500' : (d.score >= 70 ? 'text-amber-500' : 'text-red-500')}`}>{d.score}</span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                </td>
                <td className="p-4 text-slate-600">{d.vehicle}</td>
                <td className="p-4 text-slate-500">{d.issues}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Drivers;
