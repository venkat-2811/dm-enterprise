import { motion } from 'framer-motion'
import { CircularRevealHeading } from '@/components/ui/circular-reveal-heading'
import { useScrollAnimation } from './useScrollAnimation'

const items = [
  {
    text: "WORKSTATIONS",
    image: "/images/workstation.png",
  },
  {
    text: "INTERIORS",
    image: "/images/interior.png",
  },
  {
    text: "STORAGE",
    image: "/images/storage.png",
  },
  {
    text: "SEATING",
    image: "/images/chair.png",
  },
]

export function CircularRevealSection() {
  const [ref, isInView] = useScrollAnimation(0.1)

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/8 rounded-full mb-4">
            Interactive Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-dark tracking-tight">
            Explore Our Expertise
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            Hover over the rotating text to preview our product categories
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <CircularRevealHeading
            items={items}
            centerText={
              <div className="text-center">
                <img src="/images/logo.png" alt="DM Enterprises" className="h-10 w-auto mx-auto mb-1" />
                <div className="text-xs font-medium text-[#444444] tracking-wider">
                  INTERIORS & MODULARS
                </div>
              </div>
            }
            size="lg"
          />
        </motion.div>
      </div>
    </section>
  )
}
