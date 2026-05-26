import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'
import { PalettePage } from './pages/PalettePage.tsx'
import { SchedulePage } from './pages/SchedulePage.tsx'

const path = window.location.pathname

function Root() {
  if (path === '/palette') return <PalettePage />
  if (path === '/schedule') return <SchedulePage />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
