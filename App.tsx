
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Sprout, 
  LayoutDashboard, 
  Dna, 
  Users, 
  Globe, 
  Camera, 
  Plus, 
  Droplets, 
  Sun, 
  Activity,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Repeat,
  Leaf
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import KitMonitor from './components/KitMonitor';
import PersonalizedWellness from './components/PersonalizedWellness';
import Community from './components/Community';
import Sustainability from './components/Sustainability';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Navigation Sidebar */}
        <nav className="w-full md:w-64 bg-emerald-900 text-emerald-50 p-6 flex-shrink-0 sticky top-0 md:h-screen z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-emerald-500 p-2 rounded-xl">
              <Leaf className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">EcoUrban</h1>
          </div>
          
          <div className="space-y-2">
            <NavLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <NavLink to="/monitor" icon={<Camera size={20} />} label="AI Kit Monitor" />
            <NavLink to="/wellness" icon={<Dna size={20} />} label="Bio-Nutrition" />
            <NavLink to="/community" icon={<Users size={20} />} label="Urban Hub" />
            <NavLink to="/eco" icon={<Globe size={20} />} label="Eco Tracker" />
          </div>

          <div className="mt-auto pt-10 border-t border-emerald-800 hidden md:block">
            <div className="bg-emerald-800/50 p-4 rounded-xl">
              <p className="text-xs uppercase font-bold text-emerald-400 mb-2">Green Credits</p>
              <div className="flex items-center gap-2">
                <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse"></div>
                <span className="text-lg font-bold">1,240 <span className="text-xs font-normal opacity-70">ECU</span></span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/monitor" element={<KitMonitor />} />
            <Route path="/wellness" element={<PersonalizedWellness />} />
            <Route path="/community" element={<Community />} />
            <Route path="/eco" element={<Sustainability />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
        isActive 
          ? 'bg-emerald-500 text-white shadow-lg' 
          : 'hover:bg-emerald-800/50 text-emerald-100'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default App;
