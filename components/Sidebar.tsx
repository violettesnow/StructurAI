
import React from 'react';
import { ICONS } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.Terminal },
    { id: 'library', label: 'Workflow Library', icon: ICONS.Workflow },
    { id: 'sources', label: 'Source Nodes', icon: ICONS.Drive },
    { id: 'brand', label: 'Brand Kit', icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )},
  ];

  return (
    <div className="w-64 border-r border-white/10 flex flex-col h-full bg-navy">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo to-magenta flex items-center justify-center font-bold text-white shadow-lg shadow-indigo/20">
            S
          </div>
          <span className="text-xl font-bold tracking-tight">StructurAI</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === item.id
                ? 'bg-indigo/10 text-indigo border border-indigo/20 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="glass rounded-xl p-4">
          <p className="text-[10px] text-gray-500 mb-2 font-bold tracking-widest uppercase">Scanning Engine</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-mono text-gray-300">Active Sync</span>
          </div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <div className="bg-gradient-to-right from-indigo to-magenta h-full w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
