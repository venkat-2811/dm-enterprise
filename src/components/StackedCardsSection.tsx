import { motion } from 'framer-motion'
import { useScrollAnimation } from './useScrollAnimation'

const products = [
  { image: "/images/workstation.png", title: "Corporate Workstations", description: "Modular clusters for modern offices" },
  { image: "/images/table.png", title: "Executive Desks", description: "Premium office tables" },
  { image: "/images/storage.png", title: "Storage Systems", description: "Organized workspace solutions" },
  { image: "/images/interior.png", title: "Complete Interiors", description: "End-to-end office design" },
  { image: "/images/chair.png", title: "Ergonomic Seating", description: "Comfort meets productivity" },
]

function MarqueeCard({ product }: { product: typeof products[number] }) {
  return (
    <div className="shrink-0 w-72 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden group cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow duration-300">
      <div className="h-48 bg-grey overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold text-text-dark mb-1">{product.title}</h3>
        <p className="text-sm text-text-muted">{product.description}</p>
      </div>
    </div>
  )
}

export function StackedCardsSection() {
  const [ref, isInView] = useScrollAnimation(0.1)

  const doubled = [...products, ...products]

  return (
    <section className="py-24 lg:py-32 bg-grey overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full mb-4">
            Featured Products
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-dark tracking-tight">
            Product Collections
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            Explore our curated product range built for modern workspaces
          </p>
        </motion.div>
      </div>

      {/* Infinite horizontal marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-grey to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-grey to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {doubled.map((product, i) => (
            <MarqueeCard key={`${product.title}-${i}`} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
