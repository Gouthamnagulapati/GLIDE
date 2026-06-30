'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DashboardPage() {
  const [days, setDays] = useState(6)
  const [expandedRow, setExpandedRow] = useState<number | null>(0)

  // Data with status percentage for the wave bar
  const timelineData = [
    { n: "Google (Via Greenhouse)", t: "Route A: ATS Ingest", s: "Shortlisted", width: "100%" },
    { n: "awdd", t: "Route A: ATS Ingest", s: "Applied", width: "33%" },
    { n: "Stripe", t: "Route B: ATS Ingest", s: "Applied", width: "33%" }
  ]

  return (
    <div className="min-h-screen bg-[#030611] text-zinc-300 p-8 font-mono relative overflow-hidden">
      {/* Fluid Background Animation */}
      <motion.div 
        animate={{ 
          background: [
            "radial-gradient(circle at 0% 0%, #1a103d 0%, #030611 50%)",
            "radial-gradient(circle at 100% 100%, #1a103d 0%, #030611 50%)",
            "radial-gradient(circle at 0% 0%, #1a103d 0%, #030611 50%)"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 z-0"
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-12">
            <h1 className="text-purple-500 font-bold tracking-[0.2em] text-lg">GLIDE ENGINE V2.6-FLUID</h1>
            <div className="flex gap-8 text-xs text-zinc-600">
              <span>◆ Liquid Timeline</span>
              <span>◆ Anti-Scam Shield</span>
            </div>
          </div>
          <div className="text-xs text-zinc-600">
            test@glide.com | <button className="hover:text-purple-400">Sign Out</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Matrix */}
          <div className="lg:col-span-8">
            <h2 className="text-purple-500 text-xs mb-8 tracking-[0.3em] uppercase">Liquid Timeline Matrix</h2>
            <div className="space-y-2">
              {timelineData.map((row, i) => (
                <div key={i} className="border-b border-white/5">
                  <div 
                    onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                    className="flex justify-between items-center py-6 hover:bg-white/[0.02] px-4 cursor-pointer transition-all"
                  >
                    <span className="text-sm w-1/3">{row.n}</span>
                    <span className="text-xs text-zinc-600 w-1/3 text-center">{row.t}</span>
                    <span className={`text-sm w-1/3 text-right ${i === 0 ? 'text-purple-400' : 'text-blue-400'}`}>
                      {row.s}
                    </span>
                  </div>
                  
                  <AnimatePresence>
                    {expandedRow === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-6 overflow-hidden bg-[#050812]/50"
                      >
                        <div className="flex justify-between text-[9px] text-zinc-500 uppercase tracking-widest mb-3">
                          <span>Applied</span>
                          <span>Recruiter Action</span>
                          <span>Result</span>
                        </div>
                        
                        {/* Wavy Fluid Progress Bar */}
                        <div className="h-[2px] bg-zinc-800 relative w-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: row.width }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-purple-500 relative overflow-hidden"
                          >
                            {/* Animated Wave Glow inside the segment */}
                            <motion.div 
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right Console */}
          <div className="lg:col-span-4 border-l border-white/5 pl-8">
            <h3 className="text-yellow-600 text-[10px] mb-12 tracking-[0.2em] uppercase">Accountability Telemetry Console</h3>
            
            <div className="space-y-12">
              <div className="space-y-4">
                <label className="text-[10px] text-zinc-600 block">SIMULATE DAYS ELAPSED: {days} / 14 DAYS</label>
                <input 
                  type="range" min="0" max="14" value={days} 
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-[2px] bg-zinc-800 appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div className="relative p-6 bg-white/[0.02] border border-white/[0.05]">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: 'linear-gradient(0deg, transparent 50%, white 50%)', backgroundSize: '100% 4px' }} />
                
                <div className="text-red-500 text-[10px] font-bold mb-6 tracking-widest flex items-center gap-2">
                  <span className="animate-pulse">●</span> SYSTEM AUTOMATED TRIGGER
                </div>
                
                <div className="text-[11px] text-zinc-500 space-y-3 font-mono">
                  <div className="flex justify-between"><span className="text-zinc-700">FROM:</span> <span className="text-zinc-300">system-agent@glide.engine</span></div>
                  <div className="flex justify-between"><span className="text-zinc-700">TO:</span> <span className="text-zinc-300">test@glide.com</span></div>
                  <div className="pt-4 border-t border-white/5 text-red-400/80">
                    SUBJECT: [CRITICAL] 14-Day Silence Warning: avdd Node Going Cold
                  </div>
                  <p className="leading-relaxed pt-2">
                    Telemetry confirms that your 99.9% optimized resume pipeline has recorded 14 days of absolute stillness.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[9px] text-zinc-700 pt-8 border-t border-white/5">
                <div>NODE STATUS: <span className="text-green-500">STABLE</span></div>
                <div>LATENCY: <span className="text-zinc-300">0.4ms</span></div>
                <div>BUFFER: <span className="text-zinc-300">42%</span></div>
                <div>UPTIME: <span className="text-zinc-300">99.99%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}