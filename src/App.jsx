import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { isAuthenticated } from './services/api'
import Home       from './pages/Home'
import Login      from './pages/Login'
import Register   from './pages/Register'
import Activation from './activation/Activation'
import Dashboard  from './pages/Dashboard'

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

function PublicOnlyRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/login"       element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/inscription" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
        <Route path="/activation"  element={<Activation />} />
        <Route path="/dashboard"   element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*"            element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
