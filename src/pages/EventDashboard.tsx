import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getEvents } from "../services/api"
import type { Event } from "../types.ts"

const EventDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents()
      setEvents(fetchedEvents)
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch events")
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Event Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Link key={event._id} to={`/events/${event._id}`} className="block">
            <div className="border rounded p-4 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-600">{event.venue}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default EventDashboard

