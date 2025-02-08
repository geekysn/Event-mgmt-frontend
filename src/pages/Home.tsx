import type React from "react"
import { Link } from "react-router-dom"

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Event Manager</h1>
      <p className="mb-8">Organize and manage your events with ease.</p>
      <Link to="/events" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        View Events
      </Link>
    </div>
  )
}

export default Home

