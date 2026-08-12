import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Feedback from './pages/Feedback'
import Reservation from './pages/Reservation'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'

function AppRoutes() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <>
      {!isDashboard && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/eventi" element={<Events />} />
          <Route path="/galleria" element={<Gallery />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/prenotazione" element={<Reservation />} />
          <Route path="/contatto" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AnimatePresence>
      {!isDashboard && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a3a2a',
            color: '#fff',
            borderRadius: '12px',
            border: '1px solid rgba(200,169,110,0.3)',
          },
          success: {
            iconTheme: { primary: '#c8a96e', secondary: '#1a3a2a' }
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' }
          }
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  )
}
