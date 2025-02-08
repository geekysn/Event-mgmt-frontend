export interface User {
    id: string;
    name: string;
    email: string;
    role?: "user" | "admin";
  }
  
  export interface Event {
    _id: string;
    name: string;
    description: string;
    date: string;
    venue: string;
    category: string;
    capacity: number;
    image?: string;
    organizer: User;
    attendees: string[]; // Array of user IDs
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  export interface AttendeeUpdateData {
    eventId: string;
    attendeeCount: number;
    capacity: number;
  }
  
  export interface APIError {
    message: string;
    errors?: Array<{
      msg: string;
      param: string;
    }>;
  }