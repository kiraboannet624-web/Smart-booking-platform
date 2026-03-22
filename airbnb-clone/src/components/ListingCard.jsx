import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function ListingCard({ listing }) {
  const navigate = useNavigate()
  const { addFavorite, removeFavorite, isFavorite } = useAppContext()

  const favorited = isFavorite(listing.id)

  function handleFavoriteClick(e) {
    // Stop the click from navigating to details
    e.stopPropagation()
    if (favorited) {
      removeFavorite(listing.id)
    } else {
      addFavorite(listing)
    }
  }

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/listing/${listing.id}`)}
    >
      {/* Image */}
      <div style={styles.imageContainer}>
        <img
          src={listing.image}
          alt={listing.name}
          style={styles.image}
        />
        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          style={styles.favoriteBtn}
        >
          {favorited ? '❤️' : '🤍'}
        </button>
        {/* Superhost badge */}
        {listing.isSuperhost && (
          <span style={styles.superhostBadge}>Superhost</span>
        )}
      </div>

      {/* Card content */}
      <div style={styles.content}>
        <div style={styles.titleRow}>
          <h3 style={styles.name}>{listing.name}</h3>
          <span style={styles.rating}>⭐ {listing.rating}</span>
        </div>
        <p style={styles.location}>{listing.city}, {listing.country}</p>
        <p style={styles.roomType}>{listing.roomType?.replace('_', ' ')}</p>
        <p style={styles.price}>
          <strong>{listing.price}</strong>
          <span style={styles.reviews}> · {listing.reviewCount} reviews</span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s',
  },
  favoriteBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '22px',
    cursor: 'pointer',
    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
  },
  superhostBadge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#fff',
    color: '#333',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
  },
  content: {
    padding: '12px',
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '4px',
  },
  name: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: '8px',
  },
  rating: {
    fontSize: '14px',
    color: '#333',
    whiteSpace: 'nowrap',
  },
  location: {
    fontSize: '14px',
    color: '#717171',
    marginBottom: '2px',
  },
  roomType: {
    fontSize: '13px',
    color: '#717171',
    textTransform: 'capitalize',
    marginBottom: '6px',
  },
  price: {
    fontSize: '15px',
    color: '#333',
    marginTop: '4px',
  },
  reviews: {
    fontSize: '13px',
    color: '#717171',
    fontWeight: '400',
  },
}

export default ListingCard