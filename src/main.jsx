import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Lenis from '@studio-freight/lenis'

// ── Premium smooth scroll via Lenis ──────────────────────────────────────────
const lenis = new Lenis({
  duration: 0.9,          // was 1.1 — snappier, less perceived lag
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothTouch: false,     // keep native touch scroll — no lag on mobile
  touchMultiplier: 1.5,
  wheelMultiplier: 0.9,   // slightly reduced for precision
  lerp: 0.12,             // slightly higher = more responsive
})

window.__lenis = lenis

let rafId
function raf(time) {
  lenis.raf(time)
  rafId = requestAnimationFrame(raf)
}
rafId = requestAnimationFrame(raf)

// Stop RAF when tab is hidden, resume when visible — prevents drift
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(rafId)
  } else {
    rafId = requestAnimationFrame(raf)
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
