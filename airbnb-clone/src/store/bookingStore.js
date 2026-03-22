import { create } from 'zustand'

const useBookingStore = create((set, get) => ({
  // State
  bookings: [],

  // Add a new booking
  addBooking: (listing, checkIn, checkOut) => {
    const newBooking = {
      id: Date.now(), // simple unique id
      listingId: listing.id,
      listingName: listing.name,
      listingImage: listing.image,
      listingCity: listing.city,
      price: listing.price,
      checkIn,
      checkOut,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
    }

    set((state) => ({
      bookings: [...state.bookings, newBooking],
    }))
  },

  // Cancel a booking
  cancelBooking: (bookingId) => {
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      ),
    }))
  },

  // Remove a booking completely
  removeBooking: (bookingId) => {
    set((state) => ({
      bookings: state.bookings.filter((booking) => booking.id !== bookingId),
    }))
  },

  // Get only confirmed bookings
  getConfirmedBookings: () => {
    return get().bookings.filter((b) => b.status === 'confirmed')
  },
}))

export default useBookingStore