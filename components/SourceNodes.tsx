
import React from 'react';
import { ICONS } from '../constants';

const SourceNodes: React.FC = () => {
  const sources = [
    { id: 'x', name: 'X Bookmarks', icon: ICONS.X, connected: true, lastSync: '2m ago', color: 'bg-white/90 text-navy' },
    { id: 'gmail', name: 'Gmail Messages', icon: ICONS.Gmail, connected: true, lastSync: '14m ago', color: 'bg-red-500/10 text-red-500' },
    { id: 'drive', name: 'Google Drive Docs', icon: ICONS.Drive, connected: false, lastSync: 'N/A', color: 'bg-blue-500/10 text-blue-500' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold mb-2">Source Nodes</h1>
        <p className="text-gray-400">Control the ingestion pipeline for your prompt discovery.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((source) => (
          <div key={source.id} className={`glass rounded-2xl p-6 border transition-all ${source.connected ? 'border-white/10' : 'border-dashed border-white/20 opacity-60'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl ${source.color}`}>
                <source.icon className="w-6 h-6" />
              </div>
              <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${source.connected ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}>
                {source.connected ? 'Connected' : 'Disconnected'}
              </div>
            </div>
            <h3 className="text-lg font-bold mb-1">{source.name}</h3>
            <p className="text-sm text-gray-400 mb-6">Automatically scans and extracts prompts labeled with #ai-tools.</p>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs text-gray-500 font-mono">Sync: {source.lastSync}</span>
              <button className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${source.connected ? 'bg-white/5 hover:bg-white/10 text-gray-300' : 'bg-indigo hover:bg-indigo-hover text-white'}`}>
                {source.connected ? 'Settings' : 'Connect Node'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-8 border-indigo/20 border bg-gradient-to-br from-indigo/5 to-transparent">
        <div className="max-w-xl">
          <h2 className="text-xl font-bold mb-2">Custom Webhook Ingestion</h2>
          <p className="text-gray-400 mb-6">Send prompts directly to your StructurAI library from any third-party developer tool.</p>
          <div className="flex gap-4">
            <code className="flex-1 bg-navy-light px-4 py-3 rounded-xl border border-white/10 text-xs font-mono text-indigo flex items-center">
              https://api.structurai.com/v1/ingest?key=sk_...
            </code>
            <button className="bg-navy-lighter hover:bg-navy-light text-white px-6 py-3 rounded-xl text-xs font-bold border border-white/10 transition-all">
              Copy URL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceNodes;
