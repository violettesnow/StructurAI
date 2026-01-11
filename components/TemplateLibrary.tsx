
import React, { useState } from 'react';
import { ICONS, MOCK_TEMPLATES } from '../constants';

const TemplateLibrary: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredTemplates = MOCK_TEMPLATES.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Workflow Library</h1>
          <p className="text-gray-400">Structured prompt systems extracted from your bookmarks.</p>
        </div>
        <button className="bg-indigo hover:bg-indigo-hover text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo/20">
          <ICONS.Plus className="w-4 h-4" />
          Create Template
        </button>
      </header>

      <div className="relative group">
        <ICONS.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo transition-colors" />
        <input
          type="text"
          placeholder="Search templates, tags, or categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-navy-light border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo/50 focus:ring-4 focus:ring-indigo/10 transition-all"
        />
      </div>

      <div className="overflow-hidden glass rounded-2xl border border-white/5">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Name</th>
              <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Category</th>
              <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Status</th>
              <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Usage</th>
              <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredTemplates.map((template) => (
              <tr key={template.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-semibold text-gray-200">{template.name}</div>
                    <div className="text-xs text-gray-500 line-clamp-1 mt-1">{template.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-navy-lighter border border-white/10 text-gray-400">
                    {template.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      template.status === 'active' ? 'bg-green-500' : 
                      template.status === 'ready' ? 'bg-indigo' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-xs font-medium capitalize text-gray-400">{template.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-gray-400">
                  {template.usageCount}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 rounded-lg hover:bg-indigo/10 text-gray-500 hover:text-indigo transition-all opacity-0 group-hover:opacity-100">
                    <ICONS.Workflow className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TemplateLibrary;
