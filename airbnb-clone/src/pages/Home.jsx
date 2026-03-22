import { useSearchParams } from 'react-router-dom'
import { useListings } from '../hooks/useListings'
import ListingCard from '../components/ListingCard'
import Loader from '../components/ui/loader'
import ErrorState from '../components/ui/ErrorState'

function Home() {
  const [searchParams] = useSearchParams()
  const placeId = searchParams.get('placeId')
  const city = searchParams.get('city')

  const { data: listings, isLoading, isError, error } = useListings(placeId)

  if (isLoading) return <Loader />
  if (isError) return <ErrorState message={error.message} />

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>
        {city ? `Places to stay in ${city.charAt(0).toUpperCase() + city.slice(1)}` : 'Places to stay'}
      </h2>
      <p style={styles.count}>{listings.length} properties found</p>
      <div style={styles.grid}>
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
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
    fontSize: '24px',
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
}

export default Home