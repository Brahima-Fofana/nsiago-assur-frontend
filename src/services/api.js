// const BASE_URL = 'http://localhost:8000/api'

// EN PROD
const BASE_URL = 'https://nsiaga-assur-backend.devbrahima.com/api'

function getToken() {
  return localStorage.getItem('token')
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })

  if (res.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    throw new Error('Session expirée. Veuillez vous reconnecter.')
  }

  const data = await res.json().catch(() => null)
   console.log('data reçu:', data)

  if (!res.ok) {
    throw new Error(data?.detail || `Erreur ${res.status}`)
  }

  return data
}

// Auth

export async function register(email, username, password) {
  return request('/inscription', {
    method: 'POST',
    body: JSON.stringify({ email, username, password }),
  })
}

export async function login(email, password) {
  const data = await request('/connexion', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  if (data?.token) localStorage.setItem('token', data.token)
  return data
}

export async function activate(code) {
  const data = await request('/activation', {
    method: 'POST',
    body: JSON.stringify({ code }),
  })
  if (data?.token) localStorage.setItem('token', data.token)
  return data
}

export async function logout() {
  try {
    await request('/deconnexion', { method: 'POST' })
  } catch (_) {
    // réseau indisponible — on déconnecte quand même localement
  }
  localStorage.removeItem('token')
}

export function isAuthenticated() {
  return Boolean(getToken())
}

export function decodeToken() {
  const token = getToken()
  if (!token) return null
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (_) {
    return null
  }
}

// Simulations

export async function createSimulation(payload) {
  return request('/simulations', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getSimulations() {
  return request('/simulations')
}
