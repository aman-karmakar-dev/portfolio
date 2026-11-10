import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const principles = [
  {
    index: '01',
    title: 'Understand before designing.',
    description:
      'Goals, audience and constraints are mapped first, so every layout decision answers a real need.',
  },
  {
    index: '02',
    title: 'Structure before decoration.',
    description:
      'Hierarchy, content and flow shape the interface before any visual detail is applied.',
  },
  {
    index: '03',
    title: 'Refine before delivering.',
    description:
      'Spacing, typography and motion are tightened across breakpoints until the details hold.',
  },
]

function About() {
  const root = useRef(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const tweens = []

        tweens.push(
          gsap.from('[data-about-header] > *', {
            autoAlpha: 0,
            y: 24,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '[data-about-header]', start: 'top 85%', once: true },
          }),
        )

        tweens.push(
          gsap
            .timeline({
              defaults: { ease: 'power3.out' },
              scrollTrigger: { trigger: '[data-about-intro]', start: 'top 82%', once: true },
            })
            .from('[data-about-intro]', { autoAlpha: 0, y: 28, duration: 0.85 })
            .from('[data-about-support]', { autoAlpha: 0, y: 18, duration: 0.7 }, 0.25)
            .from(
              '[data-about-image]',
              {
                clipPath: 'inset(0% 100% 0% 0%)',
                duration: 1.2,
                ease: 'power3.inOut',
              },
              0.1,
            )
            .from('[data-about-caption]', { autoAlpha: 0, y: 12, duration: 0.6 }, 0.75),
        )

        tweens.push(
          gsap
            .timeline({
              defaults: { ease: 'power3.out' },
              scrollTrigger: {
                trigger: '[data-about-perspective]',
                start: 'top 80%',
                once: true,
              },
            })
            .from('[data-about-quote]', {
              autoAlpha: 0,
              y: 22,
              duration: 0.7,
              stagger: 0.1,
            })
            .from(
              '[data-principle]',
              {
                autoAlpha: 0,
                y: 20,
                duration: 0.65,
                stagger: 0.12,
              },
              0.18,
            ),
        )

        tweens.push(
          gsap.from('[data-about-close]', {
            autoAlpha: 0,
            y: 20,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: '[data-about-close]', start: 'top 88%', once: true },
          }),
        )

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

  return (
    <section
      id="about"
      ref={root}
      aria-labelledby="about-title"
      className="scroll-mt-[5.25rem] border-t border-line"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <header data-about-header className="grid gap-x-12 gap-y-5 lg:grid-cols-12">
          <h2
            id="about-title"
            className="font-display text-[clamp(2.6rem,6vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-paper lg:col-span-5"
          >
            About<span className="text-lime">.</span>
          </h2>
          <p className="max-w-xl text-sm leading-7 text-muted lg:col-span-6 lg:col-start-7 lg:self-end">
            A record of the work, the capabilities behind it and the process that ties them
            together.
          </p>
        </header>

        <div className="mt-12 grid gap-x-12 gap-y-10 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p
              data-about-intro
              className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.18] tracking-[-0.035em] text-paper"
            >
              I&rsquo;m Aman, a frontend developer turning considered design into responsive,
              accessible interfaces where{' '}
              <span className="font-serif text-[1.05em] font-normal italic tracking-[-0.01em]">
                typography and motion
              </span>{' '}
              carry the experience<span className="text-lime">.</span>
            </p>

            <p
              data-about-support
              className="mt-8 max-w-md text-sm leading-7 text-muted sm:text-[0.9375rem] sm:leading-8"
            >
              The same method runs through every project: typography, spacing and motion treated
              as one system, composed for reading first and refined from small mobile screens
              through to wide desktop displays.
            </p>
          </div>

          <figure className="lg:col-span-5 lg:col-start-8 lg:mt-6">
            <div data-about-image className="overflow-hidden bg-surface">
              <img
                src="/images/about-architecture.jpg"
                alt="Monochrome concrete architecture with angular staircases and directional light"
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-center opacity-90"
              />
            </div>
            <figcaption
              data-about-caption
              className="mt-4 flex items-baseline justify-between gap-4 text-[10px] uppercase tracking-[0.16em] text-muted"
            >
              <span>Study in structure</span>
              <span>Light &middot; Form</span>
            </figcaption>
          </figure>
        </div>

        <div
          data-about-perspective
          className="mt-20 border-t border-line pt-12 lg:mt-28 lg:pt-16"
        >
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span
                data-about-quote
                className="block font-display text-[10px] font-medium uppercase tracking-[0.2em] text-lime"
              >
                Perspective
              </span>
              <p
                data-about-quote
                className="mt-5 font-serif text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.08] tracking-[-0.02em] text-paper"
              >
                &ldquo;Good interfaces begin with good decisions<span className="text-lime">
                  .
                </span>
                &rdquo;
              </p>
            </div>

            <ol className="lg:col-span-7 lg:col-start-6">
              {principles.map((principle) => (
                <li
                  key={principle.title}
                  data-principle
                  className="grid gap-x-6 gap-y-2 border-t border-line py-6 first:border-t-0 first:pt-0 sm:grid-cols-[auto_1fr] lg:py-7"
                >
                  <span className="font-display text-[10px] font-medium tracking-[0.2em] text-lime sm:pt-1.5">
                    {principle.index}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(1.05rem,1.8vw,1.35rem)] font-medium tracking-[-0.02em] text-paper">
                      {principle.title}
                    </h3>
                    <p className="mt-2.5 max-w-lg text-sm leading-7 text-muted">
                      {principle.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16 grid lg:mt-24 lg:grid-cols-12">
          <p
            data-about-close
            className="font-display text-[clamp(1.4rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.03em] text-paper lg:col-span-8 lg:col-start-4"
          >
            Curiosity shapes the process.{' '}
            <span className="font-serif font-normal italic">Details shape the experience</span>
            <span className="text-lime">.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
