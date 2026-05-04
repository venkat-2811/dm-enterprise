import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from './useScrollAnimation'
import { CircularRevealHeading } from '@/components/ui/circular-reveal-heading'

const services = [
  {
    image: '/images/workstation.png',
    title: 'Workstations',
    text: 'WORKSTATIONS',
    description:
      'Modular workstation clusters designed for collaboration, focus, and maximum space efficiency.',
  },
  {
    image: '/images/table.png',
    title: 'Office Tables',
    text: 'TABLES',
    description:
      'Executive and operational desks built with premium materials for everyday durability.',
  },
  {
    image: '/images/storage.png',
    title: 'Storage Solutions',
    text: 'STORAGE',
    description:
      'Cabinets, shelving units, and filing systems that keep your workspace organized and clean.',
  },
  {
    image: '/images/chair.png',
    title: 'Seating',
    text: 'SEATING',
    description:
      'Ergonomic office chairs and visitor seating designed for comfort during long work hours.',
  },
]

export default function Services() {
  const [ref, isInView] = useScrollAnimation(0.1)
  const [activeIndex, setActiveIndex] = useState(0)

  const circularItems = services.map((s) => ({
    text: s.text,
    image: s.image,
  }))

  return (
    <section id="services" className="py-24 lg:py-32 bg-grey">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-dark tracking-tight">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            End-to-end modular furniture solutions for modern workspaces
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Interactive Disk */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="shrink-0"
          >
            <CircularRevealHeading
              items={circularItems}
              centerText={
                <div className="text-center">
                  <img src="/images/logo.png" alt="DM Enterprises" className="h-8 w-auto mx-auto mb-1 sm:h-10" />
                  <div className="text-[9px] sm:text-xs font-medium text-[#444444] tracking-wider">
                    INTERIORS & MODULARS
                  </div>
                </div>
              }
              size="sm"
            />
          </motion.div>

          {/* Right: Service Cards */}
          <div className="flex-1 w-full">
            {/* Card tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {services.map((service, i) => (
                <button
                  key={service.title}
                  onClick={() => setActiveIndex(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeIndex === i
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-text-muted hover:text-text-dark hover:bg-white/80'
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>

            {/* Active card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-full sm:w-48 h-48 rounded-2xl bg-grey overflow-hidden shrink-0">
                    <img
                      src={services[activeIndex].image}
                      alt={services[activeIndex].title}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-text-dark mb-3">
                      {services[activeIndex].title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {services[activeIndex].description}
                    </p>
                    <a
                      href="#contact"
                      className="inline-flex items-center mt-5 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-colors"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
