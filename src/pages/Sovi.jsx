import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const shotsBase = '/images/sovi-case-study-assets/sovi-case-study-assets/screenshots/desktop'

const stack = ['React', 'Vite', 'Tailwind CSS', 'GSAP', 'Motion']

const liveUrl = 'https://sovi-coffee.vercel.app/'

const sections = [
  { id: 'top', label: 'Top' },
  { id: 'overview', label: 'Overview' },
  { id: 'direction', label: 'Direction' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'experience', label: 'Experience' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'closing', label: 'Closing' },
]

const shots = [
  {
    id: 'home',
    tab: 'Home',
    src: `${shotsBase}/01-homepage-hero.png`,
    width: 1518,
    height: 726,
    alt: 'SOVI home page with the headline A little more room for coffee and a bag of SOVI specialty coffee beside a ceramic cup',
    caption: 'A little more room for coffee / Home',
  },
  {
    id: 'collection',
    tab: 'Collection',
    src: `${shotsBase}/02-coffee-collection.png`,
    width: 1518,
    height: 730,
    alt: 'SOVI coffee collection with the heading Find your everyday coffee and cards for Grove, Sunrise, Afterglow and Field Notes',
    caption: 'Find your everyday coffee / Collection',
  },
  {
    id: 'story',
    tab: 'Our Story',
    src: `${shotsBase}/03-our-story.png`,
    width: 1521,
    height: 675,
    alt: 'SOVI Our Story section with the heading A slower kind of everyday and hand-drawn botanical coffee branch illustrations',
    caption: 'A slower kind of everyday / Our story',
  },
  {
    id: 'ritual',
    tab: 'Ritual',
    src: `${shotsBase}/04-coffee-ritual.png`,
    width: 1513,
    height: 726,
    alt: 'SOVI ritual section on a deep green panel with the heading Good coffee is not a rush. It is a ritual, beside a pour-over brewer on a scale',
    caption: 'Good coffee is a ritual / The ritual',
  },
  {
    id: 'journal',
    tab: 'Journal',
    src: `${shotsBase}/05-journal.png`,
    width: 1436,
    height: 727,
    alt: 'SOVI journal with the heading A few things worth brewing over and article cards on tasting notes and the morning brew',
    caption: 'A few things worth brewing over / Journal',
  },
  {
    id: 'newsletter',
    tab: 'Sunday Letters',
    src: `${shotsBase}/06-newsletter-and-footer.png`,
    width: 1517,
    height: 726,
    alt: 'SOVI newsletter band in terracotta with the heading A little good in your inbox above a dark espresso footer with shop, company and support columns',
    caption: 'The Sunday pour-over / Newsletter & footer',
  },
]

function SectionIntro({ index, label, title, children }) {
  return (
    <div data-reveal className="max-w-3xl">
      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-sovi-rust">
        {index} — {label}
      </p>
      <h2 className="mt-6 font-serif text-[clamp(2.6rem,5.6vw,4.8rem)] leading-[0.95] tracking-[-0.01em] text-sovi-ink">
        {title}
      </h2>
      {children && (
        <div className="mt-6 max-w-xl space-y-4 text-sm leading-7 text-sovi-ink/65">
          {children}
        </div>
      )}
    </div>
  )
}

