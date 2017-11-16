export const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

// Generate a unique token for storing the Posts data on the backend server
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

// Switch to 'Content-Type: 'application/json', so it works with the Udacity API
export const headers = {
  'Content-Type': 'application/json',
  'Authorization': token
}
