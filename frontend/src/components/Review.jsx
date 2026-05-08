import { useState } from 'react';

const Review = ({ traseu, onInapoi }) => {
  const [rating, setRating] = useState(5);
  const [comentariu, setComentariu] = useState('');

  const orasText = traseu?.oras?.nume_locatie || traseu?.oras || 'destinație';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recenzie trimisă:", { rating, comentariu });
    onInapoi();
  };

  return (
    // min-h-full garantează că acoperă tot ecranul. 
    // py-8 și px-4 lasă loc de "respirat" pe ecrane foarte mici ca să nu se lipească de margini
    <div className="w-full min-h-full flex flex-col justify-center px-4 py-8">
      
      {/* w-full + max-w-2xl înseamnă: "Lățește-te cât poți, dar nu depăși dimensiunea unui laptop mic" */}
      {/* p-6 pe telefon, p-12 pe laptop */}
      <div className="m-auto w-full max-w-2xl bg-slate-900 border border-slate-700 p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl text-center shrink-0">
        
        <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
          <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Textul scade pe telefon (text-2xl) și crește pe laptop (text-4xl) */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tighter mb-3 md:mb-4 uppercase">
          Tur Finalizat!
        </h1>
        <p className="text-slate-400 mb-6 md:mb-8 text-sm md:text-lg">
          Sperăm că te-ai bucurat de vizita în <span className="text-white font-bold">{orasText}</span>. Spune-ne cum a fost experiența ta!
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 text-left">
          <div>
            <label className="block text-[10px] md:text-[11px] font-black uppercase text-slate-400 mb-2 tracking-widest">
              Evaluare (1-5 Stele)
            </label>
            <input 
              type="number" min="1" max="5" 
              value={rating} 
              onChange={(e) => setRating(e.target.value)} 
              className="w-full bg-slate-800 border border-slate-600 rounded-lg md:rounded-xl py-3 px-4 md:py-4 md:px-5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-bold" 
            />
          </div>
          <div>
            <label className="block text-[10px] md:text-[11px] font-black uppercase text-slate-400 mb-2 tracking-widest">
              Comentariu / Impresii
            </label>
            <textarea 
              value={comentariu} 
              onChange={(e) => setComentariu(e.target.value)} 
              placeholder="Scrie-ne părerea ta aici..." 
              className="w-full bg-slate-800 border border-slate-600 rounded-lg md:rounded-xl py-3 px-4 md:py-4 md:px-5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all resize-none" 
              rows="3" 
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 md:py-4 rounded-lg md:rounded-xl transition-all font-black text-sm md:text-base uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-[1.02]">
            Trimite Recenzia
          </button>
        </form>

      </div>
    </div>
  );
};

export default Review;