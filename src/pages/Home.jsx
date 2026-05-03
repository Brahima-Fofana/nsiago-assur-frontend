import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, decodeToken, logout } from '../services/api'
import { useState } from 'react'
import logo from '@/assets/logo.png'
import imageSlide from '@/assets/slide_1.jpg'

const PRODUCTS = [
  {
    emoji: '🦋',
    name: 'Papillon',
    desc: 'RC + Dommages + Vol',
    detail: 'Idéal pour les véhicules personnels avec une protection complète contre le vol.',
    badge: 'CAT 201 — Personnel',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    emoji: '🏍️',
    name: 'Douby',
    desc: 'RC + Dommages + Tierce Collision',
    detail: 'Spécialement conçu pour les motos et tricycles avec garantie collision tierce.',
    badge: 'CAT 202 — Moto/Tricycle',
    badgeColor: 'bg-purple-100 text-purple-700',
  },
  {
    emoji: '🚗',
    name: 'Douyou',
    desc: 'RC + Dommages + Collision + Incendie',
    detail: 'Protection renforcée incluant la garantie incendie pour véhicules personnels et motos.',
    badge: 'CAT 201 & 202',
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    emoji: '🛡️',
    name: 'Toutourisquou',
    desc: 'Toutes les garanties',
    detail: 'La couverture maximale — zéro compromis sur la protection de votre véhicule.',
    badge: 'CAT 201 — Couverture max',
    badgeColor: 'bg-green-100 text-green-700',
  },
]

const STEPS = [
  {
    num: '01',
    icon: '✍️',
    title: 'S\'inscrire',
    desc: 'Créez votre compte amazone en quelques secondes et activez-le via email.',
  },
  {
    num: '02',
    icon: '⚡',
    title: 'Simuler',
    desc: 'Renseignez les caractéristiques du véhicule et obtenez votre devis instantanément.',
  },
  {
    num: '03',
    icon: '📄',
    title: 'Générer l\'attestation',
    desc: 'Téléchargez l\'attestation d\'assurance validée et transmettez-la au client.',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const connected = isAuthenticated()
  const user = decodeToken()
  const [busy, setBusy] = useState(false)

  async function handleLogout() {
    setBusy(true)
    await logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex flex-col">

      {/* Header fixe */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img src={logo} alt="Logo" className="" />
            </div>
            <span className="hidden sm:block font-bold text-brand text-lg">NSIAGO'ASSUR</span>
          </div>

          <div className="flex items-center gap-2">
            {connected ? (
              <>
                <Link to={"/dashboard"}>
                  <div className="flex items-center gap-2 text-blue-100 text-sm">
                    <div className="w-8 h-8 mr-5 sm:mr-0 rounded-full bg-brand border border-blue-200 flex items-center justify-center text-xs font-bold text-white uppercase">
                      {user?.username.split(' ')
                          .map(w => w.charAt(0))
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-brand pr-3">
                      {user?.username}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={busy}
                  className="flex items-center gap-2 px-3 py-2 bg-brand disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
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
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-brand hover:bg-brand/5 rounded-lg transition-colors"
                >
                  Se connecter
                </Link>
                <Link
                  to="/inscription"
                  className="px-4 py-2 text-sm font-medium bg-brand text-white rounded-lg hover:bg-brand-light transition-colors"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero */}
      <section className="relative pt-20 pb-24 px-4 text-center overflow-hidden">
        
        {/* Image de fond */}
        <img
          src={imageSlide}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay sombre pour lisibilité du texte */}
        <div className="absolute inset-0 bg-brand/70" />

        {/* Contenu */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-blue-100 text-sm font-medium mb-6">
            🌍 Assurance automobile digitale en Afrique
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Simulez et souscrivez <br />
            <span className="text-brand-accent">en quelques clics</span>
          </h1>
          <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
            La plateforme des amazones NSIAGO'ASSUR pour générer des devis
            automobile instantanés et des attestations validées.
          </p>
          <Link
            to="/inscription"
            className="inline-flex items-center gap-2 bg-brand-accent hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg text-lg"
          >
            Commencer maintenant
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </section>

        {/* Produits */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Nos produits d'assurance</h2>
              <p className="text-gray-500 mt-2">Choisissez la couverture adaptée à votre véhicule</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PRODUCTS.map(p => (
                <div
                  key={p.name}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="text-4xl mb-3">{p.emoji}</div>
                  <h3 className="text-lg font-bold text-brand mb-1">{p.name}</h3>
                  <p className="text-sm font-medium text-gray-700 mb-2">{p.desc}</p>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">{p.detail}</p>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Comment ça marche ?</h2>
              <p className="text-gray-500 mt-2">3 étapes simples pour émettre un devis</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Connector line (desktop only) */}
              <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gray-100 -z-0" />
              {STEPS.map((s, i) => (
                <div key={s.num} className="text-center relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F0F4FF] border-2 border-brand/10 mb-4 text-2xl">
                    {s.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand rounded-full flex items-center justify-center text-white text-xs font-bold hidden md:flex">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/inscription"
                className="inline-block bg-brand hover:bg-brand-light text-white font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                Créer mon compte amazone
              </Link>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-brand-dark text-blue-300/50 text-center text-xs py-5">
        © 2026 NSIAGO'ASSUR — Plateforme de simulation d'assurance automobile
      </footer>
    </div>
  )
}
