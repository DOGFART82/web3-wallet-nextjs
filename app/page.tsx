import React, { useState, useEffect } from 'react';
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

/**
 * Grok Enterprise Node - Remix Kernel v0.54.0
 * النسخة الاحترافية بتنسيق Green Neon الكامل
 */

const App: React.FC = () => {
  const { isConnected, address } = useAccount();

  // State Management
  const [user, setUser] = useState({ 
    id: 'KRNL-0.54.0', 
    first_name: 'REMIX NODE', 
    photo_url: 'https://ui-avatars.com/api/?name=Remix&background=000&color=6EEB36' 
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFreeCheckOpen, setIsFreeCheckOpen] = useState(false);
  
  // Selection Sheets
  const [activeSheet, setActiveSheet] = useState<'amount' | 'core' | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<{amt: number, price: string} | null>(null);
  const [selectedCore, setSelectedCore] = useState<{name: string, file: string} | null>(null);

  const amounts = [100, 150, 300, 500, 1000, 2000, 3000, 4000, 5000];
  const basePrice = 14.99;

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      if (tg.initDataUnsafe?.user) {
        const u = tg.initDataUnsafe.user;
        setUser({
          id: `ID: ${u.id}`,
          first_name: (u.first_name + ' ' + (u.last_name || '')).toUpperCase(),
          photo_url: u.photo_url || user.photo_url
        });
      }
    }
  }, []);

  const handleDeploy = () => {
    if (!isConnected || !selectedAmount || !selectedCore) return;
    setIsLoading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 3; setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        window.location.href = `${selectedAmount.amt}.html`;
      }
    }, 30);
  };

  return (
    <div className="fixed inset-0 bg-black text-[#f0f0f0] font-['Inter'] select-none overflow-hidden flex flex-col">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_#0a1a05_0%,_#000_100%)] z-0" />

      {/* Loading & Modal Overlays (كما في الكود السابق) */}
      
      <div className="relative z-10 flex-1 flex flex-col pt-8">
        <header className="text-center mb-6">
          <h2 className="text-white text-[16px] font-bold tracking-tight mb-0.5 uppercase">{user.first_name}</h2>
          <span className="text-[#6EEB36] font-mono text-[10px] opacity-60 tracking-widest">{user.id}</span>
        </header>

        <div className="flex-1 bg-black/40 backdrop-blur-sm border-t-2 border-[#6EEB36]/50 rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,0,1)] relative flex flex-col px-6 pt-16">
          
          {/* Profile Container */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 rounded-[28px] p-[2px] bg-[#6EEB36] shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden">
              <img src={user.photo_url} className="w-full h-full rounded-[26px] object-cover" alt="Profile" />
            </div>
          </div>

          <div className="space-y-4 overflow-y-auto no-scrollbar pb-24">
            
            {/* Free Check (Pulse Action) */}
            <div onClick={() => setIsFreeCheckOpen(true)} className="bg-gradient-to-r from-[#6EEB36]/20 to-transparent border-2 border-[#6EEB36] p-4 rounded-2xl animate-pulse cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#6EEB36] p-1.5 rounded-lg"><img src="check.png" className="w-5 h-5" /></div>
                <div>
                  <h3 className="text-[#6EEB36] text-[14px] font-black italic uppercase">Free Check</h3>
                  <p className="text-white/60 text-[10px] font-bold uppercase">Verify Status</p>
                </div>
              </div>
            </div>

            {/* ConnectKit Section - Styled for Remix */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-white/30 uppercase tracking-widest ml-1">Connect Web3 Node</label>
              <div className="remix-connect-container">
                 <ConnectKitButton />
              </div>
            </div>

            {/* Core & Volume Selectors */}
            {/* ... المكونات التي أنشأناها في الرد السابق ... */}

          </div>

          {/* Action Button */}
          <div className="absolute bottom-6 left-6 right-6">
            <button 
              disabled={!isConnected || !selectedAmount || !selectedCore}
              onClick={handleDeploy}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all 
                ${(isConnected && selectedAmount && selectedCore) 
                  ? 'bg-[#6EEB36] text-black shadow-[0_10px_30px_rgba(110,235,54,0.3)] active:scale-95' 
                  : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
            >
              Deploy Smartcontract
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for ConnectKit Integration */}
      <style dangerouslySetInnerHTML={{ __html: `
        .remix-connect-container button {
          width: 100% !important;
          background: rgba(110, 235, 54, 0.05) !important;
          border: 1px solid rgba(110, 235, 54, 0.2) !important;
          border-radius: 1rem !important;
          height: 60px !important;
          font-weight: 800 !important;
          font-family: 'Inter', sans-serif !important;
          color: #6EEB36 !important;
          text-transform: uppercase !important;
          font-size: 14px !important;
          transition: 0.4s !important;
        }
        
        /* حالة الاتصال الناجح داخل الزر */
        .remix-connect-container button:hover {
          background: rgba(110, 235, 54, 0.1) !important;
          border-color: #6EEB36 !important;
        }

        /* تنسيق العنوان الفرعي والقوائم داخل مودال ConnectKit */
        :root {
          --ck-accent-color: #6EEB36;
          --ck-border-radius: 24px;
          --ck-body-background: #111111;
        }
      `}} />
    </div>
  );
};

export default App;
