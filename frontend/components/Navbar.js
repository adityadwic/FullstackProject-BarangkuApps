// components/Navbar.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = ({ user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-effect shadow-modern py-3 border-b border-white/10' 
        : 'glass-effect py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className={`flex items-center justify-between ${isMenuOpen ? 'flex-col md:flex-row' : ''}`}>
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href={user ? "/dashboard" : "/"}>
              <div className="flex items-center cursor-pointer group">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 w-10 h-10 rounded-xl flex items-center justify-center mr-3 shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
                  BarangApp
                </span>
              </div>
            </Link>
            
            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden w-10 h-10 rounded-xl glass-effect text-gray-700 hover:text-indigo-600 focus:outline-none transition-colors duration-300 flex items-center justify-center"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          <div className={`${
            isMenuOpen 
              ? 'flex flex-col w-full mt-6 md:mt-0 md:flex-row md:w-auto' 
              : 'hidden md:flex'
          } items-center space-y-3 md:space-y-0 md:space-x-3`}>
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`w-full md:w-auto px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    router.pathname === '/dashboard' 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-modern' 
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-white/50'
                  }`}
                >
                  Dashboard
                </Link>
                
                <Link 
                  href="/tambah-barang" 
                  className="w-full md:w-auto btn btn-secondary"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Tambah Barang
                </Link>
                
                <button 
                  onClick={onLogout}
                  className="w-full md:w-auto px-6 py-3 text-gray-700 hover:text-red-500 font-medium transition-colors duration-300 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="w-full md:w-auto px-6 py-3 text-gray-700 hover:text-indigo-600 hover:bg-white/50 rounded-xl font-medium transition-all duration-300">
                    Login
                </Link>
                <Link href="/register" className="w-full md:w-auto btn btn-primary">
                    Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;