function Frame({ src, width, height, alt, caption, eager = false, className = '' }) {
  return (
    <figure data-media className={`group ${className}`}>
      <div className="overflow-hidden border border-sovi-ink/15 bg-sovi-card shadow-[0_1px_0_rgba(44,38,32,0.06)]">
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
        <figcaption className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-sovi-ink/45">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function Sovi() {
  const root = useRef(null)
  const [activeShot, setActiveShot] = useState(0)
  const [activeSection, setActiveSection] = useState('top')

  useEffect(() => {
    const previous = document.title
    document.title = 'SOVI — Case study'

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
    <div ref={root} className="sovi-route min-h-svh bg-sovi-cream text-sovi-ink">
      <header className="sticky top-0 z-50 border-b border-sovi-ink/15 bg-sovi-cream">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <a
            href="#top"
            className="font-serif text-xl tracking-[0.3em] text-sovi-ink transition-colors hover:text-sovi-rust"
          >
            SOVI
          </a>

          <p className="hidden text-[10px] font-medium uppercase tracking-[0.24em] text-sovi-ink/45 sm:block">
            Case study — Selected work 02
          </p>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-sovi-ink/60 transition-colors hover:text-sovi-rust"
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
                      ? 'w-6 bg-sovi-rust'
                      : 'w-3 bg-sovi-ink/25 group-hover:bg-sovi-ink/60'
                  }`}
                />
                <span className="sr-only">{section.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main id="main" tabIndex={-1} className="outline-none">
        <section id="top" className="relative isolate overflow-hidden border-b border-sovi-ink/15">
          <div data-hero-media className="absolute inset-0 overflow-hidden">
            <img
              src={`${shotsBase}/01-homepage-hero.png`}
              alt=""
              width="1518"
              height="726"
              loading="eager"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-[78%_50%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-sovi-cream/95 via-sovi-cream/55 to-transparent lg:hidden"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden bg-[linear-gradient(90deg,var(--color-sovi-cream)_0%,var(--color-sovi-cream)_30%,rgba(243,237,225,0.88)_44%,rgba(243,237,225,0.45)_60%,rgba(243,237,225,0.05)_76%,rgba(243,237,225,0)_88%)] lg:block"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-sovi-cream/90 via-transparent to-transparent"
            />
          </div>

          <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-[1440px] flex-col justify-end px-5 pb-12 pt-28 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
            <p
              data-hero-eyebrow
              className="text-[10px] font-medium uppercase tracking-[0.24em] text-sovi-rust"
            >
              Specialty coffee / Front-end development
            </p>

            <h1
              data-hero-title
              className="mt-5 font-serif text-[clamp(5rem,17vw,13rem)] leading-[0.78] tracking-[0.06em] text-sovi-ink"
            >
              SOVI
            </h1>

            <div
              data-hero-meta
              className="mt-8 flex flex-col gap-4 border-t border-sovi-ink/20 pt-5 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="max-w-md text-sm leading-7 text-sovi-ink/75">
                A specialty coffee storefront shaped around warmth, slow rituals and
                small-batch craft.
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-sovi-ink/45">
                Scroll to explore
              </p>
            </div>
          </div>
        </section>

        <section id="overview" className="scroll-mt-20 border-b border-sovi-ink/15">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <SectionIntro index="01" label="Overview" title="A slower kind of everyday.">
                  <p>
                    SOVI is a specialty coffee roastery concept built as a warm, editorial
                    e-commerce experience. Instead of a conventional product grid, the site
                    treats coffee as a daily ritual — pairing generous photography with a
                    calm serif voice, botanical line illustration and a palette of cream,
                    espresso and terracotta.
                  </p>
                  <p>
                    The page carries the full story in one flow: a cinematic hero, the
                    everyday coffee collection, the roastery's story, a three-step ritual, a
                    brewing journal, a Sunday newsletter and a complete footer — each section
                    written and art-directed to feel like the inside of a well-kept café.
                  </p>
                </SectionIntro>
              </div>

              <aside data-reveal className="lg:col-span-4 lg:col-start-9">
                <dl className="border-t border-sovi-ink/20">
                  {[
                    ['Role', 'Design and front-end development'],
                    ['Project', 'Personal concept, live in production'],
                    ['Focus', 'Specialty coffee e-commerce'],
                  ].map(([term, detail]) => (
                    <div
                      key={term}
                      className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-sovi-ink/12 py-4"
                    >
                      <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-sovi-ink/45">
                        {term}
                      </dt>
                      <dd className="text-sm leading-6 text-sovi-ink/85">{detail}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-6 inline-flex items-center gap-2 border-b border-sovi-rust pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sovi-rust transition-colors hover:text-sovi-ink"
                >
                  Visit sovi-coffee.vercel.app
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.2em] text-sovi-ink/45">
                  Stack
                </p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {stack.map((item) => (
                    <li
                      key={item}
                      className="border border-sovi-ink/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-sovi-ink/75"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section id="direction" className="scroll-mt-20 border-b border-sovi-ink/15">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <SectionIntro index="02" label="Design direction" title="Cream, espresso and a little rust.">
                  <p>
                    The visual system is drawn directly from the coffee itself: warm cream
                    paper, deep espresso brown, a terracotta rust for emphasis, a quiet leaf
                    green for the ritual, and a muted gold for small caps and rules. Serif
                    display type carries the voice; small uppercase metadata keeps it honest.
                  </p>
                </SectionIntro>

                <ol data-reveal className="mt-10 border-t border-sovi-ink/20">
                  {[
                    [
                      'Photography first',
                      'Sunlit still lifes — ceramics, kraft bags, raw beans — carry the atmosphere while the interface stays quiet.',
                    ],
                    [
                      'Editorial serif',
                      'High-contrast serif headlines with italic rust accents set against small uppercase labels with wide tracking.',
                    ],
                    [
                      'Botanical illustration',
                      'Hand-drawn coffee branches frame the story section, adding craft without breaking the calm.',
                    ],
                    [
                      'Measured warmth',
                      'One accent does the work: rust marks actions and italics, never decoration for its own sake.',
                    ],
                  ].map(([title, copy], index) => (
                    <li
                      key={title}
                      className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-sovi-ink/12 py-5"
                    >
                      <span className="pt-0.5 font-display text-[10px] tracking-[0.18em] text-sovi-rust">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-serif text-xl leading-tight">{title}</h3>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-sovi-ink/60">
                          {copy}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="lg:col-span-6 lg:col-start-7 lg:self-end space-y-6">
                <Frame
                  src={`${shotsBase}/02-coffee-collection.png`}
                  width={1518}
                  height={730}
                  alt="SOVI coffee collection with the heading Find your everyday coffee and cards for Grove, Sunrise, Afterglow and Field Notes"
                  caption="Fig. 01 — The collection, merchandised as an editorial edit"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="decisions" className="scroll-mt-20 border-b border-sovi-ink/15">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <SectionIntro index="03" label="UI/UX decisions" title="Small choices, consistently brewed.">
              <p>
                Every view answers to the same brief: slow the visitor down before asking
                them to buy. The interface uses restraint as a feature — fewer, warmer
                moments instead of more modules.
              </p>
            </SectionIntro>

            <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
              <ol data-reveal className="lg:col-span-7 border-t border-sovi-ink/20">
                {[
                  [
                    'One job per section',
                    'Hero invites, collection sells, story builds trust, ritual teaches, journal retains, newsletter converts. No section tries to do two.',
                  ],
                  [
                    'Named roasts, not SKUs',
                    'Grove, Sunrise, Afterglow and Field Notes carry tasting notes and roast level in plain language — fragrance and fruit before jargon.',
                  ],
                  [
                    'Asymmetric collection grid',
                    'A large anchor product sits beside stacked cards, giving the range a point of view instead of a uniform catalogue grid.',
                  ],
                  [
                    'Ritual as wayfinding',
                    'Three numbered steps — choose, brew, enjoy — double as a product explainer and a pacing device for the page.',
                  ],
                  [
                    'A footer that closes the loop',
                    'Shop, company and support columns sit beneath the Sunday pour-over signup, so the last screen answers the next question.',
                  ],
                ].map(([title, copy], index) => (
                  <li
                    key={title}
                    className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-sovi-ink/12 py-5"
                  >
                    <span className="pt-0.5 font-display text-[10px] tracking-[0.18em] text-sovi-rust">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl leading-tight">{title}</h3>
                      <p className="mt-2 max-w-lg text-sm leading-6 text-sovi-ink/60">
                        {copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="lg:col-span-4 lg:col-start-9">
                <Frame
                  src={`${shotsBase}/04-coffee-ritual.png`}
                  width={1513}
                  height={726}
                  alt="SOVI ritual section on a deep green panel with the heading Good coffee is not a rush. It is a ritual, beside a pour-over brewer on a scale"
                  caption="Fig. 02 — The ritual, set on deep leaf green against the cream page"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-20 border-b border-sovi-ink/15">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <SectionIntro index="04" label="Technology & motion" title="Verified, not imagined.">
              <p>
                The stack below is confirmed from the deployed production build at
                sovi-coffee.vercel.app, not assumed. Animations are described only where they
                can be verified in the shipped bundle and rendered page.
              </p>
            </SectionIntro>

            <div className="mt-14 grid gap-8 border-t border-sovi-ink/20 pt-8 sm:grid-cols-3 lg:mt-20">
              {[
                [
                  'Build',
                  'A React single-page application built with Vite. The production HTML ships a module entry point with preloaded vendor chunks, and the document theme-color is set to the brand cream (#F3EDE1).',
                ],
                [
                  'Styling',
                  'Tailwind CSS v4, confirmed in the shipped stylesheet. Utility composition holds the cream, espresso and rust token set together across hero, collection, story, ritual, journal and footer.',
                ],
                [
                  'Motion',
                  'GSAP with ScrollTrigger and Motion are both bundled as separate vendor chunks. Motion is used for hover and in-view transitions; GSAP drives scroll-linked choreography.',
                ],
              ].map(([title, copy]) => (
                <div key={title} data-reveal>
                  <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-sovi-rust">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-sovi-ink/65">{copy}</p>
                </div>
              ))}
            </div>

            <div data-reveal className="mt-14 lg:mt-16">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-sovi-ink/45">
                Verified animations & interactions
              </h3>
              <ul className="mt-4 grid gap-px border border-sovi-ink/15 bg-sovi-ink/15 sm:grid-cols-2">
                {[
                  [
                    'Scroll-linked reveals',
                    'GSAP ScrollTrigger is present in the vendor bundle, powering section entrances tied to scroll position.',
                  ],
                  [
                    'Hover & in-view motion',
                    'Motion ships with whileHover and whileInView support, used for interactive feedback across cards and controls.',
                  ],
                  [
                    'Smooth in-page navigation',
                    'CSS scroll-behavior: smooth is set on the document, so Shop, Our Story, Ritual and Journal glide rather than jump.',
                  ],
                  [
                    'Persistent client state',
                    'localStorage is used in the production bundle, keeping shopper state (such as bag contents) across visits.',
                  ],
                  [
                    'Intersection-aware rendering',
                    'An IntersectionObserver drives visibility-aware behaviour on the page, avoiding work for off-screen content.',
                  ],
                  [
                    'Cart & search affordances',
                    'The header carries working search and bag icons on every view, anchoring the e-commerce loop.',
                  ],
                ].map(([title, copy]) => (
                  <li key={title} className="bg-sovi-card p-5">
                    <h4 className="font-serif text-lg leading-snug">{title}</h4>
                    <p className="mt-2 text-sm leading-6 text-sovi-ink/60">{copy}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="challenges" className="scroll-mt-20 border-b border-sovi-ink/15">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <SectionIntro index="05" label="Challenges & solutions" title="Where the work actually happened." />

            <div className="mt-14 grid gap-px border border-sovi-ink/15 bg-sovi-ink/15 md:grid-cols-2 lg:mt-20">
              {[
                [
                  'Challenge',
                  'Warm brand, long page',
                  'A single-page story can drift into brochure territory and lose the shop.',
                  'Solution',
                  'The collection is placed directly after the hero, so commerce leads and the narrative sections deepen it rather than delay it.',
                ],
                [
                  'Challenge',
                  'Photography vs. performance',
                  'Full-bleed, sunlit imagery is heavy and can stall first paint.',
                  'Solution',
                  'The hero image is preloaded with high fetch priority in the document head, and everything below the fold lazy-loads.',
                ],
                [
                  'Challenge',
                  'One accent, used sparingly',
                  'Terracotta rust can shout if it appears on every element.',
                  'Solution',
                  'Rust is reserved for italics, eyebrow labels and primary actions; espresso and cream do the structural work.',
                ],
                [
                  'Challenge',
                  'Editorial type vs. clarity',
                  'High-contrast serif display type can hurt legibility at small sizes.',
                  'Solution',
                  'Serif is used only for display; body copy and metadata set in a clean sans with generous line-height and tracking.',
                ],
              ].map(([cLabel, cTitle, cCopy, sLabel, sCopy]) => (
                <div key={cTitle} data-reveal className="bg-sovi-card p-6 sm:p-8">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-sovi-ink/45">
                    {cLabel}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight">{cTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-sovi-ink/60">{cCopy}</p>
                  <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.2em] text-sovi-rust">
                    {sLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-sovi-ink/75">{sCopy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="showcase" className="scroll-mt-20 border-b border-sovi-ink/15">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
            <SectionIntro index="06" label="Full-page showcase" title="Every screen, in sequence.">
              <p>
                The complete desktop experience, from the first headline to the footer —
                walk it in order, or jump straight to a moment.
              </p>
            </SectionIntro>

            <div data-reveal className="mt-12 lg:mt-16">
              <div className="relative aspect-[1518/726] overflow-hidden border border-sovi-ink/15 bg-sovi-card">
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

              <div className="mt-5 flex flex-col gap-4 border-t border-sovi-ink/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p
                  aria-live="polite"
                  className="text-[10px] font-medium uppercase tracking-[0.2em] text-sovi-ink/45"
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
                          ? 'text-sovi-rust'
                          : 'text-sovi-ink/40 hover:text-sovi-ink'
                      }`}
                    >
                      {item.tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-20">
              <Frame
                src={`${shotsBase}/03-our-story.png`}
                width={1521}
                height={675}
                alt="SOVI Our Story section with the heading A slower kind of everyday and hand-drawn botanical coffee branch illustrations"
                caption="Fig. 03 — Our Story, framed by botanical line work"
              />
              <Frame
                src={`${shotsBase}/05-journal.png`}
                width={1436}
                height={727}
                alt="SOVI journal with the heading A few things worth brewing over and article cards on tasting notes and the morning brew"
                caption="Fig. 04 — The Journal, an editorial grid of field notes"
              />
              <Frame
                className="sm:col-span-2"
                src={`${shotsBase}/06-newsletter-and-footer.png`}
                width={1517}
                height={726}
                alt="SOVI newsletter band in terracotta with the heading A little good in your inbox above a dark espresso footer with shop, company and support columns"
                caption="Fig. 05 — The Sunday pour-over, closing into an espresso footer"
              />
            </div>
          </div>
        </section>

        <section id="closing" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
            <p
              data-reveal
              className="text-[10px] font-medium uppercase tracking-[0.24em] text-sovi-rust"
            >
              07 — Closing
            </p>

            <h2
              data-reveal
              className="mt-6 max-w-4xl font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.01em]"
            >
              Coffee, taken slowly, is a kind of hospitality.
            </h2>

            <div
              data-reveal
              className="mt-12 flex flex-col gap-8 border-t border-sovi-ink/20 pt-8 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="max-w-md text-sm leading-7 text-sovi-ink/65">
                SOVI was an exercise in warmth with discipline: a full coffee brand — from
                hero to footer — built to feel unhurried, and shipped live to production.
              </p>

              <div className="flex flex-col items-start gap-4 sm:items-end">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 border-b border-sovi-rust pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sovi-rust transition-colors hover:text-sovi-ink"
                >
                  Visit the live site
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <Link
                  to="/#work"
                  className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-sovi-ink/50 transition-colors hover:text-sovi-ink"
                >
                  Back to selected work
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-sovi-ink/15">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-5 py-8 text-[10px] uppercase tracking-[0.16em] text-sovi-ink/40 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>SOVI — Case study</p>
          <p>&copy; {new Date().getFullYear()} Aman</p>
          <a href="#top" className="transition-colors hover:text-sovi-rust">
            Back to top
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Sovi
