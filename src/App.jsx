import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

/*
 * App
 * Root application component.
 * Composes top-level layout: `Navbar`, `Manager` (main feature), and `Footer`.
 * Keeps state minimal here; primary state lives inside feature components.
 */
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      {/* Main password manager UI */}
      <Manager />
      <Footer />
    </div>
  )
}

export default App
