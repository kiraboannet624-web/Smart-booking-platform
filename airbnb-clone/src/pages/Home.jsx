import { useListings } from '../hooks/useListings'
import ListingCard from '../components/ListingCard'
import Loader from '../components/ui/loader'
import ErrorState from '../components/ui/ErrorState'

function Home() {
  const { data: listings, isLoading, isError, error } = useListings()

  if (isLoading) return <Loader />
  if (isError) return <ErrorState message={error.message} />

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Places to stay</h2>
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
    marginBottom: '24px',
    color: '#333',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
}

export default Home