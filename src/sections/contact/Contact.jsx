import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'
import { contact } from '../../data/site'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

const details = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { label: 'Phone / WhatsApp', value: contact.phone, href: contact.whatsapp },
  { label: 'GitHub', value: contact.githubHandle, href: contact.github },
]

const fieldClass =
  'w-full border-b border-line bg-transparent py-3 text-base text-paper placeholder:text-muted/70 transition-colors focus:border-lime focus:outline-none'

function Contact() {
  const root = useRef(null)
  const submittingRef = useRef(false)
  const [status, setStatus] = useState('idle')

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-contact-header] > *', {
          opacity: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-contact-header]',
            start: 'top 85%',
            once: true,
          },
        })

        gsap.from('[data-contact-detail]', {
          opacity: 0,
          y: 20,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-contact-details]',
            start: 'top 84%',
            once: true,
          },
        })

        gsap.from('[data-contact-field]', {
          opacity: 0,
          y: 18,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-contact-form]',
            start: 'top 82%',
            once: true,
          },
        })
      })

      return () => media.revert()
    },
    { scope: root },
  )

  // Sends the enquiry to Web3Forms. Guarded against duplicate submissions;
  // the hidden honeypot field is dropped silently when a bot fills it in.
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submittingRef.current) return

    const form = event.currentTarget
    const data = new FormData(form)

    const payload = {
      access_key: ACCESS_KEY,
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      project_type: String(data.get('type') || '').trim(),
      message: String(data.get('message') || '').trim(),
      subject: `Project enquiry — ${String(data.get('name') || '').trim() || 'New project'}`,
      botcheck: data.get('botcheck') ? true : false,
    }

    if (payload.botcheck) {
      setStatus('success')
      form.reset()
      return
    }

    if (!ACCESS_KEY) {
      setStatus('error')
      return
    }

    submittingRef.current = true
    setStatus('loading')

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => null)

      if (response.ok && result?.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <section
      id="contact"
      ref={root}
      aria-labelledby="contact-title"
      className="scroll-mt-[5.25rem] border-t border-line"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-24 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-32 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <header data-contact-header className="max-w-xl">
              <p className="font-display text-[11px] font-medium uppercase tracking-[0.22em] text-lime">
                Contact
              </p>
              <h2
                id="contact-title"
                className="mt-6 font-display text-[clamp(2.6rem,6vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-paper"
              >
                Let&rsquo;s build something{' '}
                <span className="font-serif italic font-normal tracking-[-0.01em] text-lime">
                  considered
                </span>
                .
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted">
                Open to select freelance projects, collaborations and full-time
                roles. Tell me about the problem and the deadline &mdash; I
                usually reply within a day.
              </p>
            </header>

            <dl data-contact-details className="mt-12 border-t border-line">
              {details.map((item) => (
                <div
                  key={item.label}
                  data-contact-detail
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line py-5"
                >
                  <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                    {item.label}
                  </dt>
                  <dd>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="group inline-flex items-center gap-2 font-display text-lg font-medium tracking-[-0.02em] text-paper transition-colors hover:text-lime sm:text-xl"
                    >
                      {item.value}
                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className="text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime"
                      />
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <form
            data-contact-form
            onSubmit={handleSubmit}
            className="border border-line bg-surface/60 p-6 sm:p-8"
          >
            {/* Honeypot — hidden from people, tempting for bots. */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              style={{ display: 'none' }}
            />

            <p data-contact-field className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              Enquiry form
            </p>

            <div data-contact-field className="mt-6">
              <label
                htmlFor="contact-name"
                className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className={`mt-2 ${fieldClass}`}
              />
            </div>

            <div data-contact-field className="mt-6">
              <label
                htmlFor="contact-email"
                className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@studio.com"
                className={`mt-2 ${fieldClass}`}
              />
            </div>

            <div data-contact-field className="mt-6">
              <label
                htmlFor="contact-type"
                className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted"
              >
                Project type
              </label>
              <select
                id="contact-type"
                name="type"
                defaultValue=""
                className={`mt-2 [&>option]:bg-surface ${fieldClass}`}
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="Marketing site">Marketing site</option>
                <option value="Web application">Web application</option>
                <option value="Interaction / motion">Interaction / motion</option>
                <option value="Full-time role">Full-time role</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div data-contact-field className="mt-6">
              <label
                htmlFor="contact-message"
                className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder="Scope, timeline and anything I should read first."
                className={`mt-2 resize-y ${fieldClass}`}
              />
            </div>

            <div data-contact-field className="mt-8">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group inline-flex w-full items-center justify-center gap-2 bg-lime px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-paper active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? 'Sending…' : 'Send enquiry'}
                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>

              <p
                role="status"
                aria-live="polite"
                className="mt-4 min-h-[1.5rem] text-[11px] leading-5 text-muted"
              >
                {status === 'success' && (
                  <span className="text-lime">
                    Thanks &mdash; your enquiry has been sent. I&rsquo;ll get back to you
                    soon.
                  </span>
                )}
                {status === 'error' && (
                  <>
                    Something went wrong &mdash; please try again or{' '}
                    <a
                      href={`mailto:${contact.email}`}
                      className="border-b border-line text-paper transition-colors hover:border-lime hover:text-lime"
                    >
                      email me directly
                    </a>
                    .
                  </>
                )}
                {status !== 'success' && status !== 'error' && (
                  <>
                    Goes straight to my inbox &mdash; nothing is stored here.
                  </>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
