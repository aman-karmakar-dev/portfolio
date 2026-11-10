import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const stack = ['React', 'Vite', 'Tailwind CSS', 'GSAP', 'Three.js']

const sections = [
  { id: 'top', label: 'Top' },
  { id: 'overview', label: 'Overview' },
  { id: 'presentation', label: 'Presentation' },
  { id: 'direction', label: 'Direction' },
  { id: 'interface', label: 'Interface' },
  { id: 'responsive', label: 'Responsive' },
  { id: 'closing', label: 'Closing' },
]

const shots = [
  {
    id: 'home',
    tab: 'Home',
    src: '/images/homepage.png',
    width: 1512,
    height: 720,
    alt: 'AURELIS home page with a sunset poolside villa and the headline Architecture & Landscape',
    caption: 'Architecture & landscape / Home',
  },
  {
    id: 'collection',
    tab: 'Collection',
    src: '/images/homepage-scroll.png',
    width: 1512,
    height: 722,
    alt: 'AURELIS collection preview with the Monolith House card and neighbouring residences',
    caption: 'Monolith House / Collection preview',
  },
  {
    id: 'index',
    tab: 'Index',
    src: '/images/properties.png',
    width: 1507,
    height: 717,
    alt: 'AURELIS properties index with the heading Residences of quiet consequence',
    caption: 'Residences of quiet consequence / Properties',
  },
  {
    id: 'residence',
    tab: 'Residence',
    src: '/images/property-details.png',
    width: 1507,
    height: 695,
    alt: 'AURELIS residence grid with Obsidian Form, Red Gables and Glacier Glass',
    caption: 'Obsidian Form, Red Gables, Glacier Glass / Properties',
  },
  {
    id: 'perspective',
    tab: 'Perspective',
    src: '/images/about.png',
    width: 1512,
    height: 712,
    alt: 'AURELIS about page with the heading Beyond the ordinary',
    caption: 'Beyond the ordinary / About',
  },
  {
    id: 'contact',
    tab: 'Contact',
    src: '/images/contact.png',
    width: 1512,
    height: 722,
    alt: 'AURELIS contact page with the heading Every exceptional place begins with a conversation',
    caption: 'Private enquiries / Contact',
  },
]

function SectionIntro({ index, label, title, children }) {
  return (
    <div data-reveal className="max-w-3xl">
      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-aurelis-gold">
        {index} — {label}
      </p>
      <h2 className="mt-6 font-serif text-[clamp(2.6rem,5.6vw,4.8rem)] leading-[0.95] tracking-[-0.01em] text-aurelis-paper">
        {title}
      </h2>
      {children && (
        <div className="mt-6 max-w-xl space-y-4 text-sm leading-7 text-aurelis-paper/65">
          {children}
        </div>
      )}
    </div>
  )
}

