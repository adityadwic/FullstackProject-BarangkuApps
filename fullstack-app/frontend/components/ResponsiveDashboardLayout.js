// components/ResponsiveDashboardLayout.js
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import InstallPrompt from './InstallPrompt';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from '../utils/responsive';

const ResponsiveDashboardLayout = ({ children, user }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(user);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  useEffect(() => {
    // Cek apakah user sudah login dan ambil data user dari localStorage
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');
    
    if (!token && router.pathname.startsWith('/dashboard')) {
      router.push('/login');
    } else if (token && userInfo && !userData) {
      // Ambil user data dari localStorage
      try {
        const parsedUser = JSON.parse(userInfo);
        setUserData(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Jika user data tidak valid, coba decode dari token
        try {
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          setUserData({
            id: tokenPayload.userId,
            email: tokenPayload.email,
            role: tokenPayload.role
          });
        } catch (tokenError) {
          console.error('Error parsing token:', tokenError);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        }
      }
    }
  }, [router, userData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserData(null);
    router.push('/login');
  };

  // Jika perangkat mobile, gunakan navbar, jika tidak, gunakan sidebar
  if (isMobile()) {
    return (
      <div className="dashboard-container">
        <Navbar user={userData} onLogout={handleLogout} />
        <div className="pt-20"> {/* Memberikan ruang untuk navbar fixed */}
          <main className="dashboard-main">
            <div className="dashboard-content">
              <div className="fade-in">
                {children}
              </div>
            </div>
          </main>
        </div>
        <InstallPrompt />
      </div>
    );
  } else {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar user={userData} onLogout={handleLogout} />
        
        <div className="flex-1 overflow-auto focus:outline-none">
          <main className="dashboard-main">
            <div className="dashboard-content">
              <div className="fade-in">
                {children}
              </div>
            </div>
          </main>
        </div>
        <InstallPrompt />
      </div>
    );
  }
};

export default ResponsiveDashboardLayout;