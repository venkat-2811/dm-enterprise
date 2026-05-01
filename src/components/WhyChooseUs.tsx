import { motion } from 'framer-motion'
import { useScrollAnimation } from './useScrollAnimation'
import { Factory, Wrench, Shield, ArrowRightLeft } from 'lucide-react'

const reasons = [
  {
    icon: Factory,
    title: 'In-house Manufacturing',
    description:
      'Complete control over production ensures quality at every stage, from raw material to finished product.',
  },
  {
    icon: Wrench,
    title: 'Custom-built Solutions',
    description:
      'Every piece is designed and built to match your exact workspace requirements and specifications.',
  },
  {
    icon: Shield,
    title: 'Durable Materials',
    description:
      'We use only industry-grade materials that withstand heavy daily usage for years to come.',
  },
  {
    icon: ArrowRightLeft,
    title: 'End-to-end Execution',
    description:
      'From concept to installation, we manage the entire project lifecycle seamlessly.',
  },
]

export default function WhyChooseUs() {
  const [ref, isInView] = useScrollAnimation(0.1)

  return (
    <section id="why-us" className="py-24 lg:py-32 bg-grey">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full mb-4">
            Our Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-dark tracking-tight">
            Why Choose Us
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            What sets DM Enterprises apart from the rest
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.07)] transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-primary/8 rounded-2xl flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-text-dark mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
