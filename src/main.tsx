import React from "react"
import "./index.css"
import App from "./App"
import { AuthProvider } from "./contexts/AuthContext"
import { SocketProvider } from "./contexts/SocketContext"
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
  </AuthProvider>
</React.StrictMode>
)

// ReactDOM.render(
//   <React.StrictMode>
//     <AuthProvider>
//       <SocketProvider>
//         <App />
//       </SocketProvider>
//     </AuthProvider>
//   </React.StrictMode>,
//   document.getElementById("root"),
// )

