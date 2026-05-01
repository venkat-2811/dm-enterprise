import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#hero', sectionId: 'hero' },
  { label: 'Services', href: '#services', sectionId: 'services' },
  { label: 'Projects', href: '#projects', sectionId: 'projects' },
  { label: 'About', href: '#why-us', sectionId: 'why-us' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  // Track scroll position for navbar style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy using IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.sectionId)
    const observers: IntersectionObserver[] = []

    // We track which sections are currently visible and pick the topmost one
    const visibleSections = new Set<string>()

    const updateActive = () => {
      // Pick the first visible section in the defined order
      for (const id of sectionIds) {
        if (visibleSections.has(id)) {
          setActiveSection(id)
          return
        }
      }
    }

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.add(id)
            } else {
              visibleSections.delete(id)
            }
            updateActive()
          })
        },
        {
          rootMargin: '-20% 0px -60% 0px', // top 20% – bottom 60% of viewport
          threshold: 0,
        }
      )

      observer.observe(el)
      observers.push(observer)
    }

    return () => {
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-3"
    >
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 rounded-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
          : 'bg-white/10 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)]'
      }`}>
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="DM Enterprises"
              className="h-10 w-auto rounded-full"
              loading="eager"
            />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                    scrolled
                      ? isActive
                        ? 'text-primary'
                        : 'text-text-dark/70 hover:text-primary'
                      : isActive
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {/* Active indicator pill */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className={`absolute inset-0 rounded-xl -z-10 ${
                        scrolled ? 'bg-primary/8' : 'bg-white/15'
                      }`}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
            <a
              href="#contact"
              className="ml-4 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-light transition-all duration-200 shadow-[0_1px_2px_rgba(30,58,138,0.3)]"
            >
              Get a Quote
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-text-dark hover:bg-grey' : 'text-white hover:bg-white/10'}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl rounded-2xl mt-2 mx-2 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.sectionId
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/8 font-semibold'
                        : 'text-text-dark/70 hover:text-primary hover:bg-grey'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-xl text-center"
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
