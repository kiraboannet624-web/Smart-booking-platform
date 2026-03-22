# StayFinder — Accommodation Booking Platform

A production-grade accommodation booking platform built with React, inspired by Airbnb.
This project demonstrates complex state management, API integration, caching strategies,
and modern frontend architecture.


## Project Structure
airbnb-clone/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Loader.jsx          # Loading spinner component
│   │   │   └── ErrorState.jsx      # Error display component
│   │   ├── Navbar.jsx              # Top navigation with search
│   │   └── ListingCard.jsx         # Property card component
│   ├── context/
│   │   └── AppContext.jsx          # Global state for favorites & filters
│   ├── hooks/
│   │   └── useListings.js          # Custom hook for fetching listings
│   ├── pages/
│   │   ├── Home.jsx                # Listings feed page
│   │   ├── ListingDetails.jsx      # Single property page
│   │   ├── Bookings.jsx            # User bookings dashboard
│   │   ├── Favorites.jsx           # Saved listings page
│   │   └── Login.jsx               # Authentication page
│   ├── services/
│   │   ├── api.js                  # Centralized Axios instance
│   │   └── listingsService.js      # API calls & data transformation
│   ├── store/
│   │   └── bookingStore.js         # Zustand store for bookings
│   ├── App.jsx                     # Root component & routing
│   └── main.jsx                    # App entry point & providers
├── .env                            # Environment variables (not committed)
├── .gitignore
├── package.json
└── README.md


#Features

- Browse property listings fetched from the Airbnb API
- Search listings by city name
- View detailed property information
- Book properties with check-in and check-out dates
- Save and manage favorite listings
- User authentication with protected routes
- Persistent favorites using localStorage
- Intelligent caching to avoid unnecessary API calls
- Graceful error handling with fallback mock data


## Tech Stack

 Tool and its Purpose 

 React + Vite  Frontend framework and build tool 
 React Router DOM | Client-side routing 
 Axios | HTTP requests 
 TanStack Query | Server state management and caching 
 Zustand | Client state management for bookings 
 Context API | Global state for favorites and filters 
 localStorage | Data persistence across sessions 


## API Integration

This project uses the **Airbnb API** provided via RapidAPI.

### Base Endpoint

https://airbnb19.p.rapidapi.com/api/v2/searchPropertyByPlaceId




### Caching Strategy

TanStack Query caches responses using a queryKey based on the Place ID.
Navigating between pages does not trigger new API calls — data loads
instantly from cache until the staleTime of 5 minutes expires.


### Error Handling

If the API returns a 429 (rate limit) or 504 error, the app
automatically falls back to mock data so the UI never crashes:



## State Management

I used three layers of state management depending on the complexity
of each feature:

### Local State (useState)
Used for form inputs, date pickers, and UI toggles inside components.

### Global State (Context API)
`AppContext.jsx` manages favorites and search filters across pages.
Favorites are persisted to localStorage automatically.

### Server State (TanStack Query)
All API data goes through TanStack Query for caching, background
updates, and loading/error state handling.

### Complex State (Zustand)
`bookingStore.js` manages booking logic including adding, cancelling,
and removing bookings using a clean action-based pattern.


### 3. Create your `.env` file

Create a file called .env in the root of the project:

VITE_RAPID_API_KEY=your_rapidapi_key_here


> Get your free API key from [RapidAPI](https://rapidapi.com) by
> subscribing to the Airbnb19 API.

> Important: Never commit your .env file. It is already listed
> in `.gitignore`.

Author

Built by [KIRABO ANNET]  
