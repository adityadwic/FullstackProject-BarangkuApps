// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';

export default function Home() {
  const router = useRouter();

  // Cek jika user sudah login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, []);

  return (
    <div className="min-h-screen gradient-soft flex flex-col relative overflow-hidden">
      <Head>
        <title>BarangApp - Kelola Inventori dengan Mudah</title>
        <meta name="description" content="Platform modern untuk mengelola barang dan inventori dengan mudah. Fitur lengkap dengan dashboard yang intuitif." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-40"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-100 to-teal-100 opacity-40"></div>
        <div className="absolute top-32 left-32 w-24 h-24 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 opacity-50"></div>
        <div className="absolute bottom-32 right-32 w-32 h-32 rounded-full bg-gradient-to-br from-green-200 to-emerald-200 opacity-50"></div>
      </div>

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-lg w-full">
          <div className="text-center mb-12">
            <div className="mx-auto h-24 w-24 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-emerald-600 flex items-center justify-center mb-8 shadow-modern-xl">
              <span className="text-white text-4xl font-bold">B</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Barang<span className="text-indigo-600">App</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Platform modern untuk mengelola inventori dengan dashboard yang intuitif dan fitur lengkap
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-effect rounded-2xl p-4 text-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700">CRUD Lengkap</p>
              </div>
              <div className="glass-effect rounded-2xl p-4 text-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700">Aman & Cepat</p>
              </div>
            </div>
          </div>

          <div className="card-gradient shadow-modern-xl">
            <div className="card-body">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Mulai Sekarang
              </h2>
              <div className="space-y-4">
                <Link href="/login" className="w-full btn-primary btn-lg flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Masuk ke Dashboard
                </Link>
                
                <Link href="/register" className="w-full btn-outline btn-lg flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Daftar Gratis Sekarang
                </Link>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  ✨ <span className="font-medium">100% Gratis</span> • 
                  <span className="font-medium mx-2">Tanpa Batas Waktu</span> • 
                  <span className="font-medium">Data Aman</span> ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}