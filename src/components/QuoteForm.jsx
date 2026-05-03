import { useState } from 'react'
import { createSimulation } from '../services/api'

const PRODUCTS = [
  { value: 'PAPILLON',      label: '🦋 Papillon' },
  { value: 'DOUBY',         label: '🏍️ Douby' },
  { value: 'DOUYOU',        label: '🚗 Douyou' },
  { value: 'TOUTOURISQUOU', label: '🛡️ Toutourisquou' },
]

const CATEGORIES = [
  { value: 'CAT_201', label: '201 — Véhicule personnel' },
  { value: 'CAT_202', label: '202 — Moto / Tricycle' },
  { value: 'CAT_203', label: '203 — Transport en commun' },
  { value: 'CAT_204', label: '204 — Taxi' },
]

const EMPTY = {
  product:          'PAPILLON',
  vehicleCategory:  'CAT_201',
  fiscalPower:      '',
  vehicleAge:       '',
  vehicleNewValue:  '',
  vehicleVenalValue: '',
}

export default function QuoteForm({ onResult }) {
  const [form,    setForm]    = useState(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  function handle(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await createSimulation({
        product:           form.product,
        vehicleCategory:   form.vehicleCategory,
        fiscalPower:       Number(form.fiscalPower),
        vehicleAge:        Number(form.vehicleAge),
        vehicleNewValue:   Number(form.vehicleNewValue),
        vehicleVenalValue: Number(form.vehicleVenalValue),
      })
      onResult(result)
      setForm(EMPTY)
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  const selectCls = 'w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition bg-white'
  const inputCls  = 'w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition'

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Produit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
          <select name="product" value={form.product} onChange={handle} required className={selectCls}>
            {PRODUCTS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie véhicule</label>
          <select name="vehicleCategory" value={form.vehicleCategory} onChange={handle} required className={selectCls}>
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        {/* Puissance fiscale */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Puissance fiscale (CV)</label>
          <input
            type="number" name="fiscalPower" value={form.fiscalPower} onChange={handle}
            required min={1} placeholder="Ex: 8"
            className={inputCls}
          />
        </div>

        {/* Âge du véhicule */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Âge du véhicule (années)</label>
          <input
            type="number" name="vehicleAge" value={form.vehicleAge} onChange={handle}
            required min={0} max={50} placeholder="Ex: 3"
            className={inputCls}
          />
        </div>

        {/* Valeur à neuf */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Valeur à neuf (FCFA)</label>
          <input
            type="number" name="vehicleNewValue" value={form.vehicleNewValue} onChange={handle}
            required min={1} placeholder="Ex: 12000000"
            className={inputCls}
          />
        </div>

        {/* Valeur vénale */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Valeur vénale (FCFA)</label>
          <input
            type="number" name="vehicleVenalValue" value={form.vehicleVenalValue} onChange={handle}
            required min={1} placeholder="Ex: 8000000"
            className={inputCls}
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full bg-brand hover:bg-brand-light disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {loading && <span className="spinner" />}
        {loading ? 'Calcul en cours…' : 'Calculer le devis'}
      </button>
    </form>
  )
}
