
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TemplateLibrary from './components/TemplateLibrary';
import SourceNodes from './components/SourceNodes';
import BrandKit from './components/BrandKit';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'checkout' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleStartBuilding = () => {
    setView('checkout');
  };

  // Helper to show transient notifications
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    if (view === 'checkout') {
      const timer = setTimeout(() => {
        setView('app');
        showToast('System Ingestion Online');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  // Pass necessary handlers to TemplateLibrary to satisfy its required props.
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'library':
        return (
          <TemplateLibrary 
            onShowToast={showToast} 
            onPreviewShared={(template) => showToast(`Previewing: ${template.name}`)} 
          />
        );
      case 'sources':
        return <SourceNodes />;
      case 'brand':
        return <BrandKit />;
      default:
        return <Dashboard />;
    }
  };

  if (view === 'landing') {
    return <LandingPage onEnterApp={handleStartBuilding} />;
  }

  if (view === 'checkout') {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full glass p-10 rounded-[2.5rem] border-indigo/20 border text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo via-magenta to-indigo animate-pulse"></div>
          
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10">
            <svg className="w-8 h-8 text-indigo animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-white">Redirecting to Stripe...</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Please wait while we set up your secure checkout session for StructurAI Pro.
          </p>

          <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
            Secure Encryption Active
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-navy text-gray-100 font-sans selection:bg-indigo/30 selection:text-indigo-400 overflow-hidden animate-in fade-in duration-700">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-navy to-navy-light relative">
        {/* Dynamic Toast System */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-4 duration-500">
            <div className="glass px-6 py-3 rounded-full border-indigo/30 border bg-indigo/10 flex items-center gap-3 shadow-2xl">
              <div className="w-2 h-2 rounded-full bg-indigo animate-pulse"></div>
              <span className="text-xs font-bold text-indigo uppercase tracking-widest">{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Subtle glow elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo/5 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-magenta/5 blur-[100px] rounded-full -z-10"></div>
        
        <div className="max-w-7xl mx-auto min-h-full">
          <div className="p-4 flex justify-end">
            <button 
              onClick={() => setView('landing')}
              className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
