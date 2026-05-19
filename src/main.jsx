import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/*
 * Entry point
 * Renders the React application into the #root element using StrictMode.
 * Keep this file minimal — side effects and global providers belong in separate modules.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
