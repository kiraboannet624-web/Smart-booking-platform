import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ListingDetails from './pages/listingDetails'
import Booking from './pages/Booking'
import Favorates from './pages/Favorates'
import Login from './pages/Login'

// This is a placeholder - later we'll check real auth state
const isLoggedIn = false

// Protected route wrapper
function ProtectedRoute({ children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/favorates" element={<Favorates />} />
        <Route path="/login" element={<Login />} />

        {/* Protected route - only logged in users can access */}
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App