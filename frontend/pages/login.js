// pages/login.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Cek jika user sudah login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post(`/api/auth/login`, {
        email,
        password
      });
      
      // Simpan token dan user info ke localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      // Redirect ke dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat login');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-soft flex flex-col relative overflow-hidden">
      <Head>
        <title>Login - BarangApp</title>
      </Head>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-100 to-teal-100 opacity-50"></div>
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-30"></div>
      </div>
      
      <div className="flex-1 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-sm sm:max-w-md w-full">
          <div className="text-center mb-6 sm:mb-8">
            <div className="mx-auto h-16 w-16 sm:h-20 sm:w-20 rounded-2xl gradient-primary flex items-center justify-center shadow-modern-lg">
              <span className="text-white text-2xl sm:text-3xl font-bold">B</span>
            </div>
            <h1 className="mt-4 sm:mt-6 text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Selamat Datang
            </h1>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600">
              Masuk ke akun BarangApp Anda
            </p>
          </div>
          
          <div className="card-gradient shadow-modern-xl">
            <div className="card-body">
              {error && (
                <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-medium">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Alamat Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="masukkan email anda"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">Kata Sandi</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="masukkan password anda"
                  />
                </div>

                <div className="mb-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full btn btn-primary btn-lg ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Memproses...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Masuk ke Dashboard
                      </span>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-gray-600">
                    Belum punya akun?{' '}
                    <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                      Daftar sekarang
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}