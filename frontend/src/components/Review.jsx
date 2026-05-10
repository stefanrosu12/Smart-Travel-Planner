import { useEffect, useMemo, useState } from 'react';

const Review = ({ traseu, onInapoi }) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Stările pentru animații
  const [isFlying, setIsFlying] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [fadeIntro, setFadeIntro] = useState(false);
  const [uniqueId] = useState(() => 'exit-flight-' + Math.random().toString(36).substr(2, 9));

  const [allReviews, setAllReviews] = useState([
    { id: 1, user: 'Ioana', city: 'Cluj-Napoca', rating: 5, comment: 'Localuri superbe!', date: '1 săptămână în urmă' },
    { id: 2, user: 'Radu', city: 'Cluj-Napoca', rating: 5, comment: 'Centrul istoric este foarte frumos.', date: '5 zile în urmă' }
  ]);

  const actualCity = traseu?.oras || (traseu?.title?.includes(' în ') ? traseu.title.split(' în ').pop() : traseu?.title) || 'Cluj-Napoca';

  // LOGICA ECRANULUI DE START (Fereastra cu bifa din poză - stă fix 7 secunde)
  useEffect(() => {
    // Resetăm stările pentru a forța apariția LA FIECARE DESCHIDERE
    setShowIntro(true);
    setFadeIntro(false);
    setIsFlying(false); // ne asigurăm că avionul nu zboară la start

    // Începe fade-out-ul după 6 secunde
    const timerFade = setTimeout(() => {
      setFadeIntro(true);
    }, 6000);

    // Dispare complet din cod la fix 7 secunde
    const timerRemove = setTimeout(() => {
      setShowIntro(false);
    }, 7000);

    return () => {
      clearTimeout(timerFade);
      clearTimeout(timerRemove);
    };
  }, [traseu]); // Se reactivează când se schimbă traseul

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/reviews');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setAllReviews(data.map((rev) => ({
              id: rev.id,
              user: rev.userName || rev.user || 'Anonim',
              city: rev.city || actualCity,
              rating: rev.rating || 0,
              comment: rev.comment || '',
              date: rev.date || 'Recent'
            })));
          }
        }
      } catch (error) {
        console.log('Backend unavailable, using mock data.');
      }
    };
    fetchReviews();
  }, [actualCity]);

  const filteredReviews = useMemo(() => {
    return allReviews.filter((rev) => rev.city.toLowerCase() === actualCity.toLowerCase());
  }, [allReviews, actualCity]);

  const averageRating = useMemo(() => {
    if (!filteredReviews.length) return '0.0';
    const total = filteredReviews.reduce((sum, item) => sum + (item.rating || 0), 0);
    return (total / filteredReviews.length).toFixed(1);
  }, [filteredReviews]);

  const distribution = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    filteredReviews.forEach((rev) => {
      if (rev.rating >= 1 && rev.rating <= 5) counts[rev.rating - 1] += 1;
    });
    return counts;
  }, [filteredReviews]);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setLoading(true);
    const newReview = { id: Date.now(), user: 'Tu', city: actualCity, rating, comment: comment.trim(), date: 'Acum' };

    try {
      await fetch('http://localhost:3000/api/reviews/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, routeId: traseu?.id || 1, rating, comment: comment.trim(), city: actualCity, userName: 'Tu' })
      });
    } catch (error) { console.log('Could not save to backend'); }

    setAllReviews([newReview, ...allReviews]);
    setComment(''); setRating(5); setHover(0); setLoading(false);
  };

  const handleBackWithPlaneAnimation = () => {
    setIsFlying(true);
    // Așteptăm să termine avionul zborul tău spiralat
    setTimeout(() => { if (onInapoi) onInapoi(); }, 5000);
  };

  return (
    <div className="fixed inset-0 z-[999] w-screen h-[100dvh] overflow-hidden font-sans bg-[#0f172a]">
      
      <style>{`
        @keyframes bounce-short {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes routeFade {
          0% { opacity: 0; }
          10% { opacity: 0.3; }
          85% { opacity: 0.3; }
          100% { opacity: 0; }
        }
        @keyframes planeOpacity {
          0% { opacity: 0; }
          5% { opacity: 1; }
          70% { opacity: 1; }
          75% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes pinAppearFade {
          0%, 74% { opacity: 0; transform: translateY(-20px) scale(0); }
          76% { opacity: 1; transform: translateY(5px) scale(1.2); }
          80% { opacity: 1; transform: translateY(0) scale(1); }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes pinPulse {
          0%, 74% { opacity: 0; transform: scale(0.8); }
          75% { opacity: 0.6; transform: scale(0.8); }
          85% { opacity: 0; transform: scale(3); }
          100% { opacity: 0; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
      `}</style>

      {/* ======================================================================
          1. ECRANUL DE START (Fereastra Glassmorphism cu bifa)
          - Apare la început, stă fix 7 secunde.
          ====================================================================== */}
      {showIntro && (
        <div 
          className={`fixed inset-0 z-[9999999] bg-[#0a0f1e]/95 backdrop-blur-md flex items-center justify-center transition-all duration-1000 ease-in-out ${fadeIntro ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}
        >
          {/* Fereastra de sticlă efectivă */}
          <div className="relative bg-[#1a2235]/80 border border-white/10 p-10 rounded-[40px] shadow-2xl max-w-md w-full mx-4 flex flex-col items-center text-center">
            {/* Cercul cu Bifa */}
            <div className="w-20 h-20 mb-8 bg-[#2563eb] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)] animate-bounce-short">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {/* Titlul */}
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4 italic" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
              TUR FINALIZAT!
            </h1>
            {/* Subtitlul */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
              Sperăm că te-ai bucurat de vizita în <span className="font-bold text-white">{actualCity}</span>. Spune-ne cum a fost experiența ta!
            </p>
          </div>
        </div>
      )}

      {/* ======================================================================
          2. ANIMAȚIA TA CU AVIONUL (La închidere, cu spirală)
          ====================================================================== */}
      {isFlying && (
        <div className="absolute inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
          <svg key={uniqueId} className="w-full h-full absolute inset-0" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <path
              id={`route-${uniqueId}`}
              d="M -100,550 Q 400,100 900,280" 
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="3"
              strokeDasharray="12 12"
              style={{ opacity: 0, animation: 'routeFade 6s ease-in-out forwards' }}
            />
            <g transform="translate(900, 280)">
              <circle cx="0" cy="0" r="15" fill="#ef4444" style={{ opacity: 0, animation: 'pinPulse 6s ease-out forwards' }} />
              <path
                d="M0,0 C-12,-12 -18,-24 -18,-33 C-18,-43 -10,-51 0,-51 C10,-51 18,-43 18,-33 C18,-24 12,-12 0,0 Z M0,-38 C-2.8,-38 -5,-35.8 -5,-33 C-5,-30.2 -2.8,-28 0,-28 C2.8,-28 5,-30.2 5,-33 C5,-35.8 2.8,-38 0,-38 Z"
                fill="#ef4444"
                className="drop-shadow-2xl"
                style={{ opacity: 0, animation: 'pinAppearFade 6s ease-out forwards' }}
              />
            </g>
            <g style={{ opacity: 0, animation: 'planeOpacity 6s ease-in-out forwards' }}>
              <animateMotion
                dur="4.5s"
                fill="freeze"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.4 0 0.2 1"
                rotate="auto"
              >
                <mpath href={`#route-${uniqueId}`} />
              </animateMotion>
              <g transform="scale(1.8) translate(-12, -12) rotate(90, 12, 12)">
                 <path 
                   fill="#ffffff" 
                   d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" 
                   className="drop-shadow-[0_4px_10px_rgba(255,255,255,0.4)]"
                 />
              </g>
            </g>
          </svg>
        </div>
      )}

      {/* ======================================================================
          3. INTERFAȚA DE REVIEW
          ====================================================================== */}
      <div 
        className={`relative inset-0 w-full h-full flex items-center justify-center transition-all duration-1000 ${isFlying || showIntro ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      >
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2056')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a] via-transparent to-[#0f172a]" />

        <div className="relative z-10 w-full max-w-[1000px] h-[85vh] px-6 flex flex-col text-white">
          <div className="flex-shrink-0 mb-6 text-center mt-4">
            <p className="text-xs uppercase font-bold tracking-[0.4em] text-blue-400">FEEDBACK VIZITATOR</p>
            <h1 className="text-4xl font-black text-white tracking-tight">{actualCity}</h1>
          </div>

          <div className="flex-1 min-h-0 grid gap-6 lg:grid-cols-2">
            {/* STÂNGA */}
            <div className="flex flex-col gap-6">
              <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-[30px] flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-widest">Rating Mediu</span>
                  <div className="text-5xl font-black text-white mt-1">{averageRating}</div>
                </div>
                <div className="flex flex-col gap-1">
                  {[5, 4, 3, 2, 1].map((s, idx) => {
                    const procent = (distribution[4-idx]/Math.max(1, filteredReviews.length)) * 100;
                    return (
                      <div key={s} className="flex items-center gap-2 text-[10px]">
                        <span className="w-4 text-right opacity-50">{s}★</span>
                        <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400" style={{ width: `${procent}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-[30px] flex-1 flex flex-col shadow-xl">
                 <h3 className="text-xl font-bold mb-4">Evaluare</h3>
                 <div className="flex gap-2 mb-6 text-3xl">
                    {[...Array(5)].map((_, i) => (
                      <button key={i} onMouseEnter={() => setHover(i + 1)} onMouseLeave={() => setHover(0)} onClick={() => setRating(i + 1)} className={`transition-transform active:scale-90 ${i + 1 <= (hover || rating) ? 'text-amber-400' : 'text-white/20'}`}>★</button>
                    ))}
                 </div>
                 <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Cum a fost experiența ta?" className="w-full flex-1 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-blue-500/50 resize-none" />
                 <button onClick={handleSubmit} disabled={loading || !comment.trim()} className="mt-4 w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg transition-all">
                   {loading ? 'Se trimite...' : 'Trimite Recenzia'}
                 </button>
              </div>
            </div>

            {/* DREAPTA */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-[30px] flex flex-col min-h-0 shadow-xl">
               <div className="mb-4 flex justify-between items-end">
                  <h3 className="text-xl font-bold">Alte experiențe</h3>
                  <span className="text-xs text-blue-400">{filteredReviews.length} recenzii</span>
               </div>
               <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                  {filteredReviews.map(rev => (
                    <div key={rev.id} className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm">{rev.user}</span>
                        <div className="flex text-amber-400 text-[10px]">
                          {[...Array(5)].map((_, i) => <span key={i} className={i < rev.rating ? 'opacity-100' : 'opacity-20'}>★</span>)}
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs italic">"{rev.comment}"</p>
                    </div>
                  ))}
               </div>
               <button 
                  onClick={handleBackWithPlaneAnimation} 
                  disabled={isFlying}
                  className="mt-6 border border-white/20 bg-black/40 py-3 rounded-xl text-xs font-bold tracking-widest hover:bg-white/10 transition-colors uppercase"
               >
                 ← ÎNAPOI LA ITINERARIU
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;