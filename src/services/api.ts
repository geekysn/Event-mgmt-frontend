import axios from "axios"
// import dotenv from "dotenv"
// dotenv.config()

const API_URL = "https://event-mgmt-backend.onrender.com/api"

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw error;
  }
};

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post("/auth/register", { name, email, password })
  return response.data
}

export const loginAsGuest = async () => {
  const response = await api.post("/auth/guest")
  return response.data
}

export const getEvents = async () => {
  const response = await api.get("/events")
  return response.data
}

export const getEvent = async (id: string) => {
  const response = await api.get(`/events/${id}`)
  return response.data
}

export const createEvent = async (eventData: FormData) => {
  const response = await api.post("/events", eventData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response.data
}

export const attendEvent = async (id: string) => {
  const response = await api.post(`/events/${id}/attend`)
  return response.data
}

