export default function useAuthenticated() {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token && token.length === 8

  return { isAuthenticated }
}
