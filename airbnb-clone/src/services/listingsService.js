import api from './api'

export async function fetchListings(placeId = 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ') {
  const response = await api.get('/api/v2/searchPropertyByPlaceId', {
    params: {
      placeId: placeId,
    },
  })

  // The API returns deeply nested data - we normalize it here
  const results = response.data?.data?.list || []

  return results.map((item) => ({
    id: item.listing?.id,
    name: item.listing?.name,
    city: item.listing?.city,
    country: item.listing?.country,
    price: item.pricingQuote?.structuredStayDisplayPrice?.primaryLine?.price || 'N/A',
    rating: item.listing?.avgRatingLocalized,
    reviewCount: item.listing?.reviewsCount,
    image: item.listing?.contextualPictures?.[0]?.picture,
    isSuperhost: item.listing?.isSuperhost,
    roomType: item.listing?.roomTypeCategory,
  }))
}