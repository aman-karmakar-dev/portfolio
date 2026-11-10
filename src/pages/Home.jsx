import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import About from '../sections/about/About'
import Approach from '../sections/approach/Approach'
import Capabilities from '../sections/capabilities/Capabilities'
import Contact from '../sections/contact/Contact'
import Credentials from '../sections/credentials/Credentials'
import Experience from '../sections/experience/Experience'
import Hero from '../sections/hero/Hero'
import Work from '../sections/work/Work'

function Home() {
  const { hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) return
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
  }, [hash])

  return (
    <>
      <Hero />
      <Work />
      <Capabilities />
      <Approach />
      <About />
      <Experience />
      <Credentials />
      <Contact />
    </>
  )
}

export default Home
