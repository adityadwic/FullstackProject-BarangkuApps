// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import Footer from '../components/Footer';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validasi password
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      setIsLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`/api/auth/register`, {
        email,
        password
      });      // Redirect ke login setelah registrasi berhasil
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat registrasi');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-soft flex flex-col relative overflow-hidden">
      <Head>
        <title>Daftar - BarangApp</title>
      </Head>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 opacity-50"></div>
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 opacity-30"></div>
      </div>
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="mx-auto h-20 w-20 rounded-2xl gradient-secondary flex items-center justify-center shadow-modern-lg">
              <span className="text-white text-3xl font-bold">B</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold text-gray-900 tracking-tight">
              Bergabung Sekarang
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Buat akun BarangApp dan mulai kelola inventori
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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="minimal 6 karakter"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Konfirmasi Kata Sandi</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                    placeholder="ulangi password anda"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role" className="form-label">Jenis Akun</label>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-input"
                  >
                    <option value="user">User (Dapat melihat barang)</option>
                    <option value="admin">Admin (Dapat mengelola barang)</option>
                  </select>
                  <p className="text-sm text-gray-400 mt-2">
                    Admin dapat menambah, mengedit, dan menghapus barang. User hanya dapat melihat.
                  </p>
                </div>

                <div className="mb-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full btn btn-secondary btn-lg ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Membuat Akun...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Buat Akun Sekarang
                      </span>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-gray-600">
                    Sudah punya akun?{' '}
                    <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                      Masuk sekarang
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