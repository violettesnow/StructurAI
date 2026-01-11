
import React, { useState } from 'react';
import { ICONS, MOCK_TEMPLATES } from '../constants';

interface TemplateLibraryProps {
  onShowToast: (msg: string) => void;
  onPreviewShared: (template: any) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onShowToast, onPreviewShared }) => {
  const [search, setSearch] = useState('');

  const filteredTemplates = MOCK_TEMPLATES.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleShare = (e: React.MouseEvent, template: any) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(template, null, 2));
    onShowToast('Template JSON copied to clipboard');
  };

  // Fixed the error: "Type 'void' is not assignable to type 'ReactNode'" by returning JSX.
  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">Workflow Library</h1>
          <p className="text-gray-400">Manage and deploy your structured AI prompt templates.</p>
        </div>
        <div className="relative w-full md:w-96">
          <ICONS.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search workflows by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-navy-light border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo/50 transition-colors text-white"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div 
            key={template.id} 
            className="glass rounded-2xl p-6 border border-white/5 hover:border-indigo/20 transition-all group flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-indigo uppercase tracking-widest bg-indigo/10 border border-indigo/20 px-2 py-1 rounded">
                {template.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                <ICONS.Terminal className="w-3 h-3" />
                {template.usageCount} calls
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-indigo transition-colors text-white">{template.name}</h3>
            <p className="text-sm text-gray-400 mb-6 flex-1 line-clamp-3 leading-relaxed">
              {template.description}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <button 
                onClick={(e) => handleShare(e, template)}
                className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                title="Copy JSON"
              >
                <ICONS.Link className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => onPreviewShared(template)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-gray-300 hover:bg-white/5 transition-colors"
                >
                  Preview
                </button>
                <button className="px-4 py-2 bg-indigo hover:bg-indigo-hover text-white rounded-lg text-xs font-bold shadow-lg shadow-indigo/20 transition-all active:scale-95">
                  Clone Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="py-20 text-center glass rounded-3xl border border-dashed border-white/10">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <ICONS.Search className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-300">No workflows found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
};

// Fixed the error: "Module '...TemplateLibrary' has no default export" by adding export default.
export default TemplateLibrary;
