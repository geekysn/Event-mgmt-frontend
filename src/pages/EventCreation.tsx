import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createEvent } from "../services/api"

const EventCreation: React.FC = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [venue, setVenue] = useState("")
  const [category, setCategory] = useState("")
  const [capacity, setCapacity] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log(name, description, date, venue, category, capacity, image)
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("date", date)
      formData.append("venue", venue)
      formData.append("category", category)
      formData.append("capacity", capacity)
      if (image) {
        formData.append("image", image)
      }
      // Proper way to debug FormData
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
      await createEvent(formData)
      navigate("/events")
    } catch (error) {
      console.error("Event creation failed:", error)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Event Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label htmlFor="date" className="block mb-1">
            Date
          </label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="venue" className="block mb-1">
            Venue
          </label>
          <input
            type="text"
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="capacity" className="block mb-1">
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-1">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create Event
        </button>
      </form>
    </div>
  )
}

export default EventCreation

