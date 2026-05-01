import { motion } from 'framer-motion'
import { useScrollAnimation } from './useScrollAnimation'
import { ArrowRight, Sofa, Palette, Truck } from 'lucide-react'

const highlights = [
  {
    icon: Sofa,
    title: 'Premium Furniture',
    description: 'Sofas, chairs, tables & complete living room solutions',
  },
  {
    icon: Palette,
    title: 'Custom Designs',
    description: 'Tailored to your space, style & budget',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    description: 'Doorstep delivery with installation support',
  },
]

export default function DMFurnitures() {
  const [ref, isInView] = useScrollAnimation(0.1)

  return (
    <section className="py-24 lg:py-32 bg-grey relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <img
                src="/images/Furniture.png"
                alt="DM Furnitures - Premium home & office furniture"
                className="w-full h-auto"
                loading="lazy"
              />
              {/* Gradient overlay on bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-5 -right-3 lg:-right-6 bg-accent text-white rounded-2xl px-5 py-3 shadow-[0_8px_30px_rgba(249,115,22,0.35)]"
            >
              <div className="text-lg font-extrabold">DM</div>
              <div className="text-[10px] font-medium tracking-wider opacity-90 uppercase">Furnitures</div>
            </motion.div>

            {/* Decorative ring */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-primary/10 rounded-full pointer-events-none" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/8 rounded-full mb-4">
              Our Sister Company
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-dark tracking-tight leading-tight">
              DM{' '}
              <span className="text-accent">Furnitures</span>
            </h2>
            <p className="mt-5 text-lg text-text-muted leading-relaxed">
              Beyond office spaces, we bring the same quality and craftsmanship to your homes. DM Furnitures offers premium, custom-designed furniture for living rooms, bedrooms, and modern workspaces.
            </p>

            {/* Highlight grid */}
            <div className="mt-8 space-y-4">
              {highlights.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-dark">{item.title}</h4>
                      <p className="text-sm text-text-muted mt-0.5">{item.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-primary text-white font-semibold rounded-2xl shadow-[0_4px_15px_rgba(30,58,138,0.3)] hover:shadow-[0_8px_30px_rgba(30,58,138,0.4)] transition-shadow"
            >
              Explore DM Furnitures
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
