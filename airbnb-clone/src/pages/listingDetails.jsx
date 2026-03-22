import { useParams, useNavigate } from 'react-router-dom'
import { useListings } from '../hooks/useListings'
import { useAppContext } from '../context/AppContext'
import useBookingStore from '../store/bookingStore'
import Loader from '../components/ui/loader'
import ErrorState from '../components/ui/ErrorState'
import { useState } from 'react'

function ListingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: listings, isLoading, isError, error } = useListings()
  const { addFavorite, removeFavorite, isFavorite } = useAppContext()
  const { addBooking } = useBookingStore()

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [booked, setBooked] = useState(false)

  if (isLoading) return <Loader />
  if (isError) return <ErrorState message={error.message} />

  // Find the listing by id from cached data
  const listing = listings?.find((l) => String(l.id) === String(id))

  if (!listing) {
    return <ErrorState message="Listing not found" />
  }

  const favorited = isFavorite(listing.id)

  function handleBook() {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates')
      return
    }
    addBooking(listing, checkIn, checkOut)
    setBooked(true)
  }

  return (
    <div style={styles.page}>
      {/* Back button */}
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ← Back
      </button>

      {/* Hero image */}
      <div style={styles.imageContainer}>
        <img src={listing.image} alt={listing.name} style={styles.image} />
      </div>

      <div style={styles.content}>
        {/* Left side - listing info */}
        <div style={styles.info}>
          <div style={styles.titleRow}>
            <h1 style={styles.title}>{listing.name}</h1>
            <button
              onClick={() => favorited ? removeFavorite(listing.id) : addFavorite(listing)}
              style={styles.favoriteBtn}
            >
              {favorited ? '❤️ Saved' : '🤍 Save'}
            </button>
          </div>

          <p style={styles.location}>
            📍 {listing.city}, {listing.country}
          </p>

          <div style={styles.badges}>
            {listing.isSuperhost && (
              <span style={styles.badge}>⭐ Superhost</span>
            )}
            <span style={styles.badge}>
              🏠 {listing.roomType?.replace('_', ' ')}
            </span>
          </div>

          <div style={styles.ratingRow}>
            <span style={styles.rating}>⭐ {listing.rating}</span>
            <span style={styles.reviews}>({listing.reviewCount} reviews)</span>
          </div>

          <hr style={styles.divider} />

          <h2 style={styles.sectionTitle}>About this place</h2>
          <p style={styles.description}>
            Welcome to {listing.name}! This wonderful {listing.roomType?.replace('_', ' ')} is
            located in the heart of {listing.city}. Enjoy a comfortable stay with
            all the amenities you need for a perfect trip. Highly rated by previous
            guests with {listing.reviewCount} reviews.
          </p>

          <hr style={styles.divider} />

          <h2 style={styles.sectionTitle}>What this place offers</h2>
          <div style={styles.amenities}>
            {['WiFi', 'Kitchen', 'Air conditioning', 'Washing machine', 'Free parking', 'TV'].map((a) => (
              <span key={a} style={styles.amenity}>✓ {a}</span>
            ))}
          </div>
        </div>

        {/* Right side - booking form */}
        <div style={styles.bookingCard}>
          <h2 style={styles.price}>{listing.price}</h2>
          <p style={styles.ratingSmall}>⭐ {listing.rating} · {listing.reviewCount} reviews</p>

          {booked ? (
            <div style={styles.successBox}>
              <p style={styles.successText}>🎉 Booking confirmed!</p>
              <button
                onClick={() => navigate('/bookings')}
                style={styles.viewBookingsBtn}
              >
                View my bookings
              </button>
            </div>
          ) : (
            <>
              <div style={styles.dateInputs}>
                <div style={styles.dateField}>
                  <label style={styles.label}>Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    style={styles.dateInput}
                  />
                </div>
                <div style={styles.dateField}>
                  <label style={styles.label}>Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    style={styles.dateInput}
                  />
                </div>
              </div>

              <button onClick={handleBook} style={styles.bookBtn}>
                Reserve now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '24px',
  },
  backBtn: {
    background: 'none',
    border: '1px solid #ddd',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '20px',
    color: '#333',
  },
  imageContainer: {
    width: '100%',
    height: '400px',
    borderRadius: '16px',
    overflow: 'hidden',
    marginBottom: '32px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    display: 'flex',
    gap: '48px',
    alignItems: 'flex-start',
  },
  info: {
    flex: 1,
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px',
  },
  title: {
    fontSize: '26px',
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: '16px',
  },
  favoriteBtn: {
    background: 'none',
    border: '1px solid #ddd',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
  location: {
    fontSize: '16px',
    color: '#717171',
    marginBottom: '12px',
  },
  badges: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
  },
  badge: {
    backgroundColor: '#f7f7f7',
    border: '1px solid #ddd',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    color: '#333',
    textTransform: 'capitalize',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
  },
  rating: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
  },
  reviews: {
    fontSize: '14px',
    color: '#717171',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #ebebeb',
    margin: '24px 0',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#333',
  },
  description: {
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.7',
  },
  amenities: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  amenity: {
    fontSize: '15px',
    color: '#333',
  },
  bookingCard: {
    width: '360px',
    flexShrink: 0,
    border: '1px solid #ddd',
    borderRadius: '16px',
    padding: '24px',
    position: 'sticky',
    top: '100px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  },
  price: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '4px',
  },
  ratingSmall: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '20px',
  },
  dateInputs: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '16px',
  },
  dateField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#333',
    textTransform: 'uppercase',
  },
  dateInput: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
  },
  bookBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#FF385C',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  successBox: {
    textAlign: 'center',
    padding: '20px 0',
  },
  successText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '16px',
  },
  viewBookingsBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    cursor: 'pointer',
  },
}

export default ListingDetails