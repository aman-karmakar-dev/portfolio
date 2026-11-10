import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const areas = [
  {
    index: '01',
    title: 'Frontend Development',
    description:
      'Interface development in React and JavaScript, with Tailwind CSS handling layout and design tokens consistently.',
    items: ['React', 'JavaScript', 'Tailwind CSS'],
  },
  {
    index: '02',
    title: 'UI Design',
    description:
      'Typography, layout and visual hierarchy used to make content read clearly and feel considered.',
    items: ['Typography', 'Layout', 'Visual hierarchy'],
  },
  {
    index: '03',
    title: 'Motion & Interaction',
    description:
      'GSAP-driven motion and purposeful interactions that clarify state changes instead of decorating them.',
    items: ['GSAP', 'Purposeful interactions'],
  },
  {
    index: '04',
    title: 'Responsive Experiences',
    description:
      'Layouts that stay readable and composed from small mobile screens through to wide desktop displays.',
    items: ['Mobile', 'Tablet', 'Desktop'],
  },
]

function Capabilities() {
  const root = useRef(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const header = root.current.querySelector('[data-capabilities-header]')
        const panels = gsap.utils.toArray('[data-capability]', root.current)

        const headerTween = gsap.from(header.children, {
          autoAlpha: 0,
          y: 24,
          duration: 0.75,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: header, start: 'top 85%', once: true },
        })

        // Panels entering together reveal as one sequence instead of racing.
        const batches = ScrollTrigger.batch(panels, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => {
            const targets = batch.flatMap((panel) => [
              ...panel.querySelectorAll('[data-capability-reveal]'),
            ])

            gsap
              .timeline({ defaults: { ease: 'power3.out' } })
              .from(batch, {
                autoAlpha: 0,
                y: 24,
                duration: 0.7,
                stagger: 0.1,
              })
              .from(
                targets,
                {
                  y: 14,
                  duration: 0.5,
                  stagger: 0.045,
                },
                0.12,
              )
          },
        })

        return () => {
          batches.forEach((trigger) => trigger.kill())
          headerTween.scrollTrigger?.kill()
          headerTween.revert()
          headerTween.kill()
        }
      })

      return () => media.revert()
    },
    { scope: root },
  )

  return (
    <section
      id="capabilities"
      ref={root}
      aria-labelledby="capabilities-title"
      className="scroll-mt-[5.25rem] border-t border-line"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <header data-capabilities-header className="max-w-2xl">
          <h2
            id="capabilities-title"
            className="font-display text-[clamp(2.6rem,6vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-paper"
          >
            Capabilities<span className="text-lime">.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
            Four areas of focus, applied together on every interface.
          </p>
        </header>

        <div className="mt-12 grid auto-rows-fr gap-4 sm:gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16 lg:pb-8">
          {areas.map((area) => (
            <article
              key={area.title}
              data-capability
              className="group flex h-full flex-col border border-line p-5 transition-colors duration-300 hover:border-lime/40 hover:bg-surface/40 sm:p-8"
            >
              <div data-capability-reveal className="flex items-baseline gap-4">
                <span className="text-[10px] font-medium tracking-[0.18em] text-lime/60 transition-colors duration-300 group-hover:text-lime">
                  {area.index}
                </span>
                <h3 className="font-display text-[clamp(1.2rem,2.2vw,1.6rem)] font-medium leading-tight tracking-[-0.03em] text-paper">
                  {area.title}
                </h3>
              </div>

              <p data-capability-reveal className="mt-4 max-w-lg text-sm leading-7 text-muted">
                {area.description}
              </p>

              <ul
                data-capability-reveal
                className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 text-[10px] font-medium uppercase tracking-[0.16em] text-paper/70"
              >
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Capabilities
