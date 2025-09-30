// pages/dashboard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import ResponsiveDashboardLayout from '../components/ResponsiveDashboardLayout';
import BarangCard from '../components/BarangCard';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';

export default function Dashboard() {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    minPrice: 0,
    maxPrice: 999999999
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');
    
    if (!token) {
      router.push('/login');
      return;
    }
    
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    
    fetchBarang();
  }, [currentPage, filters]);

  const fetchBarang = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '6',
        ...(filters.search && { search: filters.search }),
        ...(filters.minPrice > 0 && { minPrice: filters.minPrice.toString() }),
        ...(filters.maxPrice < 999999999 && { maxPrice: filters.maxPrice.toString() })
      });
      
      const res = await axios.get(
        `/api/barang?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (res.data.data) {
        setBarang(res.data.data);
        setTotalPages(res.data.totalPages || 1);
        setTotalItems(res.data.total || res.data.data.length);
      } else {
        setBarang(res.data);
        setTotalPages(1);
        setTotalItems(res.data.length);
      }
      
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat mengambil data barang');
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/barang/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      fetchBarang();
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat menghapus barang');
    }
  };

  const handleEdit = (id) => {
    router.push(`/edit-barang/${id}`);
  };

  if (loading && barang.length === 0) {
    return (
      <div className="min-h-screen gradient-soft flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto"></div>
          <p className="mt-4 text-gray-700">Memuat data barang...</p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveDashboardLayout user={user}>
      <Head>
        <title>Dashboard - BarangApp</title>
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard <span className="text-purple-600">Inventori</span>
          </h1>
          {user && (
            <p className="text-gray-600">
              Welcome, {user.email} ({user.role === 'admin' ? 'Administrator' : 'User'})
            </p>
          )}
        </div>
        
        {error && (
          <div className="p-4 mb-8 bg-red-50 border border-red-200 rounded-2xl text-red-800 shadow-modern">
            <span className="font-medium">{error}</span>
          </div>
        )}
        
        {/* Search & Filter Component */}
        <SearchFilter onFilterChange={handleFilterChange} />
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Daftar Barang ({totalItems} item{totalItems !== 1 ? 's' : ''})
          </h2>
          
          {user?.role === 'admin' && (
            <Link href="/tambah-barang">
              <button className="btn btn-primary flex items-center w-full sm:w-auto">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah Barang
              </button>
            </Link>
          )}
        </div>
        
        {loading && (
          <div className="text-center py-8">
            <div className="spinner mx-auto"></div>
            <p className="mt-4 text-gray-700">Mencari barang...</p>
          </div>
        )}
        
        {!loading && barang.length === 0 ? (
          <div className="glass-effect rounded-2xl p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {filters.search || filters.minPrice > 0 || filters.maxPrice < 999999999 
                ? 'Tidak ada barang yang sesuai dengan filter' 
                : 'Tidak ada barang ditemukan'
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {filters.search || filters.minPrice > 0 || filters.maxPrice < 999999999 
                ? 'Coba ubah filter pencarian atau tambahkan barang baru'
                : 'Mulai dengan menambahkan barang pertama Anda'
              }
            </p>
            {user?.role === 'admin' && (
              <Link href="/tambah-barang">
                <button className="btn btn-primary flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Tambah Barang{filters.search || filters.minPrice > 0 || filters.maxPrice < 999999999 ? '' : ' Pertama'}
                </button>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {barang.map((item) => (
                <BarangCard
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  userRole={user?.role}
                />
              ))}
            </div>
            
            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </ResponsiveDashboardLayout>
  );
}
