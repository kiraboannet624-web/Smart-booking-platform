import axios from 'axios'

console.log('API KEY:', import.meta.env.VITE_RAPID_API_KEY)

const api = axios.create({
  baseURL: 'https://airbnb19.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
    'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
    'Content-Type': 'application/json',
  },
})

export default api