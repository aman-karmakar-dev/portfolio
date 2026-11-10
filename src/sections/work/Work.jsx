import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'
import { aurelis } from '../../data/site'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const imageClass = 'w-full object-cover object-top transition-transform duration-700 ease-out'

function ProjectMeta({ index, title, category, description, tech, link }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
        <span className="text-[10px] font-medium tracking-[0.18em] text-lime">{index}</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
          {category}
        </span>
      </div>

      <h3 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.045em] text-paper">
        {title}
      </h3>

      <p className="mt-5 max-w-md text-sm leading-7 text-muted">{description}</p>

      <dl className="mt-7">
        <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
          Technologies
        </dt>        <dd className="mt-3 flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="border border-line px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-paper/80"
            >
              {item}
            </span>
          ))}
        </dd>
      </dl>

      {link && (
        <Link
          to={link.href}
          className="group/link mt-6 inline-flex items-center gap-2 border-b border-lime py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-lime transition-colors hover:text-paper active:translate-y-px"
        >
          {link.label}
          <span className="sr-only"> for {title}</span>
          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          />
        </Link>
      )}
    </>
  )
}

function Work() {
  const root = useRef(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-work-header] > *', {
          opacity: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-work-header]', start: 'top 85%', once: true },
        })

        gsap.utils.toArray('[data-work-item]').forEach((item) => {
          gsap
            .timeline({
              defaults: { ease: 'power3.out' },
              scrollTrigger: { trigger: item, start: 'top 78%', once: true },
            })
            .from(item.querySelectorAll('[data-work-reveal]'), {
              opacity: 0,
              y: 24,
              duration: 0.75,
              stagger: 0.08,
            })
            .from(
              item.querySelectorAll('[data-work-media]'),
              {
                clipPath: 'inset(0% 100% 0% 0%)',
                duration: 1.15,
                stagger: 0.1,
                ease: 'power3.inOut',
              },
              0.1,
            )
        })
      })

      return () => media.revert()
    },
    { scope: root },
  )

  return (
    <section
      id="work"
      ref={root}
      aria-labelledby="work-title"
      className="scroll-mt-[5.25rem] border-t border-line"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <header data-work-header className="max-w-2xl">
          <h2
            id="work-title"
            className="font-display text-[clamp(2.6rem,6vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-paper"
          >
            Selected work<span className="text-lime">.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
            Two front-end builds: a luxury real-estate concept and an e-commerce interface.
          </p>
        </header>

        <article
          data-work-item
          className="group grid gap-10 border-b border-line py-16 lg:grid-cols-12 lg:gap-12 lg:py-24"
        >
          <div data-work-reveal className="lg:col-span-4 lg:self-start">
            <ProjectMeta
              index="01"
              title={aurelis.name}
              category="Luxury real estate"
              description="A premium real-estate website concept focused on property presentation, editorial design and smooth interactions."
              tech={['React', 'Vite', 'Tailwind CSS', 'GSAP', 'Three.js']}
              link={{ href: aurelis.path, label: 'View case study' }}
            />
          </div>

          <div className="lg:col-span-8">
            <div
              data-work-media
              className="overflow-hidden rounded-lg bg-surface"
            >
              <img
                src="/images/homepage.png"
                alt="AURELIS homepage with a full-screen architectural image and editorial property typography"
                width="1512"
                height="720"
                loading="lazy"
                decoding="async"
                className={`aspect-[2/1] ${imageClass} group-hover:scale-[1.03]`}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-12 lg:col-span-12">
            <figure
              data-work-media
              className="overflow-hidden rounded-lg bg-surface sm:col-span-7"
            >
              <img
                src="/images/properties.png"
                alt="AURELIS properties index with the collection heading and editorial layout"
                width="1507"
                height="717"
                loading="lazy"
                decoding="async"
                className={`aspect-[2/1] ${imageClass} group-hover:scale-[1.03]`}
              />
            </figure>

            <figure
              data-work-media
              className="overflow-hidden rounded-lg bg-surface sm:col-span-5 sm:mt-12"
            >
              <img
                src="/images/property-details.png"
                alt="AURELIS property grid with three residences and location details"
                width="1507"
                height="695"
                loading="lazy"
                decoding="async"
                className={`aspect-[2/1] ${imageClass} group-hover:scale-[1.03]`}
              />
            </figure>
          </div>
        </article>

        <article
          data-work-item
          className="group grid gap-10 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24"
        >
          <div className="lg:col-span-7">
            <div
              data-work-media
              className="overflow-hidden rounded-lg bg-surface"
            >
              <img
                src="/images/amazon-clone/homepage.png"
                alt="Amazon Clone storefront with product grid and category navigation"
                width="1517"
                height="717"
                loading="lazy"
                decoding="async"
                className={`aspect-[2/1] ${imageClass} group-hover:scale-[1.03]`}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <figure
                data-work-media
                className="overflow-hidden rounded-lg bg-surface"
              >
                <img
                  src="/images/amazon-clone/features.png"
                  alt="Amazon Clone search results with category filtering and product listings"
                  width="1512"
                  height="715"
                  loading="lazy"
                  decoding="async"
                  className={`aspect-[2/1] ${imageClass} group-hover:scale-[1.03]`}
                />
              </figure>

              <figure
                data-work-media
                className="overflow-hidden rounded-lg bg-surface"
              >
                <img
                  src="/images/amazon-clone/product-page.png"
                  alt="Amazon Clone product page with product imagery, price and add-to-cart controls"
                  width="1512"
                  height="722"
                  loading="lazy"
                  decoding="async"
                  className={`aspect-[2/1] ${imageClass} group-hover:scale-[1.03]`}
                />
              </figure>
            </div>
          </div>

          <div data-work-reveal className="lg:col-span-4 lg:col-start-9 lg:self-start">
            <ProjectMeta
              index="02"
              title="Amazon Clone"
              category="E-commerce"
              description="An e-commerce frontend inspired by Amazon's shopping experience, with product search, category filtering, product details, cart, quantity updates and localStorage persistence."
              tech={['HTML', 'CSS', 'JavaScript']}
            />
          </div>
        </article>
      </div>
    </section>
  )
}

export default Work
