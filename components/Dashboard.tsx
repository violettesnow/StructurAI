
import React from 'react';
import { ICONS, MOCK_TEMPLATES } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="relative py-12 px-8 rounded-3xl overflow-hidden border border-white/5 glass">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo/10 blur-[80px] -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            SYSTEM ONLINE
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tighter max-w-2xl leading-tight">
            Turn saved prompts into <span className="gradient-text">reusable workflows</span>.
          </h1>
          <p className="text-lg text-gray-400 max-w-xl">
            Stop re-discovering what you already saved. StructurAI organizes your scattered bookmarks into production-ready infrastructure.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Prompts Processed', value: '1,248', icon: ICONS.Terminal, color: 'indigo' },
          { label: 'Active Workflows', value: '42', icon: ICONS.Workflow, color: 'magenta' },
          { label: 'Sources Connected', value: '3/5', icon: ICONS.Drive, color: 'gray' },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color === 'indigo' ? 'indigo' : stat.color === 'magenta' ? 'magenta' : 'gray'}-500/10 text-${stat.color === 'indigo' ? 'indigo' : stat.color === 'magenta' ? 'magenta' : 'gray'}-400 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-gray-500 uppercase">+12% delta</span>
            </div>
            <h3 className="text-sm font-medium text-gray-400">{stat.label}</h3>
            <p className="text-2xl font-bold mt-1 font-mono tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-6 border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold tracking-tight">System Ingestion Feed</h2>
            <button className="text-[10px] font-bold text-indigo uppercase tracking-widest hover:underline">Stream View</button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'X Bookmark: Advanced RAG Strategies', time: '2 mins ago', source: 'X' },
              { title: 'Email: System Prompt Template', time: '14 mins ago', source: 'Gmail' },
              { title: 'Drive Doc: Tech Stack Decision', time: '1 hour ago', source: 'Drive' },
              { title: 'X Bookmark: Shadcn/UI Patterns', time: '3 hours ago', source: 'X' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                <div className="p-2 rounded-lg bg-navy-lighter group-hover:bg-navy-light transition-colors">
                  {item.source === 'X' ? <ICONS.X className="w-4 h-4" /> : item.source === 'Gmail' ? <ICONS.Gmail className="w-4 h-4" /> : <ICONS.Drive className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <p className="text-[10px] font-mono text-gray-500 uppercase">{item.time}</p>
                </div>
                <span className="text-[10px] font-mono bg-indigo/10 text-indigo border border-indigo/20 px-2 py-1 rounded uppercase tracking-widest">Processing</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border-magenta/10 border bg-magenta/[0.02]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold tracking-tight">Production Workflows</h2>
            <button className="text-[10px] font-bold text-magenta uppercase tracking-widest hover:underline">Manage All</button>
          </div>
          <div className="space-y-4">
            {MOCK_TEMPLATES.map((tmpl) => (
              <div key={tmpl.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-magenta/20 transition-all cursor-pointer">
                <div className="flex-1">
                  <h4 className="text-sm font-bold tracking-tight">{tmpl.name}</h4>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">{tmpl.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono font-bold text-magenta">{tmpl.usageCount}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Calls</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
