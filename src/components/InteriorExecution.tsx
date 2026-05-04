import { motion } from 'framer-motion'
import { useScrollAnimation } from './useScrollAnimation'
import { CheckCircle } from 'lucide-react'

const features = [
  'Complete space planning & layout design',
  'Custom modular partition systems',
  'Electrical & networking integration',
  'Professional installation & handover',
]

export default function InteriorExecution() {
  const [ref, isInView] = useScrollAnimation(0.15)

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="/images/interior.png"
                alt="Interior Execution"
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-6 -right-2 sm:-right-4 lg:-right-8 bg-white rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-extrabold text-accent">A+</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-text-dark">Quality Grade</div>
                  <div className="text-xs text-text-muted">Premium Finish</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/8 rounded-full mb-4">
              Turnkey Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-dark tracking-tight leading-tight">
              Interior Design<br />
              <span className="text-primary">&amp; Execution</span>
            </h2>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              We handle complete office interior projects from planning and
              layout design to final installation with precision and quality.
            </p>
            <div className="mt-8 space-y-4">
              {features.map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-text-dark font-medium">{feat}</span>
                </motion.div>
              ))}
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex mt-10 px-8 py-4 bg-primary text-white font-semibold rounded-2xl shadow-[0_4px_15px_rgba(30,58,138,0.3)] hover:shadow-[0_8px_30px_rgba(30,58,138,0.4)] transition-shadow"
            >
              Discuss Your Project
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
