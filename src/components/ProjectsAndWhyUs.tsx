import { motion } from 'framer-motion'
import { useScrollAnimation } from './useScrollAnimation'
import { Factory, Wrench, Shield, ArrowRightLeft } from 'lucide-react'

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
    image: '/images/chair.png',
    title: 'Ergonomic Seating Range',
    category: 'Seating',
  },
]

const reasons = [
  {
    icon: Factory,
    title: 'In-house Manufacturing',
    description: 'Complete control over production ensures quality at every stage.',
  },
  {
    icon: Wrench,
    title: 'Custom-built Solutions',
    description: 'Every piece is designed to match your exact workspace requirements.',
  },
  {
    icon: Shield,
    title: 'Durable Materials',
    description: 'Industry-grade materials that withstand heavy daily usage for years.',
  },
  {
    icon: ArrowRightLeft,
    title: 'End-to-end Execution',
    description: 'From concept to installation, we manage the entire lifecycle.',
  },
]

export function ProjectsAndWhyUs() {
  const [ref, isInView] = useScrollAnimation(0.05)

  return (
    <section id="projects" className="py-24 lg:py-32 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full mb-4">
            Portfolio & Strengths
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-dark tracking-tight">
            Our Work Speaks for Itself
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            A glimpse into the workspaces we've built — and the values that drive every project
          </p>
        </motion.div>

        {/* Combined Layout */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Project Gallery — spans 3 cols */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-4">
              {/* Large featured card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="col-span-2 group relative rounded-3xl overflow-hidden cursor-pointer h-72"
              >
                <img
                  src={projects[0].image}
                  alt={projects[0].title}
                  className="w-full h-full object-contain bg-grey p-8 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/80 transition-all duration-500 flex items-end">
                  <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-accent bg-accent/20 rounded-full mb-2">
                      {projects[0].category}
                    </span>
                    <h3 className="text-lg font-bold text-white">{projects[0].title}</h3>
                  </div>
                </div>
              </motion.div>

              {/* Smaller project cards */}
              {projects.slice(1).map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer h-52"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain bg-grey p-6 group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/80 transition-all duration-500 flex items-end">
                    <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <span className="inline-block px-2 py-0.5 text-xs font-semibold text-accent bg-accent/20 rounded-full mb-1">
                        {project.category}
                      </span>
                      <h3 className="text-sm font-bold text-white">{project.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Why Choose Us — spans 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-2"
            >
              <h3 className="text-2xl font-extrabold text-text-dark mb-2">
                Why Choose Us
              </h3>
              <p className="text-sm text-text-muted">
                What sets DM Enterprises apart from the rest
              </p>
            </motion.div>

            {reasons.map((reason, i) => {
              const Icon = reason.icon
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="flex gap-4 p-5 bg-grey rounded-2xl hover:bg-primary/5 transition-colors duration-300 cursor-default"
                >
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text-dark mb-1">
                      {reason.title}
                    </h4>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-2 grid grid-cols-3 gap-3"
            >
              {[
                { value: '500+', label: 'Projects' },
                { value: '10+', label: 'Years' },
                { value: '100%', label: 'Custom' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-primary rounded-2xl">
                  <div className="text-xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-xs font-medium text-white/70">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
