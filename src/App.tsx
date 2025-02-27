import type React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import EventDashboard from "./pages/EventDashboard"
import EventCreation from "./pages/EventCreation"
import EventDetails from "./pages/EventDetails.tsx"
import PrivateRoute from "./components/PrivateRoute"

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/events"
                element={
                  <PrivateRoute>
                    <EventDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/events/create"
                element={
                  <PrivateRoute>
                    <EventCreation />
                  </PrivateRoute>
                }
              />
              <Route path="/events/:id" element={<EventDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

