import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks, site } from '../data/site'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)')

    function closeAtDesktop(event) {
      if (event.matches) setIsOpen(false)
    }

    desktopQuery.addEventListener('change', closeAtDesktop)
    return () => desktopQuery.removeEventListener('change', closeAtDesktop)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          to="/"
          className="group inline-flex items-center gap-3"
          aria-label={`${site.name} — home`}
        >
          <span className="font-display text-xl font-semibold tracking-[-0.03em] text-paper">
            {site.name}
            <span className="text-lime">.</span>
          </span>
          <span
            aria-hidden="true"
            className="hidden h-px w-6 bg-line transition-colors group-hover:bg-lime sm:block"
          />
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted sm:block">
            {site.role}
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-lime hover:text-lime md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>

      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-line md:hidden"
        >
          <ul className="mx-auto max-w-[1440px] px-5 sm:px-8">
            {navLinks.map((link, index) => (
              <li key={link.href} className="border-b border-line last:border-b-0">
                <a
                  href={link.href}
                  className="flex items-center justify-between py-4 text-paper"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em]">
                    {link.label}
                  </span>
                  <span className="font-display text-[10px] tracking-[0.16em] text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Navbar
