import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LocateFixed } from 'lucide-react';

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getCustomIcon = (status) => {
  let color = 'green';
  if (status === 'In Transit') color = 'blue';
  if (status === 'Alert / Maintenance') color = 'red';
  
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const initialVehicles = [
  { id: 'GF-101', driver: 'Rahul Sharma', type: 'Heavy Truck', fuel: 82, speed: 65, trip: 'Bhilai → Raipur', eta: '45m', efficiency: '3.8 km/L', risk: 12, status: 'In Transit', route: [[21.1938, 81.3509], [21.2200, 81.5000], [21.2514, 81.6296]], progress: 0.1 },
  { id: 'GF-102', driver: 'Amit Patel', type: 'LCV', fuel: 45, speed: 72, trip: 'Durg → Nagpur', eta: '3h 15m', efficiency: '5.2 km/L', risk: 8, status: 'In Transit', route: [[21.1904, 81.2849], [21.1700, 80.5000], [21.1458, 79.0882]], progress: 0.3 },
  { id: 'GF-103', driver: 'Suresh Kumar', type: 'Medium Truck', fuel: 95, speed: 0, trip: 'Raipur Base', eta: 'N/A', efficiency: '4.1 km/L', risk: 2, status: 'Active', route: [[21.2514, 81.6296], [21.2514, 81.6296]], progress: 0 },
  { id: 'GF-104', driver: 'Vikram Singh', type: 'Heavy Truck', fuel: 12, speed: 0, trip: 'Nagpur Base', eta: 'N/A', efficiency: '2.8 km/L', risk: 85, status: 'Alert / Maintenance', route: [[21.1458, 79.0882], [21.1458, 79.0882]], progress: 0 },
  { id: 'GF-105', driver: 'Rajesh Verma', type: 'LCV', fuel: 64, speed: 52, trip: 'Raipur → Bilaspur', eta: '2h 10m', efficiency: '4.5 km/L', risk: 18, status: 'In Transit', route: [[21.2514, 81.6296], [21.7000, 81.9000], [22.0797, 82.1409]], progress: 0.5 },
  { id: 'GF-106', driver: 'Deepak Yadav', type: 'Heavy Truck', fuel: 28, speed: 45, trip: 'Nagpur → Jabalpur', eta: '4h 30m', efficiency: '3.1 km/L', risk: 42, status: 'In Transit', route: [[21.1458, 79.0882], [22.1000, 79.5000], [23.1815, 79.9864]], progress: 0.2 },
  { id: 'GF-107', driver: 'Manoj Tiwari', type: 'LCV', fuel: 88, speed: 30, trip: 'Bhilai Local', eta: '20m', efficiency: '5.5 km/L', risk: 5, status: 'In Transit', route: [[21.1938, 81.3509], [21.2000, 81.3600], [21.2100, 81.3800]], progress: 0.7 },
  { id: 'GF-108', driver: 'Sanjay Gupta', type: 'Medium Truck', fuel: 5, speed: 0, trip: 'Durg Depot', eta: 'N/A', efficiency: '3.9 km/L', risk: 92, status: 'Alert / Maintenance', route: [[21.1904, 81.2849], [21.1904, 81.2849]], progress: 0 }
];

const getPositionAtProgress = (route, progress) => {
  if (route.length === 1) return route[0];
  if (progress >= 1) return route[route.length - 1];
  if (progress <= 0) return route[0];
  
  const totalSegments = route.length - 1;
  const scaledProgress = progress * totalSegments;
  const segmentIndex = Math.floor(scaledProgress);
  const segmentProgress = scaledProgress - segmentIndex;
  
  const start = route[segmentIndex];
  const end = route[segmentIndex + 1];
  
  return [
    start[0] + (end[0] - start[0]) * segmentProgress,
    start[1] + (end[1] - start[1]) * segmentProgress
  ];
};

const ResetButton = ({ center, zoom }) => {
  const map = useMap();
  return (
    <button 
      onClick={() => map.flyTo(center, zoom)}
      className="absolute top-4 left-14 bg-white p-2 rounded shadow border border-slate-200 z-[400] hover:bg-slate-50 transition-colors"
      title="Reset View"
    >
      <LocateFixed className="w-5 h-5 text-slate-700" />
    </button>
  );
};

const LiveMap = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  const mapCenter = [21.5, 80.5];
  const mapZoom = 7;

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(v => {
        if (v.status !== 'In Transit') return v;
        
        let newProgress = v.progress + 0.005; 
        let newStatus = v.status;
        let newSpeed = v.speed;
        let newFuel = v.fuel;
        
        if (newProgress >= 1) {
          newProgress = 1;
          newStatus = 'Active';
          newSpeed = 0;
        } else {
          newSpeed = Math.max(20, Math.min(80, v.speed + (Math.random() * 10 - 5)));
          newFuel = Math.max(0, v.fuel - 0.05);
          if (newFuel < 15) {
             newStatus = 'Alert / Maintenance';
          }
        }
        
        return {
          ...v,
          progress: newProgress,
          speed: Math.round(newSpeed),
          fuel: Number(newFuel.toFixed(1)),
          status: newStatus
        };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const activeAlerts = vehicles.filter(v => v.status === 'Alert / Maintenance').length;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Live Fleet Map</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time telemetry and tracking</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
           <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
             <span className="text-sm font-medium text-slate-600">Vehicles:</span>
             <span className="font-bold text-slate-900">{vehicles.length}</span>
           </div>
           <div className="bg-red-50 px-4 py-2 rounded-lg border border-red-200 shadow-sm flex items-center gap-2">
             <span className="text-sm font-medium text-red-600">Active Alerts:</span>
             <span className="font-bold text-red-700">{activeAlerts}</span>
           </div>
           <div className={`px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 ${isOffline ? 'bg-amber-100 border border-amber-300' : 'bg-emerald-100 border border-emerald-300'}`}>
             <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`}></div>
             <span className={`text-sm font-bold ${isOffline ? 'text-amber-800' : 'text-emerald-800'}`}>MAP: {isOffline ? 'DEMO / OFFLINE' : 'ONLINE'}</span>
           </div>
        </div>
      </div>

      <div className={`flex-1 w-full rounded-xl overflow-hidden border border-slate-300 shadow-sm relative z-0 ${isOffline ? 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwem0yMCAyMGgyMHYyMEgyMHoiIGZpbGw9IiNmM2Y0ZjYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==")]' : 'bg-slate-100'}`}>
        
        {isOffline && (
           <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none opacity-20">
             <h2 className="text-6xl font-black text-slate-400 tracking-widest text-center leading-tight">GREENFLEET AI<br/>DEMO MAP</h2>
           </div>
        )}

        <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%', background: 'transparent' }}>
          <ResetButton center={mapCenter} zoom={mapZoom} />
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className={isOffline ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}
          />
          
          {vehicles.map((v) => {
            const currentPos = getPositionAtProgress(v.route, v.progress);
            const routeColor = v.status === 'Alert / Maintenance' ? '#ef4444' : (v.status === 'In Transit' ? '#3b82f6' : '#10b981');
            
            return (
              <React.Fragment key={v.id}>
                {v.route.length > 1 && (
                  <Polyline 
                    positions={v.route} 
                    color={routeColor} 
                    weight={4} 
                    opacity={0.6} 
                    dashArray={v.status === 'Alert / Maintenance' ? "5, 10" : undefined}
                  />
                )}
                
                <Marker position={currentPos} icon={getCustomIcon(v.status)}>
                  <Popup className="custom-popup">
                    <div className="font-sans min-w-[200px]">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-2">
                        <h3 className="font-bold text-slate-800 text-lg">{v.id}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded font-bold ${v.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : (v.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}`}>
                          {v.status}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-sm text-slate-600 mb-3">
                        <p><span className="font-medium text-slate-800">Driver:</span> {v.driver}</p>
                        <p><span className="font-medium text-slate-800">Type:</span> {v.type}</p>
                        <p><span className="font-medium text-slate-800">Trip:</span> {v.trip}</p>
                        {v.status === 'In Transit' && <p><span className="font-medium text-slate-800">ETA:</span> {v.eta}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-slate-50 p-2 rounded border border-slate-100">
                          <p className="text-xs text-slate-400">Speed</p>
                          <p className="font-bold text-slate-700">{v.speed} km/h</p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded border border-slate-100">
                          <p className="text-xs text-slate-400">Efficiency</p>
                          <p className="font-bold text-slate-700">{v.efficiency}</p>
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">Fuel Level</span>
                          <span className={`font-bold ${v.fuel > 20 ? 'text-emerald-600' : 'text-red-600'}`}>{v.fuel}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full">
                          <div className={`h-full rounded-full ${v.fuel > 20 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{width: `${v.fuel}%`}}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">Risk Score</span>
                          <span className={`font-bold ${v.risk > 50 ? 'text-red-600' : 'text-amber-600'}`}>{v.risk}/100</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full">
                          <div className={`h-full rounded-full ${v.risk > 50 ? 'bg-red-500' : 'bg-amber-500'}`} style={{width: `${v.risk}%`}}></div>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>
        
        {/* Legend */}
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 z-[400]">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-200 pb-2">Fleet Legend</h4>
          <div className="space-y-3 text-sm font-medium text-slate-700">
            <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-green-500 ring-2 ring-green-200"></div> Active</div>
            <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-200"></div> In Transit</div>
            <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-200"></div> Alert / Maintenance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
