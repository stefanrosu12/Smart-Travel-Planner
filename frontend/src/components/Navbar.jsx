import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-700 bg-slate-900 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-all duration-300 ease-in-out">
          <span className="text-2xl font-bold text-white tracking-tight">✈️</span>
          <span className="text-xl font-bold text-white tracking-wider">Smart Travel</span>
        </Link>

        {/* User Menu */}
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
            <div className="absolute right-0 mt-2 w-48 rounded bg-white shadow-lg border border-slate-200 z-50">
              <Link
                to="/login"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-3 text-sm text-slate-900 hover:bg-slate-100 transition-colors duration-200 border-b border-slate-200"
              >
                Autentificare
              </Link>
              <Link
                to="/register"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-3 text-sm text-slate-900 hover:bg-slate-100 transition-colors duration-200"
              >
                Cont Nou
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
