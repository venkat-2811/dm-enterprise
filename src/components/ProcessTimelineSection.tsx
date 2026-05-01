import { motion } from 'framer-motion'
import { Calendar, Compass, Hammer, CheckCircle, Truck } from 'lucide-react'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'
import { useScrollAnimation } from './useScrollAnimation'

const timelineData = [
  {
    id: 1,
    title: "Consultation",
    date: "Step 1",
    content: "We begin with an in-depth consultation to understand your workspace requirements, budget, and timeline.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Step 2",
    content: "Our design team creates detailed 3D layouts and material specifications tailored to your space.",
    category: "Design",
    icon: Compass,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Manufacturing",
    date: "Step 3",
    content: "In-house manufacturing ensures quality control at every stage, from raw materials to finished products.",
    category: "Production",
    icon: Hammer,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 4,
    title: "Quality Check",
    date: "Step 4",
    content: "Every piece undergoes rigorous quality testing to meet our durability and finish standards.",
    category: "QA",
    icon: CheckCircle,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 40,
  },
  {
    id: 5,
    title: "Installation",
    date: "Step 5",
    content: "Professional installation team handles setup, alignment, and final handover at your location.",
    category: "Delivery",
    icon: Truck,
    relatedIds: [4],
    status: "pending" as const,
    energy: 20,
  },
]

export function ProcessTimelineSection() {
  const [ref, isInView] = useScrollAnimation(0.05)

  return (
    <section className="relative overflow-hidden">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center pt-24 pb-8 bg-black px-6"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/20 rounded-full mb-4">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How We Work
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Click on any node to explore each stage of our end-to-end delivery process
          </p>
        </motion.div>

        <div className="h-screen">
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>
      </div>
    </section>
  )
}
