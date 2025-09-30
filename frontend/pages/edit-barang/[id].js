// pages/edit-barang/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import ResponsiveDashboardLayout from '../../components/ResponsiveDashboardLayout';
import BarangForm from '../../components/BarangForm';

export default function EditBarang() {
  const [barang, setBarang] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  // Ambil data barang saat komponen dimuat
  useEffect(() => {
    if (id) {
      fetchBarang();
    }
  }, [id]);

  const fetchBarang = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/barang/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setBarang(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat mengambil data barang');
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/barang/${id}`, 
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Redirect ke dashboard setelah berhasil mengedit barang
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat mengedit barang');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data barang...</p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveDashboardLayout user={{ id: 1, email: 'user@example.com' }}>
      <Head>
        <title>Edit Barang - Barang App</title>
      </Head>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Barang</h1>
          <p className="mt-2 text-gray-600">Perbarui informasi barang</p>
        </div>
        
        {error && (
          <div className="alert-error mb-6">
            {error}
          </div>
        )}
        
        <div className="card">
          <div className="card-body">
            {barang ? (
              <BarangForm 
                initialData={barang}
                onSubmit={handleSubmit} 
                onCancel={() => router.push('/dashboard')} 
              />
            ) : (
              <p>Barang tidak ditemukan</p>
            )}
          </div>
        </div>
      </div>
    </ResponsiveDashboardLayout>
  );
}