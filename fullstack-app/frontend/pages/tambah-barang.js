// pages/tambah-barang.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import ResponsiveDashboardLayout from '../components/ResponsiveDashboardLayout';
import BarangForm from '../components/BarangForm';

export default function TambahBarang() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `/api/barang`, 
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Redirect ke dashboard setelah berhasil menambah barang
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat menambah barang');
    }
  };

  return (
    <ResponsiveDashboardLayout user={{ id: 1, email: 'user@example.com' }}>
      <Head>
        <title>Tambah Barang - Barang App</title>
      </Head>
      
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
        <div className="fade-in mb-10">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm text-gray-600">
            <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <span className="text-indigo-600 font-medium">Tambah Barang Baru</span>
          </nav>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Tambah <span className="text-indigo-600">Barang Baru</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lengkapi informasi barang yang akan ditambahkan ke dalam inventori Anda
            </p>
          </div>
        </div>
        
        {error && (
          <div className="alert-error mb-8 slide-up">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}
        
        <div className="card-gradient shadow-modern-xl slide-up hover-lift">
          <div className="p-8">
            <BarangForm 
              onSubmit={handleSubmit} 
              onCancel={() => router.push('/dashboard')} 
            />
          </div>
        </div>
      </div>
    </ResponsiveDashboardLayout>
  );
}