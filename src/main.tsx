import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'
import { PalettePage } from './pages/PalettePage.tsx'

const isPalette = window.location.pathname === '/palette'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPalette ? <PalettePage /> : <App />}
  </StrictMode>,
)
