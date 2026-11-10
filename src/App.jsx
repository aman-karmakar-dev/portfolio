import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Aurelis from './pages/Aurelis'
import Home from './pages/Home'

function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-[200%] bg-lime px-4 py-2 font-display text-sm font-semibold text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <Routes>
        <Route
          path="/"
          element={
            <SiteLayout>
              <Home />
            </SiteLayout>
          }
        />
        <Route path="/work/aurelis" element={<Aurelis />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
