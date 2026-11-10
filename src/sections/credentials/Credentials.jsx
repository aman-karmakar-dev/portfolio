import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const credentialItems = [
  {
    id: 'ui-design-practitioner',
    title: 'UI Design Practitioner',
    issuer: 'InsiderOne University',
    type: 'Practitioner credential',
    verify: 'https://www.insiderone.in/verify-receipt?r=993d797dd26e10726426b628159f255f198e78051e3a6e6a6b355784e248e39e',
  },
  {
    id: 'graphic-design-associate',
    title: 'Graphic Design Associate',
    issuer: 'InsiderOne University',
    type: 'Associate credential',
    verify: 'https://www.insiderone.in/c/IO-GRD-H3Y9N9CR',
  },
  {
    id: 'frontend-development-associate',
    title: 'Frontend Development Associate',
    issuer: 'InsiderOne University',
    type: 'Associate credential',
    verify: 'https://www.insiderone.in/c/IO-FED-T32Y3K22',
  },
  {
    id: 'ui-ux-design-associate',
    title: 'UI and UX Design Associate',
    issuer: 'InsiderOne University',
    type: 'Associate credential',
    verify: 'https://www.insiderone.in/c/IO-UXD-4QKED43L',
  },
]

const courseItems = [
  {
    id: 'responsible-ai',
    title: 'Responsible AI: Applying AI Principles with Google Cloud',
    issuer: 'Google Cloud',
    type: 'Completed course',
  },
  {
    id: 'generative-ai',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud',
    type: 'Completed course',
  },
  {
    id: 'llms',
    title: 'Introduction to Large Language Models (LLMs)',
    issuer: 'Google Cloud',
    type: 'Completed course',
  },
]

const credentialsNote = 'Date and credential ID listed once confirmed.'

function CredentialRow({ item, index, note, open, onToggle }) {
  const reduceMotion = useReducedMotion()
  const buttonId = `credential-button-${item.id}`
  const panelId = `credential-panel-${item.id}`

  return (
    <li data-credential className="border-t border-line">
      <motion.button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        whileHover={reduceMotion ? undefined : { x: 4 }}
        transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="group flex w-full items-start gap-4 py-4 text-left sm:gap-6"
      >
        <span className="mt-[3px] font-display text-[10px] font-medium tracking-[0.18em] text-lime/60 transition-colors duration-200 group-hover:text-lime">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-display text-[0.95rem] font-medium tracking-[-0.01em] text-paper transition-colors duration-200 group-hover:text-lime sm:text-base">
            {item.title}
          </span>
          <span className="mt-1.5 block text-[11px] uppercase tracking-[0.14em] text-muted">
            {item.issuer}
          </span>
        </span>

        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-1 text-muted transition-colors duration-200 group-hover:text-lime"
        >
          <ChevronDown size={14} strokeWidth={1.5} />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-line/70 pb-5 pt-4">
              <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                    Issuer
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-paper">{item.issuer}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                    Type
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-paper">{item.type}</dd>
                </div>
                {item.verify && (
                  <div className="sm:col-span-2">
                    <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                      Verification
                    </dt>
                    <dd className="mt-2">
                      <a
                        href={item.verify}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group inline-flex items-center gap-2 border-b border-line pb-1 text-sm text-paper transition-colors hover:border-lime hover:text-lime"
                      >
                        View credential
                        <ArrowUpRight
                          size={13}
                          aria-hidden="true"
                          className="text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime"
                        />
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
              {note && (
                <p className="mt-3 text-[11px] leading-5 text-muted">{note}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

function Credentials() {
  const root = useRef(null)
  const [openId, setOpenId] = useState(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const tweens = []

        tweens.push(
          gsap.from('[data-credentials-header] > *', {
            autoAlpha: 0,
            y: 24,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '[data-credentials-header]',
              start: 'top 85%',
              once: true,
            },
          }),
        )

        gsap.utils.toArray('[data-credential-group]', root.current).forEach((group) => {
          const label = group.querySelector('[data-credential-label]')
          const rows = gsap.utils.toArray('[data-credential]', group)

          tweens.push(
            gsap
              .timeline({
                defaults: { ease: 'power3.out' },
                scrollTrigger: { trigger: group, start: 'top 84%', once: true },
              })
              .from(label, { autoAlpha: 0, y: 16, duration: 0.6 })
              .from(
                rows,
                { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.09 },
                0.15,
              ),
          )
        })

        return () => {
          tweens.forEach((tween) => {
            tween.scrollTrigger?.kill()
            tween.revert()
            tween.kill()
          })
        }
      })

      return () => media.revert()
    },
    { scope: root },
  )

  const toggle = (id) => setOpenId((current) => (current === id ? null : id))

  return (
    <section
      id="credentials"
      ref={root}
      aria-labelledby="credentials-title"
      className="scroll-mt-[5.25rem] border-t border-line"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <header data-credentials-header className="max-w-2xl">
          <h2
            id="credentials-title"
            className="font-display text-[clamp(2.6rem,6vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-paper"
          >
            Learning. Applied. Verified<span className="text-lime">.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
            A record of skills developed through structured learning and practical assessment.
          </p>

          <a
            href="https://www.insiderone.in/id/IOPC-SBQW-WDGM"
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-7 inline-flex items-center gap-2 border-b border-line py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:border-lime hover:text-lime"
          >
            View Career Passport
            <ArrowUpRight
              size={14}
              aria-hidden="true"
              className="text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime"
            />
          </a>
        </header>

        <div className="mt-12 grid gap-x-12 gap-y-14 lg:mt-16 lg:grid-cols-12">
          <div data-credential-group className="lg:col-span-7">
            <div
              data-credential-label
              className="flex items-baseline justify-between gap-4 border-b border-line pb-3"
            >
              <h3 className="font-display text-[10px] font-medium uppercase tracking-[0.2em] text-lime">
                Credentials &amp; assessments
              </h3>
              <span className="text-[10px] tracking-[0.16em] text-muted">
                {String(credentialItems.length).padStart(2, '0')}
              </span>
            </div>

            <ul className="border-b border-line">
              {credentialItems.map((item, index) => (
                <CredentialRow
                  key={item.id}
                  item={item}
                  index={index}
                  note={credentialsNote}
                  open={openId === item.id}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </ul>
          </div>

          <div data-credential-group className="lg:col-span-4 lg:col-start-9">
            <div
              data-credential-label
              className="flex items-baseline justify-between gap-4 border-b border-line pb-3"
            >
              <h3 className="font-display text-[10px] font-medium uppercase tracking-[0.2em] text-lime">
                Courses &amp; learning
              </h3>
              <span className="text-[10px] tracking-[0.16em] text-muted">
                {String(courseItems.length).padStart(2, '0')}
              </span>
            </div>

            <ul className="border-b border-line">
              {courseItems.map((item, index) => (
                <CredentialRow
                  key={item.id}
                  item={item}
                  index={index}
                  open={openId === item.id}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Credentials