function Frame({ src, width, height, alt, caption, eager = false, className = '' }) {
  return (
    <figure data-media className={`group ${className}`}>
      <div className="overflow-hidden border border-aurelis-gold/20 bg-[#0d0f12]">
        <img
          src={src}
          width={width}
          height={height}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.015]"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-aurelis-paper/40">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function Aurelis() {
  const root = useRef(null)
  const [activeShot, setActiveShot] = useState(0)
  const [activeSection, setActiveSection] = useState('top')

  useEffect(() => {
    const previous = document.title
    document.title = 'AURELIS — Case study'

    return () => {
      document.title = previous
    }
  }, [])

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean)

    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.6, 1] },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const hero = gsap.timeline({ defaults: { ease: 'power3.out' } })

        hero
          .from(
            '[data-hero-media]',
            { scale: 1.06, duration: 1.9, ease: 'power2.out' },
            0,
          )
          .from(
            '[data-hero-eyebrow]',
            { autoAlpha: 0, y: 16, duration: 0.6 },
            0.15,
          )
          .from(
            '[data-hero-title]',
            { autoAlpha: 0, y: 40, duration: 1.1 },
            0.22,
          )
          .from(
            '[data-hero-meta] > *',
            { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.08 },
            0.5,
          )

        gsap.utils.toArray('[data-reveal]', root.current).forEach((element) => {
          gsap.from(element, {
            autoAlpha: 0,
            y: 24,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          })
        })

        gsap.utils.toArray('[data-media]', root.current).forEach((element) => {
          gsap.from(element, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1.1,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          })
        })
      })

      return () => media.revert()
    },
    { scope: root },
  )

  const shot = shots[activeShot]
  const currentSection = sections.findIndex((section) => section.id === activeSection)

  return (
    <div ref={root} className="aurelis-route min-h-svh bg-aurelis-ink text-aurelis-paper">
      <header className="sticky top-0 z-50 border-b border-aurelis-gold/25 bg-aurelis-ink">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <a
            href="#top"
            className="font-serif text-lg uppercase tracking-[0.16em] text-aurelis-paper transition-colors hover:text-aurelis-gold"
          >
            AURELIS
          </a>

          <p className="hidden text-[10px] font-medium uppercase tracking-[0.24em] text-aurelis-paper/40 sm:block">
            Case study — Selected work 01
          </p>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-aurelis-paper/60 transition-colors hover:text-aurelis-gold"
          >
            <ArrowLeft
              size={14}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to portfolio
          </Link>
        </div>
      </header>

      <nav
        aria-label="Case study sections"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <ul className="flex flex-col items-center gap-1">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={activeSection === section.id ? 'location' : undefined}
                className="group flex size-8 items-center justify-center"
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    currentSection >= index
                      ? 'w-6 bg-aurelis-gold'
                      : 'w-3 bg-aurelis-paper/25 group-hover:bg-aurelis-paper/60'
                  }`}
                />
                <span className="sr-only">{section.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main id="main" tabIndex={-1} className="outline-none">
        <section id="top" className="relative isolate overflow-hidden border-b border-aurelis-gold/20">
          <div data-hero-media className="absolute inset-0 overflow-hidden">
            <img
              src="/images/homepage.png"
              alt=""
              width="1512"
              height="720"
              loading="eager"
              decoding="async"
              className="absolute inset-x-0 -top-14 h-[calc(100%+3.5rem)] w-full object-cover object-[75%_45%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-aurelis-ink/80 via-aurelis-ink/25 to-transparent lg:hidden"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden bg-[linear-gradient(90deg,var(--color-aurelis-ink)_0%,var(--color-aurelis-ink)_31%,rgba(8,9,11,0.93)_42%,rgba(8,9,11,0.6)_56%,rgba(8,9,11,0.12)_72%,rgba(8,9,11,0)_86%)] lg:block"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-aurelis-ink via-aurelis-ink/45 to-transparent"
            />
          </div>

          <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-[1440px] flex-col justify-end px-5 pb-12 pt-28 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
            <p
              data-hero-eyebrow
              className="text-[10px] font-medium uppercase tracking-[0.24em] text-aurelis-gold"
            >
              Luxury real estate / Front-end development
            </p>

            <h1
              data-hero-title
              className="mt-5 font-serif text-[clamp(4.4rem,15vw,12rem)] leading-[0.78] tracking-[-0.02em]"
            >
              AURELIS
            </h1>

            <div
              data-hero-meta
              className="mt-8 flex flex-col gap-4 border-t border-aurelis-gold/30 pt-5 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="max-w-md text-sm leading-7 text-aurelis-paper/70">
                A premium real-estate concept built around architecture, landscape and
                quiet restraint.
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-aurelis-paper/40">
                Scroll to explore
              </p>
            </div>
          </div>
        </section>

        <section id="overview" className="scroll-mt-20 border-b border-aurelis-gold/20">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <SectionIntro index="01" label="Overview" title="A study in stillness and scale.">
                  <p>
                    AURELIS is a luxury real-estate concept shaped around architectural
                    photography. Instead of a conventional listings grid, each residence is
                    treated as an editorial subject — framed by generous space, restrained
                    type and a palette drawn from ink, paper and warm metal.
                  </p>
                  <p>
                    Four views carry the experience: a cinematic home, a curated property
                    index, the perspective behind the practice and a private enquiries page.
                    Across each one, the same rules hold: one strong image, a clear hierarchy
                    and very little noise.
                  </p>
                </SectionIntro>
              </div>

              <aside data-reveal className="lg:col-span-4 lg:col-start-9">
                <dl className="border-t border-aurelis-gold/25">
                  {[
                    ['Role', 'Design and front-end development'],
                    ['Project', 'Personal concept'],
                    ['Focus', 'Luxury real estate'],
                  ].map(([term, detail]) => (
                    <div
                      key={term}
                      className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-aurelis-gold/15 py-4"
                    >
                      <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-aurelis-paper/40">
                        {term}
                      </dt>
                      <dd className="text-sm leading-6 text-aurelis-paper/80">{detail}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-aurelis-paper/40">
                  Stack
                </p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {stack.map((item) => (
                    <li
                      key={item}
                      className="border border-aurelis-gold/25 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-aurelis-paper/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section id="presentation" className="scroll-mt-20 border-b border-aurelis-gold/20">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <SectionIntro index="02" label="Presentation" title="The first impression is architectural.">
              <p>
                The collection is introduced through scale. A single residence fills the
                frame before its name, location and specification appear, letting the
                architecture set the pace of the page.
              </p>
            </SectionIntro>

            <div className="mt-14 space-y-6 sm:space-y-8 lg:mt-20">
              <Frame
                src="/images/homepage-scroll.png"
                width={1512}
                height={722}
                alt="AURELIS collection preview with the Monolith House card and neighbouring residences"
                caption="Fig. 01 — A collection introduced as a sequence, not a list"
              />

              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <Frame
                  className="lg:col-span-10 lg:col-start-3"
                  src="/images/properties.png"
                  width={1507}
                  height={717}
                  alt="AURELIS properties index with the heading Residences of quiet consequence"
                  caption="Fig. 02 — Index typography and a single oversized numeral"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="direction" className="scroll-mt-20 border-b border-aurelis-gold/20">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <SectionIntro index="03" label="Direction" title="Ink, paper and warm metal.">
                  <p>
                    The visual system stays deliberately narrow. Near-black ink holds the
                    photography; warm paper carries the text; a single muted gold marks the
                    details that need attention. Nothing else competes.
                  </p>
                </SectionIntro>

                <ol data-reveal className="mt-10 border-t border-aurelis-gold/25">
                  {[
                    [
                      'Photography first',
                      'Full-bleed imagery carries the atmosphere while the interface recedes into rules and labels.',
                    ],
                    [
                      'Editorial type',
                      'Display serif headlines sit against small uppercase metadata with wide tracking.',
                    ],
                    [
                      'Restrained colour',
                      'Three values do the work: ink, paper and a warm gold used only for emphasis.',
                    ],
                    [
                      'Measured motion',
                      'Reveals follow the scroll and settle quickly, keeping attention on the residences.',
                    ],
                  ].map(([title, copy], index) => (
                    <li
                      key={title}
                      className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-aurelis-gold/15 py-5"
                    >
                      <span className="pt-0.5 font-display text-[10px] tracking-[0.18em] text-aurelis-gold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-serif text-xl leading-tight">{title}</h3>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-aurelis-paper/60">
                          {copy}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div data-reveal className="lg:col-span-6 lg:col-start-7 lg:self-end">
                <Frame
                  src="/images/about.png"
                  width={1512}
                  height={712}
                  alt="AURELIS about page with the heading Beyond the ordinary"
                  caption="Fig. 03 — Perspective set against a single architectural frame"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="interface" className="scroll-mt-20 border-b border-aurelis-gold/20">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <SectionIntro index="04" label="Interface" title="Small signals, consistently applied.">
              <p>
                A shared vocabulary runs through every view: numbered indices, uppercase
                labels, hairline rules and generous negative space. The detail never
                announces itself, but it keeps the experience coherent.
              </p>
            </SectionIntro>

            <div data-reveal className="mt-12 lg:mt-16">
              <div className="relative aspect-[1512/720] overflow-hidden border border-aurelis-gold/20 bg-[#0d0f12]">
                {shots.map((item, index) => (
                  <img
                    key={item.id}
                    src={item.src}
                    width={item.width}
                    height={item.height}
                    alt={index === activeShot ? item.alt : ''}
                    aria-hidden={index === activeShot ? undefined : 'true'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className={`absolute inset-0 size-full object-cover object-top transition-[opacity,transform] duration-700 ease-out ${
                      index === activeShot
                        ? 'scale-100 opacity-100'
                        : 'pointer-events-none scale-[1.01] opacity-0'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-4 border-t border-aurelis-gold/25 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p
                  aria-live="polite"
                  className="text-[10px] font-medium uppercase tracking-[0.2em] text-aurelis-paper/40"
                >
                  {shot.caption}
                </p>

                <div
                  role="group"
                  aria-label="Screenshot gallery"
                  className="-mx-1 flex gap-1 overflow-x-auto pb-1"
                >
                  {shots.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={index === activeShot}
                      onClick={() => setActiveShot(index)}
                      className={`shrink-0 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors ${
                        index === activeShot
                          ? 'text-aurelis-gold'
                          : 'text-aurelis-paper/40 hover:text-aurelis-paper'
                      }`}
                    >
                      {item.tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-8 border-t border-aurelis-gold/25 pt-8 sm:grid-cols-3 lg:mt-20">
              {[
                [
                  'Build',
                  'A component-driven React application bootstrapped with Vite, keeping each view composed from the same small set of primitives.',
                ],
                [
                  'Styling',
                  'Tailwind CSS holds the layout and the ink, paper and gold token set together across the collection, perspective and enquiry views.',
                ],
                [
                  'Motion',
                  'GSAP supports the entrance and scroll-linked reveals, tying movement to the photography rather than decorating the interface.',
                ],
              ].map(([title, copy]) => (
                <div key={title} data-reveal>
                  <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-aurelis-gold">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-aurelis-paper/60">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="responsive" className="scroll-mt-20 border-b border-aurelis-gold/20">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
              <div data-reveal className="lg:col-span-7">
                <Frame
                  src="/images/property-details.png"
                  width={1507}
                  height={695}
                  alt="AURELIS residence grid with Obsidian Form, Red Gables and Glacier Glass"
                  caption="Fig. 04 — Residence cards keep their hierarchy as the grid changes"
                />
              </div>

              <div className="lg:col-span-4 lg:col-start-9 lg:self-center">
                <SectionIntro index="05" label="Responsive" title="The same hierarchy at every width.">
                  <p>
                    The composition is built to hold its composure from wide desktop canvases
                    down to narrow screens. Images keep their crops, display type scales with
                    the viewport, and supporting details reflow beneath the photograph without
                    changing the order of information.
                  </p>
                  <p>
                    The result is a layout that stays editorial rather than compressed — the
                    residence is always the subject, at any size.
                  </p>
                </SectionIntro>
              </div>
            </div>
          </div>
        </section>

        <section id="closing" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
            <p
              data-reveal
              className="text-[10px] font-medium uppercase tracking-[0.24em] text-aurelis-gold"
            >
              06 — Closing
            </p>

            <h2
              data-reveal
              className="mt-6 max-w-4xl font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.01em]"
            >
              Quiet distinction, considered in every detail.
            </h2>

            <div
              data-reveal
              className="mt-12 flex flex-col gap-8 border-t border-aurelis-gold/30 pt-8 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="max-w-md text-sm leading-7 text-aurelis-paper/65">
                AURELIS was an exercise in restraint: letting photography, typography and
                space carry the experience, with just enough interface to guide the way.
              </p>

              <div className="flex flex-col items-start gap-4 sm:items-end">
                <Link
                  to="/#work"
                  className="group inline-flex items-center gap-3 border-b border-aurelis-gold pb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-aurelis-gold transition-colors hover:text-aurelis-paper"
                >
                  Back to selected work
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  to="/"
                  className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-aurelis-paper/50 transition-colors hover:text-aurelis-paper"
                >
                  <ArrowLeft
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:-translate-x-0.5"
                  />
                  Return to portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-aurelis-gold/20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-5 py-8 text-[10px] uppercase tracking-[0.16em] text-aurelis-paper/35 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>AURELIS — Case study</p>
          <p>&copy; {new Date().getFullYear()} Aman</p>
          <a href="#top" className="transition-colors hover:text-aurelis-gold">
            Back to top
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Aurelis
