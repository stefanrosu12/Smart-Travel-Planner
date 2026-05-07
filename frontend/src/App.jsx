import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        {/* Navbar-ul va fi vizibil pe toate paginile */}
        <Navbar />

        <main>
          <Routes>
            {/* 1. Pagina de Start (Landing Page) */}
            <Route
              path="/"
              element={
                <section className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-24 text-center">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-sm">
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400 font-bold">Smart Travel Planner</p>
                    <h1 className="text-4xl font-black text-white sm:text-6xl tracking-tighter">
                      PLANIFICĂ EXPERIENȚA TA <br/> DE LUX CU STIL
                    </h1>
                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400">
                      Descoperă destinații rafinate, itinerarii personalizate prin AI și o interfață premium creată pentru călătorii moderni.
                    </p>
                  </div>
                </section>
              }
            />

            {/* 2. Rutele tale funcționale */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* 3. Pagina principală după Login (Ecranul Split) */}
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;