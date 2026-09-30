import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Truck, 
  Map as MapIcon, 
  Route as RouteIcon, 
  AlertTriangle, 
  Settings,
  Leaf,
  Users
} from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Fleet', path: '/fleet', icon: Truck },
    { name: 'Live Map', path: '/map', icon: MapIcon },
    { name: 'Optimization', path: '/optimization', icon: RouteIcon },
    { name: 'Alerts', path: '/alerts', icon: AlertTriangle },
    { name: 'Environment', path: '/environment', icon: Leaf },
    { name: 'Drivers', path: '/drivers', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className={`w-64 bg-slate-900 text-white flex flex-col h-full border-r border-slate-800 absolute inset-y-0 left-0 z-50 transform md:relative md:translate-x-0 transition duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <Truck className="w-8 h-8 text-emerald-500" />
        <span className="text-xl font-bold tracking-tight">GREENFLEET <span className="text-emerald-500">AI</span></span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-emerald-600/10 text-emerald-500' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-xs text-slate-400 font-semibold mb-2 uppercase tracking-wider">System Status</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-200">All Systems Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
