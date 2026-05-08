import { useState } from 'react';
import Harta from './Map.jsx'; 

const Dashboard = () => {
  const [ecran, setEcran] = useState('formular');
  const [oras, setOras] = useState('');
  const [dorinta, setDorinta] = useState('');
  const [traseuSalvat, setTraseuSalvat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [traseuInDesfasurare, setTraseuInDesfasurare] = useState(false);
  const [rating, setRating] = useState(5);
  const [comentariu, setComentariu] = useState('');

  // Funcție critică pentru a preveni erorile de tip "Object as child"
  const renderSafe = (data) => {
    if (!data) return "";
    if (typeof data === 'object') return data.nume_locatie || "Locație selectată";
    return String(data);
  };

  const handleGenerare = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const raspuns = await fetch('http://localhost:3000/api/routes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oras, prompt_used: dorinta, places: [] }),
      });
      const data = await raspuns.json();
      if (raspuns.ok) {
        setTraseuSalvat(data.route);
        setEcran('detalii');
      }
    } catch (error) {
      alert("Conexiunea cu serverul a fost întreruptă.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-70px)] bg-slate-950 overflow-hidden text-slate-100">

      {/* 🤖 SIDEBAR STÂNGA: AI CHAT (30%) */}
      <div className="w-full lg:w-[400px] bg-slate-900 shadow-2xl z-10 flex flex-col border-r border-slate-700">

        {/* Header Asistent */}
        <div className="bg-slate-800 px-6 py-5 flex items-center justify-between">
          <h2 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
            <span className="animate-pulse">✨</span> AI Travel Assistant
          </h2>
        </div>

        {/* Zona Mesaje */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/50">
          {ecran === 'formular' && (
            <div className="bg-slate-800 border border-slate-700 text-slate-300 p-5 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed">
              Salut! Sunt asistentul tău specializat în atracții turistice. Spune-mi un oraș și îți voi pune pe hartă cele mai importante monumente și muzee!
            </div>
          )}

          {ecran === 'detalii' && traseuSalvat && (
            <div className="bg-slate-800 border border-slate-700 text-slate-300 p-5 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed">
              <strong>Itinerariu pentru {renderSafe(traseuSalvat?.oras)}:</strong>
              <ul className="mt-3 space-y-2">
                {traseuSalvat?.places && traseuSalvat.places.map((place, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-slate-400">•</span> {renderSafe(place)}
                  </li>
                ))}
              </ul>
              {!traseuInDesfasurare ? (
                <button
                  className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-all"
                  onClick={() => setTraseuInDesfasurare(true)}
                >
                  Confirmă & Începe
                </button>
              ) : (
                <button
                  className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-all"
                  onClick={() => setEcran('review')}
                >
                  Încheie Vizita
                </button>
              )}
              <button
                className="mt-2 w-full bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded-lg transition-all"
                onClick={() => setEcran('formular')}
              >
                Altă Destinație
              </button>
            </div>
          )}

          {ecran === 'review' && (
            <div className="bg-slate-800 border border-slate-700 text-slate-300 p-5 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed">
              Mulțumesc pentru vizită! Te rog să ne lași o recenzie.
            </div>
          )}
        </div>

        {/* Input Chat / Formulare */}
        <div className="p-5 bg-slate-900 border-t border-slate-700">
          {ecran === 'formular' && (
            <form onSubmit={handleGenerare} className="space-y-4">
              <input
                type="text"
                value={oras}
                onChange={(e) => setOras(e.target.value)}
                placeholder="Spune-mi orașul..."
                className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 px-4 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-slate-500 transition-all"
                required
              />
              <textarea
                rows="2"
                value={dorinta}
                onChange={(e) => setDorinta(e.target.value)}
                placeholder="Detalii (ex: arhitectură, cafenele)..."
                className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 px-4 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-slate-500 transition-all resize-none"
                required
              />
              {!loading ? (
                <button
                  type="submit"
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg transition-all font-semibold"
                >
                  Generează Itinerariu
                </button>
              ) : (
                <div className="w-full bg-slate-700 text-white py-3 px-4 rounded-lg text-center">
                  Pregătim selecția de locații...
                </div>
              )}
            </form>
          )}

          {ecran === 'review' && (
            <form onSubmit={(e) => { e.preventDefault(); setEcran('formular'); }} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Evaluare (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 px-4 text-sm text-slate-100 focus:outline-none focus:border-slate-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Comentariile Dumneavoastră</label>
                <textarea
                  value={comentariu}
                  onChange={(e) => setComentariu(e.target.value)}
                  placeholder="Spune-ne părerea ta..."
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 px-4 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-slate-500 transition-all resize-none"
                  rows="3"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg transition-all font-semibold"
              >
                Trimite Recenzia
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 🗺️ ZONA DREAPTA: HARTA (70%) */}
<div className="flex-1 bg-slate-900 relative">
  {/* Componenta hartă cu traseu dinamic */}
  <Harta traseu={traseuSalvat} />
  
  {/* Label indicator */}
  <div className="absolute top-4 right-4 z-[1000]">
     <span className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-blue-400 border border-blue-500/30 uppercase tracking-widest shadow-2xl">
        {traseuSalvat ? `🎯 Itinerariu: ${traseuSalvat.oras}` : '📍 Cluj - Test Pins'}
     </span>
  </div>
</div>
    </div>
  );
};

export default Dashboard;