
import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  Droplets, 
  Zap, 
  Truck, 
  ExternalLink, 
  Info, 
  CheckCircle, 
  Leaf, 
  ArrowRight,
  Gift,
  TreePine,
  Wrench
} from 'lucide-react';
import { BlockchainTransaction } from '../types';

const Sustainability: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'ledger' | 'redeem'>('overview');

  const transactions: BlockchainTransaction[] = [
    { 
      hash: '0x8f2a...3d9e', 
      type: 'FOOD_MILES', 
      amount: 12.4, 
      unit: 'kg-km',
      description: 'Harvested 500g radish microgreens (Saved 25km delivery journey)',
      timestamp: '12m ago', 
      credits: 12 
    },
    { 
      hash: '0x1c4d...e2f1', 
      type: 'WATER_SAVED', 
      amount: 45.2, 
      unit: 'Liters',
      description: 'Hydro-recirculation vs Soil traditional farming delta',
      timestamp: '1h ago', 
      credits: 45 
    },
    { 
      hash: '0x4a2c...b112', 
      type: 'ENERGY_EFFICIENCY', 
      amount: 2.1, 
      unit: 'kWh',
      description: 'Optimized AI light scheduling vs standard 12h timer',
      timestamp: '3h ago', 
      credits: 21 
    },
    { 
      hash: '0x9b7e...a4b2', 
      type: 'LOCAL_TRADE', 
      amount: 1.2, 
      unit: 'kg CO2e',
      description: 'P2P Trade with Neighbor (Zero-waste exchange)',
      timestamp: '4h ago', 
      credits: 25 
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-24">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-widest">
              Eco-Impact Protocol v3.0
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-2">CarbonChain™ Ledger</h2>
          <p className="text-slate-500 max-w-xl">Every gram harvested is a victory for the planet. Your metrics are recorded on-chain to provide immutable proof of urban farming efficiency.</p>
        </div>
        
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex items-center gap-6 border border-slate-700">
          <div className="bg-emerald-500/20 p-4 rounded-2xl border border-emerald-500/40">
            <Leaf className="text-emerald-400" size={32} />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Your Green Balance</p>
            <p className="text-3xl font-bold flex items-baseline gap-1">
              1,240 <span className="text-sm font-normal text-emerald-400">ECU</span>
            </p>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
        <TabButton active={activeView === 'overview'} onClick={() => setActiveView('overview')} label="Impact Logic" />
        <TabButton active={activeView === 'ledger'} onClick={() => setActiveView('ledger')} label="Blockchain Ledger" />
        <TabButton active={activeView === 'redeem'} onClick={() => setActiveView('redeem')} label="Redeem Credits" />
      </div>

      {activeView === 'overview' && (
        <div className="space-y-12">
          {/* Main Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ImpactCard 
              icon={<Truck size={24} className="text-rose-500" />} 
              label="Food Miles Mitigated" 
              value="1,240 km" 
              sub="Direct consumption post-harvest" 
            />
            <ImpactCard 
              icon={<Droplets size={24} className="text-blue-500" />} 
              label="Water Savings" 
              value="420 L" 
              sub="vs traditional industrial soil farming" 
            />
            <ImpactCard 
              icon={<Zap size={24} className="text-amber-500" />} 
              label="Energy Optimization" 
              value="184 kWh" 
              sub="Saved via AI light scheduling" 
            />
          </div>

          {/* Logic Breakdown Section */}
          <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Info className="text-emerald-600" /> 
              How You Earn Credits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <LogicStep 
                title="Zero Miles" 
                desc="1 ECU earned for every 10 kg-miles of food delivery distance avoided by harvesting at home."
                icon={<Truck size={20} />}
                color="bg-rose-50 text-rose-600"
              />
              <LogicStep 
                title="Hydro-Efficiency" 
                desc="5 ECU per 10 liters of water saved compared to traditional irrigation methods."
                icon={<Droplets size={20} />}
                color="bg-blue-50 text-blue-600"
              />
              <LogicStep 
                title="Smart Lighting" 
                desc="10 ECU per kWh saved using our weather-adaptive dynamic LED cycle."
                icon={<Zap size={20} />}
                color="bg-amber-50 text-amber-600"
              />
              <LogicStep 
                title="Circular Economy" 
                desc="25 ECU bonus for every local trade or seed share facilitated through the community hub."
                icon={<Globe size={20} />}
                color="bg-indigo-50 text-indigo-600"
              />
            </div>
          </section>
        </div>
      )}

      {activeView === 'ledger' && (
        <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                <ShieldCheck className="text-emerald-400" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Transaction Explorer</h3>
                <p className="text-slate-500 text-xs">Proof-of-Sustainability Ledger History</p>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-emerald-400 font-mono text-sm tracking-widest animate-pulse">● NETWORK SYNCED</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900">
                  <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Tx Hash / Time</th>
                  <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Type & Detail</th>
                  <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Impact Delta</th>
                  <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Credit Reward</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {transactions.map((tx, i) => (
                  <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-6">
                      <p className="text-emerald-400 font-mono text-sm mb-1">{tx.hash}</p>
                      <p className="text-slate-500 text-[10px] font-bold uppercase">{tx.timestamp}</p>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold">
                           {tx.type.replace('_', ' ')}
                         </span>
                      </div>
                      <p className="text-slate-400 text-xs leading-tight max-w-xs">{tx.description}</p>
                    </td>
                    <td className="p-6">
                      <p className="text-slate-200 font-bold">+{tx.amount} <span className="text-slate-500 font-normal text-xs">{tx.unit}</span></p>
                    </td>
                    <td className="p-6 text-right">
                      <span className="bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-xl border border-emerald-500/30 font-bold text-sm inline-block">
                        +{tx.credits} ECU
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeView === 'redeem' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RedeemOption 
            icon={<Wrench size={24} />}
            title="Kit Hardware Upgrades"
            desc="Automated ph sensor, dynamic LED array, or ultrasonic foggers."
            cost={800}
            tag="hardware"
          />
          <RedeemOption 
            icon={<Gift size={24} />}
            title="Exclusive Seed Packs"
            desc="Rare heirloom varieties: Afghan Saffron, Blue Micro-Basil, or Wasabi rhizomes."
            cost={450}
            tag="seeds"
          />
          <RedeemOption 
            icon={<TreePine size={24} />}
            title="Reforestation Donation"
            desc="Fund the planting of 10 native trees in urban 'tiny forests' across your city."
            cost={1200}
            tag="charity"
          />
        </div>
      )}
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`px-8 py-4 font-bold text-sm transition-all whitespace-nowrap border-b-2 ${
      active ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400 hover:text-slate-600'
    }`}
  >
    {label}
  </button>
);

const ImpactCard: React.FC<{ icon: React.ReactNode; label: string; value: string; sub: string }> = ({ icon, label, value, sub }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-md">
    <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{label}</h4>
    <p className="text-3xl font-bold text-slate-900 mb-1">{value}</p>
    <p className="text-xs text-slate-500 leading-tight">{sub}</p>
  </div>
);

const LogicStep: React.FC<{ title: string; desc: string; icon: React.ReactNode; color: string }> = ({ title, desc, icon, color }) => (
  <div className="flex flex-col">
    <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const RedeemOption: React.FC<{ icon: React.ReactNode; title: string; desc: string; cost: number; tag: string }> = ({ icon, title, desc, cost, tag }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col hover:border-emerald-200 transition-colors group">
    <div className="flex justify-between items-start mb-6">
      <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase px-2 py-1 bg-slate-100 text-slate-500 rounded-md tracking-wider">{tag}</span>
    </div>
    <h4 className="text-xl font-bold mb-2">{title}</h4>
    <p className="text-sm text-slate-500 mb-8 flex-1 leading-relaxed">{desc}</p>
    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
      <div className="flex items-center gap-1 font-bold">
        <span className="text-emerald-600">{cost}</span>
        <span className="text-slate-400 text-xs">ECU</span>
      </div>
      <button className="bg-slate-900 text-white p-2 rounded-xl group-hover:bg-emerald-600 transition-all">
        <ArrowRight size={20} />
      </button>
    </div>
  </div>
);

export default Sustainability;
