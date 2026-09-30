import React from 'react';
import { Download, FileText, BarChart2 } from 'lucide-react';

const Reports = () => {
  const reports = [
    { name: 'Fleet Efficiency Report', desc: 'Comprehensive analysis of fuel efficiency across all vehicle types.', date: 'Monthly' },
    { name: 'Driver Safety Report', desc: 'Aggregated safety scores and behavior anomalies.', date: 'Weekly' },
    { name: 'CO2 Emission Report', desc: 'Total carbon footprint calculation and offset recommendations.', date: 'Quarterly' },
    { name: 'Anomaly & Theft Log', desc: 'Detailed log of all detected fuel anomalies and idling events.', date: 'Daily' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Reports & Exports <FileText className="w-6 h-6 text-indigo-500" />
          </h1>
          <p className="text-slate-500 text-sm mt-1">Generate and download analytical reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <BarChart2 className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{report.name}</h3>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{report.date} Auto-Generated</span>
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-6">{report.desc}</p>
            <div className="flex gap-3">
              <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm">
                View Report
              </button>
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm">
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
