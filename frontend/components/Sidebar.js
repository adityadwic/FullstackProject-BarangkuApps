// components/Sidebar.js
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = ({ user, onLogout }) => {
  const router = useRouter();
  
  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Tambah Barang', href: '/tambah-barang', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-72">
        <div className="flex flex-col flex-grow pt-8 pb-6 glass-effect border-r border-white/10 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6 mb-8">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-modern">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent">
              BarangApp
            </span>
          </div>
          
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 space-y-3">
              {menuItems.map((item) => (
                <Link key={item.name} href={item.href} className={`${
                    router.pathname === item.href
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-modern'
                      : 'text-gray-700 hover:bg-white/30 hover:text-indigo-600'
                  } group flex items-center px-6 py-4 text-base font-medium rounded-2xl transition-all duration-300`}>
                    <svg className="mr-4 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                    </svg>
                    {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-white/10 p-6">
            <button 
              onClick={onLogout}
              className="flex-shrink-0 w-full group rounded-2xl px-6 py-4 text-left text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
            >
              <div className="flex items-center">
                <svg className="mr-4 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;