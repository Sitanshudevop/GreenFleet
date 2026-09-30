import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Fleet from './pages/Fleet';
import LiveMap from './pages/LiveMap';
import Optimization from './pages/Optimization';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Environment from './pages/Environment';
import Drivers from './pages/Drivers';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans relative w-full">
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <Topbar setIsSidebarOpen={setIsSidebarOpen} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 md:p-6 w-full">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/map" element={<LiveMap />} />
              <Route path="/optimization" element={<Optimization />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/environment" element={<Environment />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/settings" element={<Reports />} /> {/* Reports used for settings/reports fallback */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
