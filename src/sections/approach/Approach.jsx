import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const stages = [
  {
    index: '01',
    title: 'Discover',
    description: 'Understanding the goal, the audience and the constraints before any layout decisions.',
  },
  {
    index: '02',
    title: 'Plan',
    description: 'Shaping structure, content hierarchy and the technical approach into a clear direction.',
  },
  {
    index: '03',
    title: 'Design & Build',
    description:
      'Designing and developing in the browser, with typography, spacing and motion refined as one system.',
  },
  {
    index: '04',
    title: 'Refine',
    description: 'Testing across breakpoints, tightening details and checking accessibility before handover.',
  },
]

const DESKTOP_QUERY = '(min-width: 1024px)'

function Approach() {
  const root = useRef(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      const list = root.current.querySelector('[data-approach-list]')
      const track = root.current.querySelector('[data-approach-track]')
      const progress = root.current.querySelector('[data-approach-progress]')
      const header = root.current.querySelector('[data-approach-header]')
      const stageEls = gsap.utils.toArray('[data-approach-stage]', root.current)
      const nodeEls = gsap.utils.toArray('[data-approach-node]', root.current)
      const revealSets = stageEls.map((stage) =>
        stage.querySelectorAll('[data-approach-reveal]'),
      )

      let played = false

      // Measure the line from the centre of the first dot to the centre of the
      // last dot. The unfilled track shares the exact same geometry.
      const measure = (desktop) => {
        const listRect = list.getBoundingClientRect()
        const rects = nodeEls.map((node) => node.getBoundingClientRect())
        const centers = rects.map((rect) =>
          desktop ? rect.left + rect.width / 2 : rect.top + rect.height / 2,
        )

        const start = centers[0]
        const end = centers[centers.length - 1]
        const span = end - start
        const ratios = centers.map((center) =>
          span > 0 ? (center - start) / span : 0,
        )
        ratios[ratios.length - 1] = 1

        const place = (el, left, top, width, height, origin) => {
          el.style.left = `${left}px`
          el.style.top = `${top}px`
          el.style.width = `${width}px`
          el.style.height = `${height}px`
          el.style.transformOrigin = origin
        }

        if (desktop) {
          const left = start - listRect.left
          const top = rects[0].top + rects[0].height / 2 - listRect.top - 0.5
          place(progress, left, top, span, 1, 'left center')
          place(track, left, top, span, 1, 'left center')
        } else {
          const left = rects[0].left + rects[0].width / 2 - listRect.left - 0.5
          const top = start - listRect.top
          place(progress, left, top, 1, span, 'top center')
          place(track, left, top, 1, span, 'top center')
        }

        return { ratios, span }
      }

      const setup = (desktop) => {
        const axis = desktop ? 'scaleX' : 'scaleY'
        let timeline = null
        let started = false
        let frame = 0
        let cancelled = false
        let lastKey = ''

        const buildTimeline = (ratios) => {
          const fillStart = 0.5
          const fillDuration = 2.6

          const tl = gsap.timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: {
              trigger: list,
              start: 'top 78%',
              once: true,
            },
            onStart: () => {
              started = true
            },
            onComplete: () => {
              played = true
            },
          })

          // One continuous progress tween, with each stage reveal timed to the
          // moment the line reaches that stage's dot.
          tl.from(
            header.children,
            {
              autoAlpha: 0,
              y: 24,
              duration: 0.7,
              stagger: 0.08,
            },
            0,
          )
            .from(
              revealSets[0],
              {
                autoAlpha: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.06,
              },
              0.15,
            )
            .fromTo(
              progress,
              { [axis]: 0 },
              { [axis]: 1, duration: fillDuration, ease: 'none' },
              fillStart,
            )

          for (let i = 1; i < revealSets.length; i += 1) {
            tl.from(
              revealSets[i],
              {
                autoAlpha: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.06,
              },
              Math.max(0, fillStart + fillDuration * ratios[i] - 0.12),
            )
          }

          return tl
        }

        const destroyTimeline = () => {
          if (!timeline) return
          timeline.scrollTrigger?.kill()
          timeline.revert()
          timeline.kill()
          timeline = null
        }

        const sync = () => {
          const { ratios, span } = measure(desktop)
          const key = `${Math.round(span)}|${ratios
            .map((ratio) => ratio.toFixed(3))
            .join(',')}`

          if (key === lastKey && timeline) return
          lastKey = key

          if (played) {
            progress.style.transform = 'none'
            return
          }

          if (!timeline) {
            timeline = buildTimeline(ratios)
          } else if (!started) {
            // Rebuild before the reveal so stage timing matches new geometry.
            destroyTimeline()
            timeline = buildTimeline(ratios)
          }

          ScrollTrigger.refresh()
        }

        sync()

        const update = () => {
          if (cancelled) return
          cancelAnimationFrame(frame)
          frame = requestAnimationFrame(() => {
            if (cancelled) return
            sync()
          })
        }

        const observer = new ResizeObserver(update)
        observer.observe(list)
        document.fonts?.ready.then(update).catch(() => {})

        return () => {
          cancelled = true
          observer.disconnect()
          cancelAnimationFrame(frame)
          destroyTimeline()
        }
      }

      media.add(`(prefers-reduced-motion: no-preference) and ${DESKTOP_QUERY}`, () =>
        setup(true),
      )

      media.add(
        '(prefers-reduced-motion: no-preference) and (max-width: 1023.98px)',
        () => setup(false),
      )

      media.add('(prefers-reduced-motion: reduce)', () => {
        measure(window.matchMedia(DESKTOP_QUERY).matches)
        progress.style.transform = 'none'

        let frame = 0
        let cancelled = false

        const update = () => {
          if (cancelled) return
          cancelAnimationFrame(frame)
          frame = requestAnimationFrame(() => {
            if (cancelled) return
            measure(window.matchMedia(DESKTOP_QUERY).matches)
            progress.style.transform = 'none'
            ScrollTrigger.refresh()
          })
        }

        const observer = new ResizeObserver(update)
        observer.observe(list)
        document.fonts?.ready.then(update).catch(() => {})

        return () => {
          cancelled = true
          observer.disconnect()
          cancelAnimationFrame(frame)
        }
      })

      return () => media.revert()
    },
    { scope: root },
  )

  return (
    <section
      id="approach"
      ref={root}
      aria-labelledby="approach-title"
      className="scroll-mt-[5.25rem] border-t border-line"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <header data-approach-header className="max-w-2xl">
          <h2
            id="approach-title"
            className="font-display text-[clamp(2.6rem,6vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-paper"
          >
            Approach<span className="text-lime">.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
            A four-stage process from first question to final polish.
          </p>
        </header>

        <div className="relative mt-12 lg:mt-20">
          <span
            data-approach-track
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 bg-line"
          />

          <span
            data-approach-progress
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 bg-lime"
          />

          <ol data-approach-list className="grid gap-0 lg:grid-cols-4">
            {stages.map((stage) => (
              <li
                key={stage.title}
                data-approach-stage
                className="relative pb-10 pl-6 last:pb-0 sm:pl-8 lg:pb-0 lg:pl-0 lg:pr-8 lg:pt-8"
              >
                <span
                  data-approach-node
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 size-1.5 -translate-x-1/2 rounded-full bg-lime lg:top-0 lg:-translate-y-1/2"
                />

                <span
                  data-approach-reveal
                  className="block font-display text-[11px] font-medium tracking-[0.22em] text-lime"
                >
                  {stage.index}
                </span>

                <h3
                  data-approach-reveal
                  className="mt-4 font-display text-xl font-medium leading-tight tracking-[-0.03em] text-paper sm:text-2xl"
                >
                  {stage.title}
                </h3>

                <p
                  data-approach-reveal
                  className="mt-3 max-w-xs text-sm leading-7 text-muted"
                >
                  {stage.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Approach
