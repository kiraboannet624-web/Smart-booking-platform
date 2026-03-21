import { useQuery } from '@tanstack/react-query'
import { fetchListings } from '../services/listingsService'

export function useListings(placeId) {
  return useQuery({
    queryKey: ['listings', placeId],
    queryFn: () => fetchListings(placeId),
  })
}