"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import io, { type Socket } from "socket.io-client"

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null })

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    setSocket(newSocket)

    return () => {
      if (newSocket) {
        newSocket.close()
      }
    }
  }, [])

  const value = {
    socket,
  }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context.socket
}
