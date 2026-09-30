import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/alerts');
        setAlerts(res.data);
      } catch (err) {
        setAlerts([
          {id: 1, vehicle_id: 4, type: "Fuel Theft", severity: "CRITICAL", message: "Abnormal fuel drop of 8.7L detected. Expected drop: 2.1L. Possible leak or theft.", timestamp: new Date().toISOString(), is_resolved: false},
          {id: 2, vehicle_id: 1, type: "Idling", severity: "MEDIUM", message: "Excessive idling detected (15+ mins).", timestamp: new Date().toISOString(), is_resolved: false},
        ]);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Alert Center <AlertTriangle className="w-6 h-6 text-amber-500" />
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage anomaly detections and system alerts</p>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
            No active alerts.
          </div>
        ) : alerts.map((alert) => (
          <div key={alert.id} className={`p-6 rounded-xl border-l-4 bg-white shadow-sm flex justify-between items-center ${alert.severity === 'CRITICAL' ? 'border-red-500' : 'border-amber-500'}`}>
            <div className="flex gap-4 items-start">
              <AlertTriangle className={`w-6 h-6 shrink-0 mt-1 ${alert.severity === 'CRITICAL' ? 'text-red-500' : 'text-amber-500'}`} />
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-slate-900 text-lg">{alert.type}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Vehicle ID: {alert.vehicle_id}</span>
                </div>
                <p className="text-slate-600">{alert.message}</p>
                <p className="text-xs text-slate-400 mt-2">Detected: {new Date(alert.timestamp).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Investigate
              </button>
              <button className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Acknowledge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
