'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
      
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        
        {/* 404 Illustration */}
        <div className="relative mb-8">
          {/* Background decoration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full opacity-20 blur-3xl"></div>
          </div>
          
          {/* 404 Text */}
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text mb-4">
              404
            </h1>
            
            {/* Car Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/25">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17l4 4 4-4m-4-5v9M3 7l3-3 3 3m0 0l3-3 3 3M9 7v9" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-lg text-secondary-600 mb-2">
            Maaf, halaman yang Anda cari tidak dapat ditemukan.
          </p>
          <p className="text-secondary-500">
            Mungkin halaman telah dipindahkan atau URL yang Anda masukkan salah.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link 
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Kembali ke Beranda</span>
            </div>
          </Link>
          
          <Link 
            href="/cars"
            className="px-8 py-4 bg-white hover:bg-secondary-50 text-secondary-700 font-semibold rounded-xl border-2 border-secondary-200 hover:border-secondary-300 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9M3 7l3-3 3 3m0 0l3-3 3 3M9 7v9" />
              </svg>
              <span>Lihat Mobil</span>
            </div>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="border-t border-secondary-200 pt-8">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Atau coba halaman lainnya:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href="/cars" 
              className="px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200"
            >
              Daftar Mobil
            </Link>
            <span className="text-secondary-300">•</span>
            <Link 
              href="/" 
              className="px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200"
            >
              Beranda
            </Link>
            <span className="text-secondary-300">•</span>
            <button 
              onClick={() => window.history.back()}
              className="px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200"
            >
              Halaman Sebelumnya
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h4 className="font-semibold text-secondary-900">Butuh Bantuan?</h4>
          </div>
          <p className="text-secondary-600 mb-4">
            Tim customer service kami siap membantu Anda 24/7
          </p>
          <a 
            href="https://wa.me/6281234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
            </svg>
            <span>Hubungi WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
} 