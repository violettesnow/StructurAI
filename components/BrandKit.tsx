
import React from 'react';
import { ICONS } from '../constants';

const BrandKit: React.FC = () => {
  const headlines = [
    { text: "Turn saved prompts into reusable workflows.", category: "Primary Transformation", usage: "Landing Hero" },
    { text: "Stop re-discovering what you already saved.", category: "Pain-Point focused", usage: "Marketing/Ads" },
    { text: "Systems over bookmarks. Building over collecting.", category: "Philosophical Mantra", usage: "About / Manifesto" },
    { text: "The automated pipeline from inspiration to implementation.", category: "Process Driven", usage: "Product Page" },
    { text: "Technical infrastructure for scattered prompt intelligence.", category: "Infrastructure Positioning", usage: "Enterprise / Technical Docs" }
  ];

  return (
    <div className="p-8 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <div className="inline-block px-3 py-1 rounded-full bg-indigo/10 border border-indigo/20 text-indigo text-[10px] font-bold uppercase tracking-widest mb-4">
          Brand Strategy
        </div>
        <h1 className="text-4xl font-bold mb-3 tracking-tight">Core Messaging Playbook</h1>
        <p className="text-gray-400 max-w-2xl">Professional, technical, and systematic. We build tools for serious builders who value systems over clutter.</p>
      </header>

      <section className="space-y-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <ICONS.Terminal className="w-5 h-5 text-indigo" />
          Approved Hero Headlines
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {headlines.map((headline, i) => (
            <div key={i} className="glass rounded-2xl p-8 border border-white/5 hover:border-indigo/20 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/5 rounded-lg text-xs font-mono text-gray-400 hover:text-indigo">Copy</button>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <p className="text-xs font-mono text-indigo mb-2 uppercase tracking-widest">{headline.category}</p>
                  <h3 className="text-2xl font-bold tracking-tight text-white leading-tight">{headline.text}</h3>
                </div>
                <div className="w-px h-12 bg-white/10 hidden md:block"></div>
                <div className="min-w-[140px]">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Recommended Usage</p>
                  <p className="text-sm text-gray-400">{headline.usage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-8 border-magenta/20 border">
          <h2 className="text-lg font-bold mb-4">Visual Identity Specs</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#6366f1] shadow-lg shadow-indigo/20"></div>
              <div>
                <p className="text-sm font-bold">Deep Purple</p>
                <p className="text-xs font-mono text-gray-500">#6366f1</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#ec4899] shadow-lg shadow-magenta/20"></div>
              <div>
                <p className="text-sm font-bold">Vibrant Magenta</p>
                <p className="text-xs font-mono text-gray-500">#ec4899</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 border-indigo/20 border">
          <h2 className="text-lg font-bold mb-4">Voice Rules</h2>
          <ul className="space-y-3">
            {[
              { label: "Active voice, lead with benefits", type: "do" },
              { label: "Direct and confident tone", type: "do" },
              { label: "Use 'AI-powered' or 'Revolutionary'", type: "dont" },
              { label: "Cutesy metaphors or emojis", type: "dont" },
            ].map((rule, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${rule.type === 'do' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {rule.type}
                </span>
                <span className="text-gray-300">{rule.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default BrandKit;
