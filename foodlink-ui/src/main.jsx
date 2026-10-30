import React from 'react'
import ReactDOM from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import App from './App.jsx'
import './index.css'
import { RoleProvider } from './context/RoleContext'
import { StoreProvider } from './context/StoreContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RoleProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </RoleProvider>
  </React.StrictMode>,
)

