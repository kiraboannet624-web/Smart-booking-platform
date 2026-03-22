import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function Navbar() {
  const { favorites } = useAppContext()
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    const query = e.target.search.value
    if (query.trim()) {
      navigate(`/?search=${query}`)
    }
  }

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        🏠 StayFinder
      </Link>

      {/* Search bar */}
      <form onSubmit={handleSearch} style={styles.searchForm}>
        <input
          name="search"
          type="text"
          placeholder="Search destinations..."
          style={styles.searchInput}
        />
        <button type="submit" style={styles.searchButton}>
          Search
        </button>
      </form>

      {/* Navigation links */}
      <div style={styles.links}>
        <Link to="/favorites" style={styles.link}>
          ❤️ Favorites {favorites.length > 0 && (
            <span style={styles.badge}>{favorites.length}</span>
          )}
        </Link>
        <Link to="/bookings" style={styles.link}>
          📋 Bookings
        </Link>
        <Link to="/login" style={styles.link}>
          👤 Login
        </Link>
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
    width: '280px',
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
    gap: '24px',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '14px',
    fontWeight: '500',
    position: 'relative',
  },
  badge: {
    backgroundColor: '#FF385C',
    color: '#fff',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '11px',
    marginLeft: '4px',
  },
}

export default Navbar