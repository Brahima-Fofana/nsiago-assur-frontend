import { useState, useEffect, useCallback } from 'react'
import Navbar      from '../components/Navbar'
import KpiCard     from '../components/KpiCard'
import QuoteForm   from '../components/QuoteForm'
import QuoteResult from '../components/QuoteResult'
import QuoteTable  from '../components/QuoteTable'
import { getSimulations } from '../services/api'

function fmt(n) {
  return Number(n).toLocaleString('fr-FR') + ' FCFA'
}

function prime(s) {
  return Number(s.price ?? 0)
}

function computeKpis(list) {
  const total      = list.length
  const totalPrime = list.reduce((acc, s) => acc + prime(s), 0)
  const valides    = list.filter(s => new Date(s.endDate) > new Date()).length
  return { total, totalPrime, valides }
}

export default function Dashboard() {
  const [simulations, setSimulations] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState('')
  const [lastResult,  setLastResult]  = useState(null)
  const [tab,         setTab]         = useState('new')

  const fetchSimulations = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getSimulations()
      setSimulations(Array.isArray(data) ? data : (data?.data ?? []))
    } catch (err) {
      setError(err.message || 'Impossible de charger les devis.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchSimulations() }, [fetchSimulations])

  function handleResult(result) {
    setLastResult(result)
    setTab('list')
    fetchSimulations()
  }

  const kpis = computeKpis(simulations)

  const tabCls = active =>
    `px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
      active
        ? 'bg-brand text-white shadow-sm'
        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
    }`

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez vos simulations d'assurance automobile</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <KpiCard
            title="Total devis créés"
            value={kpis.total}
            subtitle="Depuis le début"
            icon="📋"
            color="blue"
          />
          <KpiCard
            title="Montant total simulé"
            value={loading ? '…' : fmt(kpis.totalPrime)}
            subtitle="Toutes simulations cumulées"
            icon="💰"
            color="green"
          />
          <KpiCard
            title="Devis valides"
            value={loading ? '…' : kpis.valides}
            subtitle="Non expirés"
            icon="✅"
            color="purple"
          />
        </div>

        {/* Error banner */}
        {error && !loading && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="text-red-500">⚠️</span>
            <p className="text-red-700 text-sm flex-1">{error}</p>
            <button
              onClick={fetchSimulations}
              className="text-red-600 hover:text-red-800 text-sm font-medium underline shrink-0"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Tab bar */}
          <div className="flex items-center gap-2 p-3 border-b border-gray-100 bg-gray-50">
            <button className={tabCls(tab === 'new')}  onClick={() => setTab('new')}>
              + Nouvelle simulation
            </button>
            <button className={tabCls(tab === 'list')} onClick={() => setTab('list')}>
              Mes devis
              {kpis.total > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs bg-brand-accent/20 text-brand-accent rounded-full font-bold">
                  {kpis.total}
                </span>
              )}
            </button>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {tab === 'new' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-800 mb-4">Paramètres du véhicule</h2>
                  <QuoteForm onResult={handleResult} />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-800 mb-4">Résultat</h2>
                  {lastResult ? (
                    <QuoteResult result={lastResult} onClose={() => setLastResult(null)} />
                  ) : (
                    <div className="h-full min-h-[200px] border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-center p-8">
                      <div>
                        <p className="text-3xl mb-2">🔍</p>
                        <p className="text-gray-400 text-sm">
                          Le résultat s'affichera ici après le calcul.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {tab === 'list' && (
              <>
                {lastResult && (
                  <div className="mb-6">
                    <QuoteResult result={lastResult} onClose={() => setLastResult(null)} />
                  </div>
                )}
                <QuoteTable simulations={simulations} loading={loading} />
              </>
            )}
          </div>
        </div>

      </main>

      <footer className="text-center text-gray-400 text-xs py-4 border-t border-white">
        © 2026 NSIAGO'ASSUR
      </footer>
    </div>
  )
}
