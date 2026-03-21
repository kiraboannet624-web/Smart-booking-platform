
import { useListings } from '../hooks/useListings'

function Home() {
  const { data: listings, isLoading, isError, error } = useListings()

  if (isLoading) {
    return <div><p>Loading listings...</p></div>
  }

  if (isError) {
    return <div><p>Something went wrong: {error.message}</p></div>
  }

  return (
    <div>
      <h1>Listings</h1>
      <p>Found {listings.length} properties</p>

      {listings.map((listing) => (
        <div key={listing.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <img src={listing.image} alt={listing.name} width="200" />
          <h3>{listing.name}</h3>
          <p>{listing.city}, {listing.country}</p>
          <p>Price: {listing.price}</p>
          <p>Rating: {listing.rating} ({listing.reviewCount} reviews)</p>
          {listing.isSuperhost && <span>⭐ Superhost</span>}
        </div>
      ))}
    </div>
  )
}

export default Home