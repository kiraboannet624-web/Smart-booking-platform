import { createContext, useContext, useState, useEffect } from 'react'

// Create the context
const AppContext = createContext()

// Create the provider component
export function AppProvider({ children }) {

  // Favorites state - loaded from localStorage so it persists
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  // Filters state
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    roomType: 'all',
  })

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  // Add a listing to favorites
  function addFavorite(listing) {
    setFavorites((prev) => {
      // Don't add if already in favorites
      if (prev.find((item) => item.id === listing.id)) return prev
      return [...prev, listing]
    })
  }

  // Remove a listing from favorites
  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
  }

  // Check if a listing is already in favorites
  function isFavorite(id) {
    return favorites.some((item) => item.id === id)
  }

  // Update filters
  function updateFilters(newFilters) {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  return (
    <AppContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      filters,
      updateFilters,
    }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the context easily
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider')
  }
  return context
}