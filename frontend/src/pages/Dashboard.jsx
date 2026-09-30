import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Truck, 
  Droplet, 
  Wind,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import axios from 'axios';

const fuelData = [
  { name: 'Mon', consumption: 4000, predicted: 4200 },
  { name: 'Tue', consumption: 3000, predicted: 3200 },
  { name: 'Wed', consumption: 2000, predicted: 2100 },
  { name: 'Thu', consumption: 2780, predicted: 2900 },
  { name: 'Fri', consumption: 1890, predicted: 2000 },
  { name: 'Sat', consumption: 2390, predicted: 2500 },
  { name: 'Sun', consumption: 3490, predicted: 3600 },
];

const co2Data = [
  { name: 'Week 1', emissions: 12.4 },
  { name: 'Week 2', emissions: 11.2 },
  { name: 'Week 3', emissions: 10.8 },
  { name: 'Week 4', emissions: 9.5 },
];

const StatCard = ({ title, value, change, icon: Icon, trend, subtext }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${trend === 'up' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {trend === 'down' ? (
        <TrendingDown className="w-4 h-4 text-emerald-500 mr-1" />
      ) : (
        <TrendingUp className="w-4 h-4 text-rose-500 mr-1" />
      )}
      <span className={`text-sm font-medium ${trend === 'down' ? 'text-emerald-500' : 'text-rose-500'}`}>
        {change}
      </span>
      <span className="text-sm text-slate-400 ml-2">{subtext}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Attempt to fetch from backend, use mock if it fails
    const fetchData = async () => {
      try {
        const vRes = await axios.get('http://localhost:8000/vehicles');
        setVehicles(vRes.data);
      } catch (err) {
        console.log("Backend not reachable for vehicles, using mock data");
        setVehicles([
            {vehicle_id: "GF-101", status: "Active"},
            {vehicle_id: "GF-102", status: "Active"},
            {vehicle_id: "GF-103", status: "In Transit"},
        ]);
      }
      try {
        const aRes = await axios.get('http://localhost:8000/alerts');
        setAlerts(aRes.data);
      } catch (err) {
        setAlerts([
          {type: "Fuel Theft", severity: "CRITICAL", message: "Abnormal fuel drop of 8.7L detected."},
          {type: "Idling", severity: "MEDIUM", message: "Excessive idling detected (15+ mins)."}
        ]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Executive Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time overview of your fleet performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Vehicles" 
          value={vehicles.length || "0"} 
          change="+2 from yesterday" 
          icon={Truck} 
          trend="down"
          subtext="Total fleet: 24"
        />
        <StatCard 
          title="Avg Fuel Consumption" 
          value="4.2 L/100km" 
          change="-8.4%" 
          icon={Droplet} 
          trend="down"
          subtext="vs last week"
        />
        <StatCard 
          title="CO2 Reduced" 
          value="1.2 Tons" 
          change="+14.2%" 
          icon={Wind} 
          trend="down"
          subtext="this month"
        />
        <StatCard 
          title="Active Alerts" 
          value={alerts.length || "0"} 
          change="-2" 
          icon={Activity} 
          trend="down"
          subtext="since morning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Fuel Consumption Trend</h2>
            <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-emerald-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fuelData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="predicted" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorPredicted)" name="AI Predicted (L)" />
                <Area type="monotone" dataKey="consumption" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorConsumption)" name="Actual (L)" />
                <Legend verticalAlign="top" height={36} iconType="circle"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights & Alerts */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
             AI Insights & Alerts
          </h2>
          
          <div className="flex-1 overflow-y-auto space-y-4">
            {alerts.length > 0 ? alerts.map((alert, idx) => (
              <div key={idx} className={`p-4 rounded-lg border-l-4 ${alert.severity === 'CRITICAL' ? 'bg-red-50 border-red-500' : 'bg-amber-50 border-amber-500'}`}>
                <div className="flex gap-3">
                  <AlertCircle className={`w-5 h-5 ${alert.severity === 'CRITICAL' ? 'text-red-500' : 'text-amber-500'} shrink-0 mt-0.5`} />
                  <div>
                    <h4 className={`text-sm font-bold ${alert.severity === 'CRITICAL' ? 'text-red-800' : 'text-amber-800'}`}>{alert.type} - {alert.severity}</h4>
                    <p className="text-sm text-slate-700 mt-1">{alert.message}</p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-sm text-slate-600">No active alerts. Fleet operating normally.</p>
              </div>
            )}

            <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-lg mt-4">
              <h4 className="text-sm font-bold text-indigo-800 flex items-center gap-2">
                <Wind className="w-4 h-4" /> AI Recommendation
              </h4>
              <p className="text-sm text-indigo-700 mt-1">
                Route R-17 (Delhi to Jaipur) can reduce predicted fuel consumption by approximately 8% if optimized for current traffic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
