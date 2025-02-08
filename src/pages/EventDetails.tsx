import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getEvent, attendEvent } from "../services/api"
import type { Event } from "../types.ts"
import { useAuth } from "../contexts/AuthContext"
import { useSocket } from "../contexts/SocketContext"

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const socket = useSocket()

  useEffect(() => {
    fetchEvent()
  }, []) // Removed unnecessary dependency 'id'

  useEffect(() => {
    if (socket) {
      socket.on("attendeeUpdate", (data: { eventId: string; attendeeCount: number }) => {
        if (data.eventId === id) {
          setEvent((prevEvent) => (prevEvent ? { ...prevEvent, attendees: Array(data.attendeeCount).fill("") } : null))
        }
      })
    }
    return () => {
      if (socket) {
        socket.off("attendeeUpdate")
      }
    }
  }, [socket, id])

  const fetchEvent = async () => {
    try {
      if (id) {
        const fetchedEvent = await getEvent(id)
        setEvent(fetchedEvent)
      }
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch event details")
      setLoading(false)
    }
  }

  const handleAttend = async () => {
    try {
      if (id) {
        await attendEvent(id)
        fetchEvent() // Refetch event to update attendee count
      }
    } catch (err) {
      console.error("Failed to attend event:", err)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!event) return <div>Event not found</div>

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{event.name}</h2>
      <img
        src={event.image || "/placeholder.svg"}
        alt={event.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleString()}</p>
      <p className="text-gray-600 mb-4">{event.venue}</p>
      <p className="mb-4">{event.description}</p>
      <p className="text-gray-600 mb-2">Category: {event.category}</p>
      <p className="text-gray-600 mb-4">Capacity: {event.capacity}</p>
      <p className="text-gray-600 mb-4">Attendees: {event.attendees.length}</p>
      {user && !event.attendees.includes(user.id) && (
        <button onClick={handleAttend} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Attend Event
        </button>
      )}
    </div>
  )
}

export default EventDetails

