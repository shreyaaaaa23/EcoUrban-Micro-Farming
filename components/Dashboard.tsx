
import React from 'react';
// Fixed: Link is required for navigation to the monitor page
import { Link } from 'react-router-dom';
// Fixed: Globe icon was missing from the lucide-react imports
import { Sun, Droplets, Thermometer, Wind, Plus, ChevronRight, Activity, Globe } from 'lucide-react';
import { Kit } from '../types';

const Dashboard: React.FC = () => {
  const [kits] = React.useState<Kit[]>([
    {
      id: '1',
      name: 'Radish Microgreens',
      type: 'microgreens',
      status: 'growing',
      health: 92,
      waterLevel: 45,
      lightHours: 12,
      plantedDate: '2023-10-20',
      image: 'https://picsum.photos/seed/micro/400/300'
    },
    {
      id: '2',
      name: 'Wasabi Alternative',
      type: 'herb',
      status: 'ready',
      health: 88,
      waterLevel: 80,
      lightHours: 8,
      plantedDate: '2023-09-15',
      image: 'https://picsum.photos/seed/herb/400/300'
    }
  ]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-1">Morning, Alex.</h2>
          <p className="text-slate-500">Your balcony ecosystem is thriving today.</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-md">
          <Plus size={20} />
          <span>Add New Kit</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Weather Widget */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Local Climate</h3>
            <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">Brooklyn, NY</span>
          </div>
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-amber-100 p-4 rounded-2xl">
              <Sun className="text-amber-600" size={32} />
            </div>
            <div>
              <p className="text-4xl font-bold">22°C</p>
              <p className="text-slate-500">Mostly Sunny</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Droplets className="mx-auto text-blue-400 mb-1" size={18} />
              <p className="text-sm font-bold">62%</p>
              <p className="text-[10px] text-slate-400 uppercase">Humidity</p>
            </div>
            <div className="text-center">
              <Wind className="mx-auto text-slate-400 mb-1" size={18} />
              <p className="text-sm font-bold">12 km/h</p>
              <p className="text-[10px] text-slate-400 uppercase">Wind</p>
            </div>
            <div className="text-center">
              <Thermometer className="mx-auto text-rose-400 mb-1" size={18} />
              <p className="text-sm font-bold">Low</p>
              <p className="text-[10px] text-slate-400 uppercase">Frost Risk</p>
            </div>
          </div>
        </div>

        {/* Global Impact */}
        <div className="bg-emerald-900 text-white p-6 rounded-3xl lg:col-span-2 relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col">
            <h3 className="font-bold text-lg mb-4">Sustainability Milestone</h3>
            <div className="flex flex-col md:flex-row md:items-end gap-8 mt-auto">
              <div className="flex-1">
                <p className="text-5xl font-bold mb-2">1.2 kg</p>
                <p className="text-emerald-300 text-sm">Carbon avoided this week by growing local edibles.</p>
              </div>
              <div className="flex-1">
                <div className="h-2 w-full bg-emerald-800 rounded-full mb-2 overflow-hidden">
                  <div className="h-full bg-emerald-400 w-3/4 rounded-full"></div>
                </div>
                <p className="text-xs text-emerald-400 uppercase font-bold tracking-wider">75% to Next Credit Tier</p>
              </div>
            </div>
          </div>
          <div className="absolute top-[-20px] right-[-20px] opacity-10">
            <Globe size={200} />
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6">Your Micro-Farm</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kits.map(kit => (
          <div key={kit.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col sm:flex-row group transition-all hover:shadow-md">
            <div className="w-full sm:w-48 h-48 flex-shrink-0 relative overflow-hidden">
              <img src={kit.image} alt={kit.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                kit.status === 'ready' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {kit.status}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-xl">{kit.name}</h4>
                  <p className="text-slate-400 text-sm capitalize">{kit.type}</p>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  <Activity size={14} />
                  <span className="font-bold text-sm">{kit.health}%</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Moisture</span>
                    <span className="font-bold">{kit.waterLevel}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{width: `${kit.waterLevel}%`}}></div>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between">
                {/* Fixed: Link usage requires Link import */}
                <Link to="/monitor" className="text-emerald-600 font-bold text-sm flex items-center gap-1 hover:underline">
                  Quick AI Scan <ChevronRight size={16} />
                </Link>
                <div className="text-slate-400 text-xs">
                  Planted {new Date(kit.plantedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
