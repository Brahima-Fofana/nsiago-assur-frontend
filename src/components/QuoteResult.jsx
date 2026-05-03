import { useState } from 'react'

function fmt(n) {
  return Number(n).toLocaleString('fr-FR') + ' FCFA'
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-FR')
}

export default function QuoteResult({ result, onClose }) {
  const [copied, setCopied] = useState(false)

  if (!result) return null

  const ref = result.quoteReference

  function copyRef() {
    navigator.clipboard.writeText(ref).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const rows = [
    { label: 'Produit',      value: result.product ?? result.produit },
    { label: 'Catégorie',    value: result.vehicleCategory ?? result.categorie },
    { label: 'Puissance',    value: result.fiscalPower ? `${result.fiscalPower} CV` : null },
    { label: 'Valeur à neuf',  value: result.vehicleNewValue  ? fmt(result.vehicleNewValue)  : null },
    { label: 'Valeur vénale',  value: result.vehicleVenalValue ? fmt(result.vehicleVenalValue) : null },
    { label: 'Validité',     value: fmtDate(result.endDate) },
  ].filter(r => r.value)

  const prime = result.price

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-brand-success/30 p-6">

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-success/10 text-brand-success text-sm font-semibold rounded-full">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Devis créé avec succès
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none p-1"
          aria-label="Fermer"
        >
          ×
        </button>
      </div>

      {/* Référence */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-5">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Référence</p>
          <p className="font-mono font-semibold text-brand text-sm">{ref}</p>
        </div>
        <button
          onClick={copyRef}
          className="flex items-center gap-1.5 text-xs text-brand-accent hover:text-blue-700 font-medium transition-colors"
        >
          {copied ? (
            <><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Copié !</>
          ) : (
            <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copier</>
          )}
        </button>
      </div>

      {/* Montant principal */}
      {prime != null && (
        <div className="text-center py-4 mb-5">
          <p className="text-xs text-gray-400 mb-1">Montant de la prime</p>
          <p className="text-3xl font-bold text-gray-900">{fmt(prime)}</p>
        </div>
      )}

      {/* Détails */}
      <div className="divide-y divide-gray-100">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center py-2.5">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-sm font-medium text-gray-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
