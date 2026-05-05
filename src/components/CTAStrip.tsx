import { motion } from 'framer-motion'
import { useScrollAnimation } from './useScrollAnimation'
import { ArrowRight } from 'lucide-react'

export default function CTAStrip() {
  const [ref, isInView] = useScrollAnimation(0.2)

  return (
    <section id="contact" className="py-20 lg:py-28 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Ready to Build Your Workspace?
          </h2>
          <p className="mt-5 text-lg text-white/70 max-w-xl mx-auto">
            Let&apos;s discuss your requirements and create a workspace that drives productivity.
          </p>
          <motion.a
            href="mailto:dmenterprises999@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 mt-10 px-10 py-4 bg-white text-primary font-bold rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)] transition-shadow text-lg"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
