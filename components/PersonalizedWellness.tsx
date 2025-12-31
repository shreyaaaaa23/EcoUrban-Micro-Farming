
import React, { useState } from 'react';
import { Dna, Heart, ShieldAlert, Sparkles, Loader2, Apple } from 'lucide-react';
import { getGeneticRecommendations } from '../services/geminiService';

const PersonalizedWellness: React.FC = () => {
  const [markers, setMarkers] = useState('Reduced iron absorption, high cortisol sensitivity');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    const recs = await getGeneticRecommendations(markers);
    setRecommendations(recs);
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <header className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Genetic Plant Recommendations</h2>
        <p className="text-slate-500 italic">"Let food be thy medicine." Partnered with BioTech Labs to sync your DNA profile for hyper-targeted nutrition.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Dna className="text-indigo-600" size={24} />
              <h3 className="font-bold">DNA Profile</h3>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Detected Markers</p>
                <textarea 
                  value={markers}
                  onChange={(e) => setMarkers(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium focus:outline-none resize-none"
                  rows={3}
                />
              </div>
            </div>

            <button 
              onClick={fetchRecommendations}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
              Generate Rx Plants
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-4">Analysis powered by Gemini 3 Flash & CRISPR-Insights™</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {!loading && recommendations.length === 0 && (
            <div className="bg-indigo-50 border-2 border-dashed border-indigo-100 rounded-3xl p-12 text-center text-indigo-400">
              <Apple className="mx-auto mb-4 opacity-50" size={48} />
              <p className="font-medium">Enter your markers or sync your profile to see recommendations.</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
              <p className="text-indigo-600 font-bold">Mapping molecular benefits...</p>
            </div>
          )}

          {!loading && recommendations.map((rec, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="bg-indigo-50 w-full sm:w-32 h-32 rounded-2xl flex-shrink-0 flex items-center justify-center">
                  <span className="text-4xl">🌱</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h4 className="text-2xl font-bold">{rec.name}</h4>
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                      <Heart size={12} /> {rec.benefit}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed italic mb-4">
                    "{rec.reason}"
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-800">
                      Add to Subscription
                    </button>
                    <button className="text-slate-500 text-sm font-bold hover:text-slate-700 px-2">
                      View Clinical Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedWellness;
