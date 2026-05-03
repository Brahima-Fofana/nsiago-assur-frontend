function fmt(n) {
  return Number(n).toLocaleString('fr-FR') + ' FCFA'
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-FR')
}

const PRODUCT_BADGE = {
  PAPILLON:      'bg-blue-100 text-blue-700',
  DOUBY:         'bg-purple-100 text-purple-700',
  DOUYOU:        'bg-amber-100 text-amber-700',
  TOUTOURISQUOU: 'bg-green-100 text-green-700',
}

function StatusBadge({ status }) {
  const isValid = status === 'VALID' || status === 'VALIDE'
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
      ${isValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isValid ? 'bg-green-500' : 'bg-red-500'}`} />
      {isValid ? 'Valide' : 'Expiré'}
    </span>
  )
}

export default function QuoteTable({ simulations, loading }) {
  const prime = r => r.price

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Mes devis</h2>
        <span className="text-sm text-gray-400">{simulations.length} résultat(s)</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
          <span className="spinner-dark" />
          Chargement…
        </div>
      ) : simulations.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-2">📋</p>
          <p className="text-sm">Aucun devis pour l'instant. Créez votre première simulation.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Référence', 'Produit', 'Catégorie', 'Montant', 'Validité', 'Statut'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {simulations.map((row, i) => (
                  <tr key={row.id ?? i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      {row.quoteReference ?? row.ref ?? `#${row.id}`}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize
                        ${PRODUCT_BADGE[row.product ?? row.produit] ?? 'bg-gray-100 text-gray-700'}`}>
                        {row.product ?? row.produit ?? '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {row.vehicleCategory ?? row.categorie ?? '—'}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {prime(row) != null ? fmt(prime(row)) : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {fmtDate(row.endDate)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={new Date(row.endDate) > new Date() ? 'VALID' : 'EXPIRED'} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {simulations.map((row, i) => (
              <div key={row.id ?? i} className="px-4 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-gray-400">
                    {row.quoteReference ?? row.ref ?? `#${row.id}`}
                  </span>
                  <StatusBadge status={new Date(row.endDate) > new Date() ? 'VALID' : 'EXPIRED'} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                      ${PRODUCT_BADGE[row.product ?? row.produit] ?? 'bg-gray-100 text-gray-700'}`}>
                      {row.product ?? row.produit ?? '—'}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      {row.vehicleCategory ?? row.categorie ?? ''}
                    </span>
                  </div>
                  <p className="font-bold text-gray-800 text-sm">
                    {prime(row) != null ? fmt(prime(row)) : '—'}
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Valide jusqu'au {fmtDate(row.validUntil ?? row.expiresAt ?? row.validite)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
