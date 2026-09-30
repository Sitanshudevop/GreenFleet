import React, { useState } from 'react';
import axios from 'axios';
import { Truck } from 'lucide-react';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('dispatcher@greenfleet.ai');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Mocking real backend login if it's down, but trying real first
      try {
        const res = await axios.post('http://localhost:8000/auth/login', { email, password });
        localStorage.setItem('token', res.data.access_token);
        setToken(res.data.access_token);
      } catch(err) {
        if (password === 'demo123') {
           localStorage.setItem('token', 'mock-token');
           setToken('mock-token');
        } else {
           setError('Invalid credentials');
        }
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  const handleDemoLogin = () => {
    localStorage.setItem('token', 'mock-token');
    setToken('mock-token');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="max-w-md w-full p-8 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
        <div className="flex items-center justify-center mb-8 gap-3">
          <Truck className="w-10 h-10 text-emerald-500" />
          <h1 className="text-3xl font-bold tracking-tight">GREENFLEET <span className="text-emerald-500">AI</span></h1>
        </div>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-6">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-lg transition-colors mt-4"
          >
            Sign In
          </button>

          <button 
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-lg transition-colors mt-3 border border-slate-600"
          >
            Quick Demo Login
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-slate-700 text-sm text-slate-400">
          <p className="font-semibold text-slate-300 mb-2">Demo Credentials:</p>
          <ul className="space-y-1">
            <li><span className="text-emerald-400">Dispatcher:</span> dispatcher@greenfleet.ai / demo123</li>
            <li><span className="text-emerald-400">Admin:</span> admin@greenfleet.ai / demo123</li>
            <li><span className="text-emerald-400">Driver:</span> driver@greenfleet.ai / demo123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
