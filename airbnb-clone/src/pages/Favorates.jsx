import { useAppContext } from '../context/AppContext'
import ListingCard from '../components/ListingCard'
import { useNavigate } from 'react-router-dom'

function Favorates() {
  const { favorites } = useAppContext()
  const navigate = useNavigate()

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Your Favorites</h1>

      {favorites.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyIcon}>🤍</p>
          <h2 style={styles.emptyTitle}>No favorites yet</h2>
          <p style={styles.emptyText}>
            Start exploring and save listings you love
          </p>
          <button
            onClick={() => navigate('/')}
            style={styles.exploreBtn}
          >
            Explore listings
          </button>
        </div>
      ) : (
        <>
          <p style={styles.count}>{favorites.length} saved listing{favorites.length !== 1 ? 's' : ''}</p>
          <div style={styles.grid}>
            {favorites.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  page: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#333',
  },
  count: {
    fontSize: '14px',
    color: '#717171',
    marginBottom: '24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#333',
  },
  emptyText: {
    fontSize: '15px',
    color: '#717171',
    marginBottom: '24px',
  },
  exploreBtn: {
    padding: '12px 24px',
    backgroundColor: '#FF385C',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
  },
}

export default Favorates