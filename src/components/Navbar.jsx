import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout, decodeToken } from '../services/api'
import logo from '@/assets/logo.png'

export default function Navbar() {
  const navigate              = useNavigate()
  const [busy, setBusy]       = useState(false)
  const payload               = decodeToken()
  const username              = payload?.username ?? payload?.sub ?? 'Amazone'
  const initials_username = username
                          .split(' ')
                          .map(w => w.charAt(0))
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()

  async function handleLogout() {
    setBusy(true)
    await logout()
    navigate('/')
  }

  return (
    <nav className="bg-brand shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <img src={logo} alt="Logo" className='w-12 h-12' />
            </div>
            <span className="text-white font-bold text-lg tracking-wide hidden sm:block">
              NSIAGO<span className="text-brand-accent/80">'</span>ASSUR
            </span>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link to={"/dashboard"}>
              <div className="hidden sm:flex items-center gap-2 text-blue-100 text-sm">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white uppercase">
                  {initials_username}
                </div>
                <span>{username}</span>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              disabled={busy}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {busy ? (
                <span className="spinner" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              )}
              <span className="hidden sm:block">Déconnexion</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  )
}
