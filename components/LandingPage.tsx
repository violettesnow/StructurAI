import React, { useEffect, useRef, useState } from 'react';
import { ICONS } from '../constants';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isOrganized, setIsOrganized] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  const STRIPE_URL = "https://buy.stripe.com/YOUR_LINK_HERE";
  const LOGIN_URL = "https://app.structur.ai/login";

  const handleCtaClick = () => {
    window.location.href = STRIPE_URL;
  };

  const handleLoginClick = () => {
    window.location.href = LOGIN_URL;
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 150; // Optimized for mobile
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number; y: number;
      vx: number; vy: number;
      targetX: number; targetY: number;
      size: number; color: string;
      angle: number; speed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.targetX = this.x;
        this.targetY = this.y;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.2 + Math.random() * 0.4;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.size = Math.random() * 2 + 0.5;
        this.color = Math.random() > 0.5 ? '#6366f1' : '#ec4899';
      }

      update(organized: boolean) {
        if (!organized) {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0) this.x = canvas!.width;
          if (this.x > canvas!.width) this.x = 0;
          if (this.y < 0) this.y = canvas!.height;
          if (this.y > canvas!.height) this.y = 0;
        } else {
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          this.x += dx * 0.1;
          this.y += dy * 0.1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.3;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const setGridTargets = () => {
      const cols = 15;
      const spacing = 35;
      const startX = (canvas.width - (cols - 1) * spacing) / 2;
      const startY = (canvas.height - (Math.floor(particleCount / cols) - 1) * spacing) / 2;
      particles.forEach((p, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        p.targetX = startX + col * spacing;
        p.targetY = startY + row * spacing;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(isOrganized);
        p.draw();
      });

      if (isOrganized) {
        ctx.strokeStyle = '#6366f1';
        ctx.globalAlpha = 0.05;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          const p2 = particles[i + 1];
          if (p2 && i % 15 !== 14) {
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
          const pBelow = particles[i + 15];
          if (pBelow) {
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(pBelow.x, pBelow.y); ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    setGridTargets();
    animate();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'how-it-works' || entry.target.id === 'features') {
            setIsOrganized(true);
          } else {
            setIsOrganized(false);
          }
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isOrganized]);

  return (
    <div className="relative min-h-screen bg-[#0a0e1a] text-gray-100 selection:bg-indigo/30 selection:text-indigo-400 font-sans">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.1)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* PWA Install Banner */}
      {showInstallBtn && (
        <div className="fixed bottom-6 left-6 right-6 z-[100] glass p-5 rounded-3xl flex items-center justify-between border border-indigo/20 shadow-2xl animate-in slide-in-from-bottom-full duration-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo to-magenta flex items-center justify-center font-bold text-white text-xl shadow-lg">S</div>
            <div>
              <p className="text-sm font-bold text-white">StructurAI App</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Install for quick access</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowInstallBtn(false)} className="text-xs font-bold text-gray-500 uppercase tracking-widest px-3 py-2">Dismiss</button>
            <button onClick={handleInstallClick} className="bg-white text-navy px-5 py-2.5 rounded-2xl text-xs font-extrabold shadow-xl">Install</button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 flex justify-center p-4 md:p-6">
        <div className="max-w-6xl w-full glass px-6 md:px-8 py-3 rounded-full flex items-center justify-between border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo to-magenta flex items-center justify-center font-bold text-white shadow-lg">S</div>
            <span className="font-bold tracking-tight text-lg text-white">StructurAI</span>
          </div>
          <button onClick={handleLoginClick} className="bg-white hover:bg-gray-100 text-navy px-6 py-2 rounded-full text-xs font-extrabold transition-all shadow-xl active:scale-95">Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 text-center z-10 reveal opacity-0 translate-y-10 transition-all duration-1000">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-indigo font-bold tracking-[0.2em] mb-10 uppercase">
          <span className="w-1.5 h-1.5 bg-indigo rounded-full shadow-[0_0_8px_rgba(99,102,241,1)] animate-pulse"></span>
          Passive Scanning Engine
        </div>
        
        <h1 className="fluid-h1 mb-8 text-white max-w-5xl">
          Turn saved prompts into <br/>
          <span className="gradient-text">reusable workflows.</span>
        </h1>
        
        <p className="fluid-body text-gray-400 max-w-2xl mx-auto mb-12">
          Stop re-discovering what you already saved. StructurAI scans X bookmarks, Gmail, and Google Drive to organize scattered inspiration into production-ready infrastructure.
        </p>
        
        <button onClick={handleCtaClick} className="group relative px-12 py-5 bg-indigo text-white font-extrabold rounded-full transition-all shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:shadow-[0_0_50px_rgba(99,102,241,0.4)] transform hover:-translate-y-1 active:scale-95 overflow-hidden text-lg">
          <span className="relative z-10 flex items-center gap-2">
            Get Early Access - $29/mo
            <ICONS.Workflow className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo to-magenta opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>
      </section>

      {/* Pain Point Section */}
      <section id="problem" className="py-24 md:py-40 bg-navy-light/10 relative border-y border-white/5 reveal opacity-0 translate-y-10 transition-all duration-1000">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-red-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Critical Friction Detected
          </div>
          <h2 className="fluid-h2 mb-8 text-white">
            Your best prompts <br/><span className="text-red-500/80">are buried.</span>
          </h2>
          <p className="fluid-body text-gray-400 max-w-2xl mx-auto">
            You've bookmarked that perfect CoT technique on X. Emailed yourself a workflow. Saved examples to Drive. But when you're building? 
            <br/><br/>
            <span className="text-white font-bold">You can't find any of it.</span> Your inspiration becomes frustration.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 md:py-40 reveal opacity-0 translate-y-10 transition-all duration-1000">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24 text-center sm:text-left">
            <h2 className="fluid-h2 mb-6 text-white">Serious tools for builders.</h2>
            <p className="fluid-body text-gray-500">Infrastructure designed for developers who value systems over bookmarks.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard icon="🔍" title="Auto-Collect" desc="Scans X, Gmail, and Drive. No manual work required." color="indigo" />
            <FeatureCard icon="🏗️" title="Smart Organization" desc="AI-powered categorization and tagging." color="magenta" />
            <FeatureCard icon="⚡" title="Template Creation" desc="Transform examples into reusable workflows." color="indigo" />
            <FeatureCard icon="🔎" title="Powerful Search" desc="Semantic search by intent, not just keywords." color="white" />
            <FeatureCard icon="🔒" title="Private & Secure" desc="SOC 2 compliant. Your data stays yours." color="indigo" />
            <FeatureCard icon="🚀" title="Build Faster" desc="Proven techniques, ready to deploy in seconds." color="magenta" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-40 reveal opacity-0 translate-y-10 transition-all duration-1000">
        <div className="max-w-5xl mx-auto px-6">
          <div className="glass p-12 md:p-24 rounded-[3.5rem] text-center relative overflow-hidden border border-indigo/20">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo/20 via-magenta/10 to-transparent opacity-30"></div>
            <h2 className="fluid-h2 mb-8 text-white">Stop losing your <br/>best work.</h2>
            <p className="fluid-body text-gray-400 mb-12">Join developers who've organized 10,000+ prompts and saved 100+ hours.</p>
            <button onClick={handleCtaClick} className="w-full sm:w-auto px-12 py-5 bg-white text-navy font-extrabold rounded-2xl text-xl transition-all shadow-xl hover:scale-105">Get Early Access</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 md:py-20 border-t border-white/5 bg-[#0a0e1a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo to-magenta flex items-center justify-center font-bold text-white shadow-lg">S</div>
            <span className="font-bold tracking-tight text-xl text-white">StructurAI</span>
          </div>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
          <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">© 2025 StructurAI Inc.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color }: any) => (
  <div className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all group relative overflow-hidden">
    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-${color === 'indigo' ? 'indigo' : 'magenta'}/5 blur-3xl rounded-full`}></div>
    <div className={`w-14 h-14 rounded-2xl bg-${color === 'indigo' ? 'indigo' : color === 'magenta' ? 'magenta' : 'white'}/10 flex items-center justify-center mb-8 text-2xl group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

export default LandingPage;