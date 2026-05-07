import { useState } from 'react';
import './App.css';

function App() {
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

  // ECRAN 1: BIROUL DE PLANIFICARE
  if (ecran === 'formular') {
    return (
      <div className="app-card">
        <div className="brand-header">
          <div className="logo">🌍 TravelAdvisor</div>
          <div className="tagline">Personal Concierge</div>
        </div>
        
        <form className="form-section" onSubmit={handleGenerare}>
          <div className="input-group">
            <label>Destinație</label>
            <input type="text" value={oras} onChange={(e) => setOras(e.target.value)} required placeholder="Introduceți orașul dorit" />
          </div>
          <div className="input-group">
            <label>Detalii Itinerariu</label>
            <textarea rows="2" value={dorinta} onChange={(e) => setDorinta(e.target.value)} required placeholder="Preferințe (ex: arhitectură, cafenele)" />
          </div>
          {!loading ? (
            <button type="submit" className="btn-prime">Creează Planul</button>
          ) : (
            <div className="loader">Pregătim selecția de locații...</div>
          )}
        </form>
      </div>
    );
  }

  // ECRAN 2: ITINERARIUL FINAL
  if (ecran === 'detalii') {
    return (
      <div className="app-card">
        <div className="brand-header">
          <div className="logo">TravelAdvisor</div>
          <div className="tagline">Itinerariu {renderSafe(traseuSalvat?.oras)}</div>
        </div>
        
        <div className="timeline">
          {traseuSalvat?.places && traseuSalvat.places.map((place, index) => (
            <div key={index} className="timeline-item">
              <div className="location-name">{renderSafe(place)}</div>
            </div>
          ))}
        </div>

        <div className="form-section">
          {!traseuInDesfasurare ? (
            <button className="btn-prime" onClick={() => setTraseuInDesfasurare(true)}>Confirmă & Începe</button>
          ) : (
            <button className="btn-prime" onClick={() => setEcran('review')}>Încheie Vizita</button>
          )}
          <button className="btn-ghost" onClick={() => setEcran('formular')}>Altă Destinație</button>
        </div>
      </div>
    );
  }

  // ECRAN 3: RECENZIE
  if (ecran === 'review') {
    return (
      <div className="app-card">
        <div className="brand-header">
          <div className="logo">TravelAdvisor</div>
          <div className="tagline">Gânduri de final</div>
        </div>
        
        <form className="form-section" onSubmit={(e) => { e.preventDefault(); setEcran('formular'); }}>
          <div className="input-group">
            <label>Evaluare (1-5)</label>
            <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Comentariile Dumneavoastră</label>
            <textarea value={comentariu} onChange={(e) => setComentariu(e.target.value)} required />
          </div>
          <button type="submit" className="btn-prime">Trimite Recenzia</button>
        </form>
      </div>
    );
  }
}

export default App;