import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { activate, isAuthenticated } from '../services/api'
import bgImageSlide from '@/assets/bg_slide_1.png'

const LEN = 6

export default function Activation() {
  const [digits,  setDigits]  = useState(Array(LEN).fill(''))
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const refs    = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) navigate('/dashboard', { replace: true })
  }, [])

  const email = sessionStorage.getItem('pending_email') ?? ''

  function handleChange(i, e) {
    const val = e.target.value.replace(/\D/g, '').slice(-1)
    const next = digits.map((d, idx) => (idx === i ? val : d))
    setDigits(next)
    if (val && i < LEN - 1) refs.current[i + 1]?.focus()
  }

  function handleKeyDown(i, e) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
  }

  function handlePaste(e) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LEN)
    if (!pasted) return
    const next = Array(LEN).fill('')
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]
    setDigits(next)
    const focusIdx = Math.min(pasted.length, LEN - 1)
    refs.current[focusIdx]?.focus()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const code = digits.join('')
    if (code.length < LEN) {
      setError('Veuillez saisir les 6 chiffres du code.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await activate(code)
      sessionStorage.removeItem('pending_email')
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Code invalide ou expiré.')
      setDigits(Array(LEN).fill(''))
      refs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      
      {/* Image de fond */}
      <img
        src={bgImageSlide}
        alt="background"
        className="fixed inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="fixed inset-0" />

      {/* Contenu */}
      <div className="w-full max-w-md z-10">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-5">
            <svg className="w-8 h-8 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Vérifiez votre email</h1>
          <p className="text-gray-500 text-sm mb-1">
            Un code à 6 chiffres a été envoyé à votre adresse email.
          </p>
          {email && (
            <p className="text-brand font-medium text-sm mb-6">{email}</p>
          )}
          {!email && <div className="mb-6" />}

          <form onSubmit={handleSubmit}>
            {/* OTP inputs */}
            <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => (refs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={e => handleChange(i, e)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  autoFocus={i === 0}
                  className={`w-11 h-14 text-center text-xl font-bold border-2 rounded-xl outline-none transition-all
                    ${d
                      ? 'border-brand bg-brand/5 text-brand'
                      : 'border-gray-300 text-gray-800'
                    }
                    focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20`}
                />
              ))}
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 mb-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand hover:bg-brand-light disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading && <span className="spinner" />}
              {loading ? 'Activation…' : 'Activer mon compte'}
            </button>
          </form>

          <p className="text-gray-400 text-xs mt-6">
            Vous n'avez pas reçu de code ? Vérifiez vos spams.
          </p>
          <p className="text-center text-sm text-gray-500 mt-5">
            Revenir à l'
            <Link to="/inscription" className="text-brand-accent font-medium hover:underline">
              inscription
            </Link>
             {' '}ou à l'
            <Link to="/" className="text-brand-accent font-medium hover:underline">
              acceuil
            </Link>
          </p>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          © 2026 NSIAGO'ASSUR — Tous droits réservés
        </p>
      </div>
    </div>
  )
}
