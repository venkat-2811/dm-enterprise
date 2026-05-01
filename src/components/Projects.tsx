import { motion } from 'framer-motion'
import { useScrollAnimation } from './useScrollAnimation'

const projects = [
  {
    image: '/images/workstation.png',
    title: 'Corporate Workstation Cluster',
    category: 'Workstations',
  },
  {
    image: '/images/table.png',
    title: 'Executive Desk Setup',
    category: 'Office Tables',
  },
  {
    image: '/images/interior.png',
    title: 'Complete Office Interior',
    category: 'Interior Design',
  },
  {
    image: '/images/storage.png',
    title: 'Storage & Filing Systems',
    category: 'Storage',
  },
  {
    image: '/images/filing.png',
    title: 'Document Management Units',
    category: 'Filing Solutions',
  },
  {
    image: '/images/chair.png',
    title: 'Ergonomic Seating Range',
    category: 'Seating',
  },
]

export default function Projects() {
  const [ref, isInView] = useScrollAnimation(0.05)

  return (
    <section id="projects" className="py-24 lg:py-32 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-dark tracking-tight">
            Project Showcase
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            A glimpse into the workspaces we&apos;ve built and transformed
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="group relative bg-grey rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/80 transition-all duration-500 flex items-end">
                <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-accent bg-accent/20 rounded-full mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
