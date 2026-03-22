import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ListingDetails from './pages/listingDetails'
import Booking from './pages/Booking'
import Favorates from './pages/Favorates'
import Login from './pages/Login'

// Read user from localStorage - real auth state
function getUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

function ProtectedRoute({ children }) {
  const user = getUser()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  const user = getUser()

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/favorates" element={<Favorates />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/bookings"
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