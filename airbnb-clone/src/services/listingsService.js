import api from './Api'

// Map of city names to their Google Place IDs
export const cityPlaceIds = {
  paris: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ',
  'new york': 'ChIJOwg_06VPwokRYv534QaPC8g',
  london: 'ChIJdd4hrwug2EcRmSrV3Vo6llI',
  tokyo: 'ChIJ51cu8IcbXWARiRtXIothAS4',
  dubai: 'ChIJRcbZaklDXz4RYlEphFBu5r0',
  barcelona: 'ChIJ5TCOcRaYpBIRCmZHTz37sEQ',
  rome: 'ChIJu46S-ZZhLxMROG5lkwZ3D7k',
  amsterdam: 'ChIJVXealLU_xkcRja_At0z9AGQ',
  bali: 'ChIJoQ8Q6NB1yTARNUTfaSNWNMc',
  sydney: 'ChIJP3Sa8ziYEmsRUKgyFmh9AQM',
}

export function getPlaceId(cityName) {
  const key = cityName.toLowerCase().trim()
  return cityPlaceIds[key] || 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ'
}

// Mock data fallback
export const mockListings = [
  {
    id: '1',
    name: 'Cozy Apartment in City Center',
    city: 'Paris',
    country: 'France',
    price: '$120/night',
    rating: '4.92',
    reviewCount: 245,
    image: 'https://picsum.photos/seed/listing1/400/300',
    isSuperhost: true,
    roomType: 'entire_home',
  },
  {
    id: '2',
    name: 'Modern Studio with Sea View',
    city: 'Barcelona',
    country: 'Spain',
    price: '$95/night',
    rating: '4.85',
    reviewCount: 189,
    image: 'https://picsum.photos/seed/listing2/400/300',
    isSuperhost: false,
    roomType: 'private_room',
  },
  {
    id: '3',
    name: 'Charming Cottage in the Hills',
    city: 'Tuscany',
    country: 'Italy',
    price: '$200/night',
    rating: '4.97',
    reviewCount: 312,
    image: 'https://picsum.photos/seed/listing3/400/300',
    isSuperhost: true,
    roomType: 'entire_home',
  },
  {
    id: '4',
    name: 'Luxury Penthouse Downtown',
    city: 'New York',
    country: 'USA',
    price: '$350/night',
    rating: '4.78',
    reviewCount: 98,
    image: 'https://picsum.photos/seed/listing4/400/300',
    isSuperhost: false,
    roomType: 'entire_home',
  },
  {
    id: '5',
    name: 'Beachfront Bungalow',
    city: 'Bali',
    country: 'Indonesia',
    price: '$75/night',
    rating: '4.90',
    reviewCount: 420,
    image: 'https://picsum.photos/seed/listing5/400/300',
    isSuperhost: true,
    roomType: 'entire_home',
  },
  {
    id: '6',
    name: 'Historic Townhouse',
    city: 'Prague',
    country: 'Czech Republic',
    price: '$110/night',
    rating: '4.88',
    reviewCount: 167,
    image: 'https://picsum.photos/seed/listing6/400/300',
    isSuperhost: false,
    roomType: 'private_room',
  },
]

export async function fetchListings(placeId = 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ') {
  try {
    const response = await api.get('/api/v2/searchPropertyByPlaceId', {
      params: {
        placeId: placeId,
      },
    })

    const results = response.data?.data?.list || []

    if (results.length === 0) return mockListings

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

  } catch (error) {
    if (error.response?.status === 429 || error.response?.status === 504) {
      console.warn('API limit reached - using mock data')
      return mockListings
    }
    throw error
  }
}