import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const entries = [
  {
    index: '01',
    title: 'Independent Development',
    type: 'Independent practice',
    description:
      'Personal projects taken from first layout to final polish — structure, interface and motion developed together in the browser, then refined across breakpoints until the details hold.',
    focus: ['React', 'JavaScript', 'Tailwind CSS'],
  },
  {
    index: '02',
    title: 'Design & Development Learning',
    type: 'Structured learning',
    description:
      'Coursework and practical assessments across UI design, graphic design and frontend development — principles studied, applied in projects and verified through credentials.',
    focus: ['UI design', 'Frontend development', 'Assessment'],
  },
  {
    index: '03',
    title: 'Freelance Practice',
    type: 'Freelance',
    description:
      'Briefs translated into clear structure first, then designed and built as responsive interfaces — decisions explained early and details refined before delivery.',
    focus: ['Interface design', 'Frontend build', 'Responsive delivery'],
  },
]

function Experience() {
  const root = useRef(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const list = root.current.querySelector('[data-experience-list]')

        const headerTween = gsap.from('[data-experience-header] > *', {
          autoAlpha: 0,
          y: 24,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-experience-header]',
            start: 'top 85%',
            once: true,
          },
        })

        // Entries entering together reveal as one controlled sequence.
        const batches = ScrollTrigger.batch('[data-experience-entry]', {
          start: 'top 84%',
          once: true,
          onEnter: (batch) => {
            const targets = batch.flatMap((entry) => [
              ...entry.querySelectorAll('[data-experience-reveal]'),
            ])
            const dots = batch.flatMap((entry) => [
              ...entry.querySelectorAll('[data-experience-dot]'),
            ])

            gsap
              .timeline({ defaults: { ease: 'power3.out' } })
              .from(batch, { autoAlpha: 0, y: 26, duration: 0.7, stagger: 0.14 })
              .from(targets, { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.07 }, 0.14)
              .from(
                dots,
                { scale: 0, autoAlpha: 0, duration: 0.4, stagger: 0.1 },
                0.2,
              )
          },
        })

        // Scroll-linked lime progress filling the timeline track.
        const progressTween = gsap.fromTo(
          '[data-experience-progress]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: list,
              start: 'top 68%',
              end: 'bottom 78%',
              scrub: 0.4,
            },
          },
        )

        return () => {
          batches.forEach((trigger) => trigger.kill())
          headerTween.scrollTrigger?.kill()
          headerTween.revert()
          headerTween.kill()
          progressTween.scrollTrigger?.kill()
          progressTween.revert()
          progressTween.kill()
        }
      })

      return () => media.revert()
    },
    { scope: root },
  )

  return (
    <section
      id="experience"
      ref={root}
      aria-labelledby="experience-title"
      className="scroll-mt-[5.25rem] border-t border-line"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <header data-experience-header className="max-w-2xl">
          <h2
            id="experience-title"
            className="font-display text-[clamp(2.6rem,6vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-paper"
          >
            Building through practice<span className="text-lime">.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
            Independent work, structured learning and freelance practice.
          </p>
        </header>

        <div className="relative mt-12 lg:mt-20">
          <span
            data-experience-track
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-2 top-2 w-px bg-line"
          />
          <span
            data-experience-progress
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-2 top-2 z-10 w-px origin-top bg-lime"
          />

          <ol data-experience-list className="pl-9 sm:pl-14">
            {entries.map((entry) => (
              <li
                key={entry.title}
                data-experience-entry
                className="relative border-b border-line pb-12 last:border-b-0 last:pb-0 sm:pb-16"
              >
                <span
                  data-experience-dot
                  aria-hidden="true"
                  className="absolute -left-7 top-1 z-20 size-2 -translate-x-1/2 rounded-full border border-lime bg-ink sm:-left-12"
                />

                <div className="grid gap-x-12 gap-y-5 lg:grid-cols-12">
                  <div data-experience-reveal className="lg:col-span-4">
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-[11px] font-medium tracking-[0.22em] text-lime">
                        {entry.index}
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                        {entry.type}
                      </span>
                    </div>

                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-medium uppercase tracking-[0.14em] text-paper/70">
                      {entry.focus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div data-experience-reveal className="lg:col-span-7 lg:col-start-6">
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.05] tracking-[-0.035em] text-paper">
                      {entry.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                      {entry.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Experience
