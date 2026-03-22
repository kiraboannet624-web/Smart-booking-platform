import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { cityPlaceIds } from '../services/listingsService'

function Navbar({ user }) {
  const { favorites } = useAppContext()
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    const query = e.target.search.value.toLowerCase().trim()
    if (query) {
      const placeId = cityPlaceIds[query]
      if (placeId) {
        navigate(`/?placeId=${placeId}&city=${query}`)
      } else {
        alert(`Try one of these cities: ${Object.keys(cityPlaceIds).join(', ')}`)
      }
    }
  }

  function handleLogout() {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        🏠 StayFinder
      </Link>

      {/* Search */}
      <form onSubmit={handleSearch} style={styles.searchForm}>
        <input
          name="search"
          type="text"
          placeholder="Try: Paris, London, Tokyo..."
          style={styles.searchInput}
        />
        <button type="submit" style={styles.searchButton}>
          Search
        </button>
      </form>

      {/* Links */}
      <div style={styles.links}>
        <Link to="/favorates" style={styles.link}>
          ❤️ Favorites{' '}
          {favorites.length > 0 && (
            <span style={styles.badge}>{favorites.length}</span>
          )}
        </Link>

        {user ? (
          <>
            <Link to="/bookings" style={styles.link}>
              📋 Bookings
            </Link>
            <div style={styles.userInfo}>
              <span style={styles.userName}>👤 {user.name}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link to="/login" style={styles.loginBtn}>
            Sign in
          </Link>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#FF385C',
    textDecoration: 'none',
  },
  searchForm: {
    display: 'flex',
    gap: '8px',
  },
  searchInput: {
    padding: '10px 16px',
    borderRadius: '24px',
    border: '1px solid #e0e0e0',
    fontSize: '14px',
    width: '300px',
    outline: 'none',
  },
  searchButton: {
    padding: '10px 20px',
    borderRadius: '24px',
    backgroundColor: '#FF385C',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '14px',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#FF385C',
    color: '#fff',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '11px',
    marginLeft: '4px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#f7f7f7',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#333',
  },
  loginBtn: {
    padding: '10px 20px',
    backgroundColor: '#FF385C',
    color: '#fff',
    borderRadius: '24px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
  },
}

export default Navbar