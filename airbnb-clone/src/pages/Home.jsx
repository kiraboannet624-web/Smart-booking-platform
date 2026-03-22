import { useListings } from '../hooks/useListings'
import { useAppContext } from '../context/AppContext'
import useBookingStore from '../store/bookingStore'

function Home() {
  const { data: listings, isLoading, isError, error } = useListings()
  const { favorites, addFavorite, isFavorite } = useAppContext()
  const { bookings, addBooking } = useBookingStore()

  if (isLoading) return <p>Loading listings...</p>
  if (isError) return <p>Something went wrong: {error.message}</p>

  return (
    <div>
      <h1>Listings</h1>
      <p>Favorites: {favorites.length} | Bookings: {bookings.length}</p>

      {listings.map((listing) => (
        <div key={listing.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <img src={listing.image} alt={listing.name} width="200" />
          <h3>{listing.name}</h3>
          <p>{listing.city}, {listing.country}</p>
          <p>Price: {listing.price}</p>
          <p>Rating: {listing.rating}</p>

          {/* Test favorite button */}
          <button onClick={() => addFavorite(listing)}>
            {isFavorite(listing.id) ? '❤️ Saved' : '🤍 Save'}
          </button>

          {/* Test booking button */}
          <button onClick={() => addBooking(listing, '2025-06-01', '2025-06-07')}>
            Book now
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home