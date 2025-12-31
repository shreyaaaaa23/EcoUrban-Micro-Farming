
import React, { useState } from 'react';
import { MessageSquare, Share2, Heart, Search, Filter, ShoppingBag, MapPin, Repeat } from 'lucide-react';
import { Post, TradeItem } from '../types';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'trade'>('feed');

  const posts: Post[] = [
    { id: '1', author: 'GreenThumb92', content: 'Harvested my wasabi microgreens today! The spice level is insane. Who wants some seeds?', timestamp: '2h ago', likes: 24, image: 'https://picsum.photos/seed/h1/800/400' },
    { id: '2', author: 'EcoMama', content: 'Tip for saffron growing in small spaces: Keep the humidity around 60% and use full-spectrum LEDs for at least 10 hours.', timestamp: '5h ago', likes: 56 }
  ];

  const trades: TradeItem[] = [
    { id: '1', owner: 'FarmerDave', name: 'Fresh Arugula', description: 'Grown hydroponically, very peppery. Swap for any root seeds.', distance: '0.4 miles away', type: 'produce' },
    { id: '2', owner: 'SkyGardens', name: 'Wasabi Rhizomes', description: 'Rare variety. Looking for adaptive LED controllers.', distance: '1.2 miles away', type: 'equipment' }
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Urban Hub</h2>
        <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('feed')}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'feed' ? 'bg-white shadow-sm' : 'text-slate-500'}`}
          >
            Community Feed
          </button>
          <button 
            onClick={() => setActiveTab('trade')}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'trade' ? 'bg-white shadow-sm' : 'text-slate-500'}`}
          >
            Trading Post
          </button>
        </div>
      </header>

      {activeTab === 'feed' ? (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 overflow-hidden">
              <img src="https://picsum.photos/100/100" alt="me" />
            </div>
            <input 
              type="text" 
              placeholder="Share a harvest update..." 
              className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <button className="bg-emerald-600 text-white p-3 rounded-2xl hover:bg-emerald-700">
              <Share2 size={20} />
            </button>
          </div>

          {posts.map(post => (
            <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100" />
                  <div>
                    <p className="font-bold text-slate-900">{post.author}</p>
                    <p className="text-xs text-slate-400">{post.timestamp}</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">{post.content}</p>
              </div>
              {post.image && <img src={post.image} alt="post" className="w-full h-80 object-cover" />}
              <div className="p-4 border-t border-slate-50 flex items-center gap-6">
                <button className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors font-medium">
                  <Heart size={20} /> {post.likes}
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors font-medium">
                  <MessageSquare size={20} /> Comment
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search local produce..." 
                className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <button className="bg-white border border-slate-200 p-4 rounded-2xl text-slate-500 hover:bg-slate-50">
              <Filter size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trades.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    item.type === 'produce' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.type}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <MapPin size={12} /> {item.distance}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-1">{item.name}</h4>
                <p className="text-slate-500 text-sm mb-6 flex-1">{item.description}</p>
                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100" />
                    <span className="text-xs font-bold">{item.owner}</span>
                  </div>
                  <button className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors">
                    <Repeat size={16} /> Propose Trade
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
