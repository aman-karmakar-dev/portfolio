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

        <a
          href="https://github.com/aman-karmakar-dev"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit GitHub profile"
          className="ml-auto mr-3 inline-flex size-11 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-lime hover:text-lime md:ml-6 md:mr-0"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.52.4.35.76 1.03.76 2.08v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>
        </a>

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
