import { createContext, useContext, useState, useEffect } from 'react'
const AppContext = createContext()

export function AppProvider({ children }) {

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    roomType: 'all',
  })

  
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  function addFavorite(listing) {
    setFavorites((prev) => {
    
      if (prev.find((item) => item.id === listing.id)) return prev
      return [...prev, listing]
    })
  }

  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
  }

  function isFavorite(id) {
    return favorites.some((item) => item.id === id)
  }

  
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

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider')
  }
  return context
}