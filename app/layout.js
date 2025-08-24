import './globals.css'
import Header from '../components/Header'
import { AuthProvider } from './context/AuthContext';

export const metadata = { 
  title: 'NextBlog', 
  description: 'Blog App (App Router + JWT)' 
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-gray-50">
        <AuthProvider>
          <Header />

          {/* Background section under header */}
          <div className="min-h-screen bg-[url('/bg.png')] bg-cover bg-center bg-fixed">
            <main className="w-full px-4 py-6 bg-white/80 rounded-2xl shadow-md">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
