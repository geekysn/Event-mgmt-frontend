import type React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Header: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Event Manager
        </Link>
        <nav>
          {user ? (
            <>
              <Link to="/events" className="mr-4">
                Events
              </Link>
              <Link to="/events/create" className="mr-4">
                Create Event
              </Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header

