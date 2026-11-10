import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { aurelis, contact, navLinks, site, socials } from '../data/site'

function Footer() {
  const reduceMotion = useReducedMotion()

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
          <div>
            <Link
              to="/"
              className="font-display text-[clamp(2rem,4vw,2.75rem)] font-medium leading-none tracking-[-0.04em] text-paper"
              aria-label={`${site.name} — home`}
            >
              {site.name}
              <span className="text-lime">.</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-muted">
              {site.tagline}
            </p>
            <p className="mt-6 max-w-xs text-[11px] uppercase tracking-[0.16em] text-muted">
              Based in India &mdash; available worldwide
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              Index
            </p>
            <ul className="mt-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              Connect
            </p>
            <ul className="mt-4 space-y-1">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                    className="nav-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-b border-line py-2 font-display text-sm font-medium tracking-[-0.02em] text-paper transition-colors hover:border-lime hover:text-lime"
            >
              {contact.phone}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
            Selected work
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <Link
              to={aurelis.path}
              className="group inline-flex items-center gap-3 font-serif text-[clamp(2.25rem,7vw,4.5rem)] uppercase leading-none tracking-[0.06em] text-paper transition-colors hover:text-lime"
            >
              {aurelis.name}
              <ArrowUpRight
                size={22}
                aria-hidden="true"
                className="mb-1 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime"
              />
            </Link>
            <span className="text-[10px] uppercase tracking-[0.16em] text-muted">
              Flagship case study
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-[10px] uppercase tracking-[0.16em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name} &mdash; {site.role}
          </p>
          <p>Built with React, Vite &amp; Tailwind CSS</p>
          <motion.button
            type="button"
            onClick={backToTop}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96, y: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="group inline-flex items-center gap-2 self-start text-[10px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:text-lime sm:self-auto"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
