import useBookingStore from '../store/bookingStore'
import { useNavigate } from 'react-router-dom'

function Booking() {
  const { bookings, cancelBooking, removeBooking } = useBookingStore()
  const navigate = useNavigate()

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Your Bookings</h1>

      {bookings.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyIcon}>📋</p>
          <h2 style={styles.emptyTitle}>No bookings yet</h2>
          <p style={styles.emptyText}>
            Find a place you love and make your first booking
          </p>
          <button
            onClick={() => navigate('/')}
            style={styles.exploreBtn}
          >
            Explore listings
          </button>
        </div>
      ) : (
        <div style={styles.list}>
          {bookings.map((booking) => (
            <div key={booking.id} style={styles.card}>
              {/* Image */}
              <img
                src={booking.listingImage}
                alt={booking.listingName}
                style={styles.image}
              />

              {/* Booking info */}
              <div style={styles.info}>
                <div style={styles.topRow}>
                  <h3 style={styles.name}>{booking.listingName}</h3>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: booking.status === 'confirmed' ? '#e8f5e9' : '#fce4ec',
                    color: booking.status === 'confirmed' ? '#2e7d32' : '#c62828',
                  }}>
                    {booking.status === 'confirmed' ? '✓ Confirmed' : '✗ Cancelled'}
                  </span>
                </div>

                <p style={styles.city}>📍 {booking.listingCity}</p>
                <p style={styles.dates}>
                  📅 {booking.checkIn} → {booking.checkOut}
                </p>
                <p style={styles.price}>💰 {booking.price}</p>
                <p style={styles.bookedAt}>
                  Booked on {new Date(booking.bookedAt).toLocaleDateString()}
                </p>

                {/* Action buttons */}
                <div style={styles.actions}>
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      style={styles.cancelBtn}
                    >
                      Cancel booking
                    </button>
                  )}
                  <button
                    onClick={() => removeBooking(booking.id)}
                    style={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  page: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '24px',
    color: '#333',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    display: 'flex',
    gap: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: '16px',
  },
  image: {
    width: '160px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
    flexShrink: 0,
  },
  info: {
    flex: 1,
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px',
  },
  name: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: '12px',
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  city: {
    fontSize: '14px',
    color: '#717171',
    marginBottom: '4px',
  },
  dates: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '4px',
  },
  price: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px',
  },
  bookedAt: {
    fontSize: '12px',
    color: '#717171',
    marginBottom: '12px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  cancelBtn: {
    padding: '8px 16px',
    backgroundColor: '#fff',
    color: '#c62828',
    border: '1px solid #c62828',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  removeBtn: {
    padding: '8px 16px',
    backgroundColor: '#f7f7f7',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
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

export default Booking