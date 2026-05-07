import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-70px)] bg-slate-100 overflow-hidden text-slate-900">
      
      {/* 🤖 SIDEBAR STÂNGA: AI CHAT (30%) */}
      <div className="w-full lg:w-[400px] bg-white shadow-2xl z-10 flex flex-col border-r border-slate-200">
        
        {/* Header Asistent */}
        <div className="bg-slate-900 px-6 py-5 flex items-center justify-between">
          <h2 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
            <span className="animate-pulse">✨</span> Gemini AI Assistant
          </h2>
        </div>

        {/* Zona Mesaje */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          <div className="bg-white border border-slate-200 text-slate-700 p-5 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed">
            Bună! Sunt gata să îți planific vacanța perfectă. Unde vrei să mergem astăzi?
          </div>
        </div>

        {/* Input Chat */}
        <div className="p-5 bg-white border-t border-slate-100">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Întreabă Gemini AI..." 
              className="w-full bg-slate-100 border-2 border-transparent rounded-xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all shadow-inner"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white p-2.5 rounded-lg hover:bg-black transition-all active:scale-90">
              ➤
            </button>
          </div>
        </div>
      </div>

      {/* 🗺️ ZONA DREAPTA: HARTA (70%) */}
      <div className="flex-1 bg-slate-200 relative flex items-center justify-center overflow-hidden">
        {/* Imagine de fundal tip hartă (Placeholder până o pune colega) */}
        <div className="absolute inset-0 opacity-20 grayscale" 
             style={{backgroundImage: 'url("https://www.google.com/maps/d/thumbnail?mid=1_75Zk4O1pYm_M8V5l6aE6G6Z6-E")', backgroundSize: 'cover'}}>
        </div>

        <div className="relative z-10 text-center p-10 bg-white/40 backdrop-blur-md rounded-3xl border border-white/20">
          <h1 className="text-5xl font-black text-slate-800/20 uppercase tracking-[0.5em] select-none">
            Interactive Map
          </h1>
          <p className="text-slate-600 mt-4 font-bold">Modulul colegei de frontend</p>
        </div>

        {/* Butonul de acțiune flotant */}
        <div className="absolute bottom-10 right-10">
          <button className="bg-slate-900 text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-y-2 transition-all duration-300 active:scale-95">
            Start Journey
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;