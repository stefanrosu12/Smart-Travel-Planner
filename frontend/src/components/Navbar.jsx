import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SettingsModal from './SettingsModal';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  
  // Stările pentru utilizator
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const navigate = useNavigate();

  // Verificăm dacă suntem logați
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    const role = localStorage.getItem('userRole'); // <--- AICI CITIM ROLUL
    
    if (token) {
      setIsLoggedIn(true);
      setUserEmail(email || 'Utilizator');
      setUserRole(role); 
    }
  }, []);

  // Funcția de ieșire din cont
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId'); // E bine să ștergem și ID-ul
    localStorage.removeItem('userRole'); // Ștergem și rolul ca să fie totul curat
    
    setIsLoggedIn(false);
    setUserEmail('');
    setUserRole(null);
    setDropdownOpen(false); 
    navigate('/'); // Te trimite la pagina principală după logout
  };

  return (
    // ATENȚIE: Aici este secretul pentru hartă -> z-[9999] pus direct pe header!
    <header className="sticky top-0 z-[9999] border-b border-slate-700 bg-slate-900 shadow-lg relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-all duration-300 ease-in-out">
          <span className="text-2xl font-bold text-white tracking-tight">✈️</span>
          <span className="text-xl font-bold text-white tracking-wider">Smart Travel</span>
        </Link>

        {/* User Menu - Omulețul care este mereu vizibil */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-center h-10 w-10 rounded transition-all duration-300 ease-in-out hover:bg-slate-800"
            title="Menu utilizator"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4" strokeWidth="2" />
              <path d="M 4 20 Q 4 14 12 14 Q 20 14 20 20" strokeWidth="2" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 shadow-2xl border border-slate-700 overflow-hidden">
              
              {isLoggedIn ? (
                /* --- CE VEDE UTILIZATORUL LOGAT --- */
                <>
                  <div className="px-4 py-3 border-b border-slate-800 bg-slate-800/50">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Cont conectat</p>
                    <p className="text-sm text-white truncate font-medium mt-0.5">{userEmail}</p>
                  </div>

                  {/* ---> BUTONUL DE ADMIN PANEL (Apare DOAR dacă ești admin) <--- */}
                  {userRole === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left block px-4 py-3 text-sm font-bold text-blue-400 hover:bg-slate-800 transition-colors duration-200 border-b border-slate-800/50 uppercase tracking-widest"
                    >
                      ⚙️ Admin Panel
                    </Link>
                  )}

                  {/* ---> AICI AM ADĂUGAT BUTONUL DE SETĂRI <--- */}
                  <button
                    onClick={() => {
                      setDropdownOpen(false); // Închidem meniul mic
                      setIsSettingsOpen(true); // Deschidem modalul mare
                    }}
                    className="w-full text-left block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200 border-b border-slate-800/50"
                  >
                    Setări Cont
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-3 text-sm text-red-400 hover:bg-slate-800 transition-colors duration-200"
                  >
                    Log Out 
                  </button>
                </>
              ) : (
                /* --- CE VEDE UTILIZATORUL NELOGAT --- */
                <>
                  <Link
                    to="/login"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 transition-colors duration-200 border-b border-slate-800"
                  >
                    Autentificare
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 transition-colors duration-200"
                  >
                    Cont Nou
                  </Link>
                </>
              )}
              
            </div>
          )}
        </div>
      </div>

      {/* ---> AICI AM ADĂUGAT MODALUL <--- */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

    </header>
  );
};

export default Navbar;