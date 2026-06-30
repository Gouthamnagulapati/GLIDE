'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState('Talent Pool');
  const [search, setSearch] = useState('');
  
  // Filter States
  const [location, setLocation] = useState('All Cities');
  const [year, setYear] = useState('All Years');

  // Candidate Data
  const [candidates] = useState([
    { id: 1, name: "Alex Rivers", skills: ["React", "TypeScript"], location: "Hyderabad", year: 2024, stage: "Screening" },
    { id: 2, name: "Jordan Smith", skills: ["Python", "Postgres"], location: "Bangalore", year: 2023, stage: "Interviewing" },
    { id: 3, name: "Sam Wilson", skills: ["Next.js", "Tailwind"], location: "Pune", year: 2025, stage: "Sourced" },
  ]);

  const cities = ['Hyderabad', 'Bangalore', 'Pune', 'Mumbai', 'Delhi', 'Chennai', 'Gurgaon'];
  const years = ['2023', '2024', '2025', '2026'];
  const stages = ['Sourced', 'Screening', 'Interviewing', 'Offer', 'Hired'];

  const filteredCandidates = candidates.filter(c => 
    c.skills.some(s => s.toLowerCase().includes(search.toLowerCase())) &&
    (location === 'All Cities' || c.location === location) &&
    (year === 'All Years' || c.year.toString() === year)
  );

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex overflow-hidden relative selection:bg-indigo-500/30">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,#312e81_90deg,#581c87_180deg,#1e3a8a_270deg,transparent_360deg)] opacity-40 blur-3xl"
        />
      </div>

      {/* Sidebar Navigation */}
      <aside className="w-72 border-r border-white/10 bg-[#050505]/30 backdrop-blur-xl z-20 flex flex-col p-8">
        <h1 className="text-2xl font-black tracking-tighter mb-16">GLIDE</h1>
        <nav className="space-y-4">
          {['Dashboard', 'Talent Pool', 'Pipelines', 'Analytics'].map((item) => (
            <button 
              key={item} 
              onClick={() => setActiveTab(item)}
              className={`w-full text-left py-3 px-4 rounded-xl transition-all ${
                activeTab === item ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 z-20 p-12 overflow-y-auto">
        
        {/* TAB: TALENT POOL */}
        {activeTab === 'Talent Pool' && (
          <>
            <header className="mb-12">
              <h2 className="text-4xl font-bold mb-6">Talent Pool</h2>
              <div className="flex flex-wrap gap-4">
                <input
                  type="text"
                  placeholder="Filter by skill..."
                  className="py-3 px-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl focus:border-indigo-500 outline-none transition-all w-64"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select className="py-3 px-6 bg-[#050505] border border-white/10 rounded-2xl text-white outline-none focus:border-indigo-500 cursor-pointer appearance-none" onChange={(e) => setLocation(e.target.value)}>
                  <option value="All Cities" className="bg-[#050505]">All Cities</option>
                  {cities.map(c => <option key={c} value={c} className="bg-[#050505]">{c}</option>)}
                </select>
                <select className="py-3 px-6 bg-[#050505] border border-white/10 rounded-2xl text-white outline-none focus:border-indigo-500 cursor-pointer appearance-none" onChange={(e) => setYear(e.target.value)}>
                  <option value="All Years" className="bg-[#050505]">Passout Year</option>
                  {years.map(y => <option key={y} value={y} className="bg-[#050505]">{y}</option>)}
                </select>
              </div>
            </header>

            <div className="grid gap-4">
              <AnimatePresence mode="popLayout">
                {filteredCandidates.map((c) => (
                  <motion.div key={c.name} layout className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/10 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{c.name}</h3>
                      <p className="text-white/40 text-sm">{c.location} • Class of {c.year}</p>
                    </div>
                    <button className="text-xs font-bold hover:text-indigo-400">VIEW PROFILE</button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* TAB: PIPELINES */}
        {activeTab === 'Pipelines' && (
          <div className="h-full overflow-x-auto">
            <header className="mb-8">
              <h2 className="text-4xl font-bold">Pipelines</h2>
              <p className="text-white/40">Manage your hiring funnel.</p>
            </header>
            <div className="flex gap-6 min-w-max">
              {stages.map((stage) => (
                <div key={stage} className="w-72 flex flex-col gap-4">
                  <h3 className="font-bold text-white/60 uppercase text-xs tracking-widest px-2">{stage}</h3>
                  <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-md">
                    {candidates.filter(c => c.stage === stage).map(candidate => (
                      <motion.div key={candidate.id} className="p-4 bg-white/5 border border-white/10 rounded-xl mb-3 hover:bg-white/10 transition-all">
                        <p className="font-medium text-sm">{candidate.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DEFAULT STATE */}
        {activeTab !== 'Talent Pool' && activeTab !== 'Pipelines' && (
          <div className="flex items-center justify-center h-full text-white/20 italic">
            {activeTab} module coming soon...
          </div>
        )}
      </main>
    </div>
  );
}