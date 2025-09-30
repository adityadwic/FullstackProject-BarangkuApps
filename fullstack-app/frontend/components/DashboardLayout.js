// components/DashboardLayout.js
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const DashboardLayout = ({ children, user }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    // Cek apakah user sudah login
    const token = localStorage.getItem('token');
    if (!token && router.pathname.startsWith('/dashboard')) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserData(null);
    router.push('/login');
  };

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
    </div>
  );
};

export default DashboardLayout;