import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import './hero.css'

gsap.registerPlugin(useGSAP)

function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-hero-line]', {
            yPercent: 110,
            duration: 1.05,
            ease: 'power4.out',
            stagger: 0.09,
          })
          .fromTo(
            '[data-hero-image-reveal]',
            { clipPath: 'inset(0% 100% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.3,
              ease: 'power3.inOut',
            },
            0.15,
          )
          .from('[data-hero-glow]', { autoAlpha: 0, duration: 0.9 }, 0.7)
          .from(
            '[data-hero-content]',
            { autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.09 },
            '-=0.55',
          )
      })

      return () => media.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden"
    >
      <div className="mx-auto grid w-full max-w-[1440px] flex-1 content-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10 lg:px-12 lg:py-24">
        <h1
          id="hero-title"
          className="hero-headline text-[clamp(1.9rem,9.8vw,3rem)] font-medium leading-[0.9] tracking-[-0.05em] text-paper lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:text-[clamp(2.8rem,4.4vw,4rem)]"
        >
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <span data-hero-line className="block">
              Digital
            </span>
          </span>
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <span data-hero-line className="block">
              experiences.
            </span>
          </span>
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <span data-hero-line className="block">
              Designed with{' '}
              <span className="font-serif text-[1.06em] font-normal italic tracking-[-0.01em]">
                intent<span className="text-lime">.</span>
              </span>
            </span>
          </span>
        </h1>

        <div
          aria-hidden="true"
          className="relative lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-start"
        >
          <div className="relative overflow-hidden">
            <div className="mix-blend-lighten">
              <div data-hero-image-reveal className="h-full w-full">
                <img
                  src="/images/hero/hero-background.png"
                  alt=""
                  width="930"
                  height="620"
                  loading="eager"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover object-center opacity-70 [mask-image:linear-gradient(to_right,transparent,black_20%)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_20%)] sm:aspect-[16/9] lg:aspect-square"
                />
              </div>
            </div>

            <span
              data-hero-glow
              className="hero-glow pointer-events-none absolute left-0 top-1/4 h-24 w-px bg-gradient-to-b from-transparent via-lime to-transparent shadow-[0_0_22px_4px_rgba(196,245,106,0.28)]"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-2">
          <p
            data-hero-content
            className="max-w-[34rem] text-[0.9375rem] leading-7 text-muted sm:text-base sm:leading-8"
          >
            I&rsquo;m Aman, a frontend developer turning considered design into responsive,
            accessible interfaces where typography and motion carry the experience.
          </p>

          <div
            data-hero-content
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-7"
          >
            <a
              href="#work"
              className="hero-cta group relative inline-flex items-center justify-between gap-3 border border-lime/50 bg-paper px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:border-lime hover:bg-lime focus-visible:bg-lime active:translate-y-px sm:justify-start"
            >
              View Work
              <ArrowDownRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center justify-between gap-3 border-b border-line py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors duration-200 hover:border-lime hover:text-lime focus-visible:border-lime focus-visible:text-lime active:translate-y-px sm:w-auto sm:justify-start sm:py-2"
            >
              Contact
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <dl
            data-hero-content
            className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-1"
          >
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                Focus
              </dt>
              <dd className="mt-2 max-w-xs text-sm leading-6 text-paper">
                Frontend development, interface motion, and accessibility.
              </dd>
            </div>

            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                Toolkit
              </dt>
              <dd className="mt-2 text-sm leading-6 text-paper">
                React, GSAP &amp; Tailwind CSS.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

export default Hero
