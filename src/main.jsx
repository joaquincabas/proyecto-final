import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './pages/home'
import { Login } from './pages/Login'

import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
