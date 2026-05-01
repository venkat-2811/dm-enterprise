import { motion } from 'framer-motion'
import { useScrollAnimation } from './useScrollAnimation'
import React from 'react'

const projects = [
  [
    "WhatsApp Image 2026-04-21 at 11.21.11 (1).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.11 (2).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.11.jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.12 (1).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.12 (2).jpeg"
  ],
  [
    "WhatsApp Image 2026-04-21 at 11.21.12 (3).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.12.jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.13 (1).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.13 (2).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.13.jpeg"
  ],
  [
    "WhatsApp Image 2026-04-21 at 11.21.14 (1).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.14 (2).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.14 (3).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.14.jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.15 (1).jpeg"
  ],
  [
    "WhatsApp Image 2026-04-21 at 11.21.15 (2).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.15 (3).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.15.jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.16 (1).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.16 (2).jpeg"
  ],
  [
    "WhatsApp Image 2026-04-21 at 11.21.16.jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.17 (1).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.17 (2).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.17 (3).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.17.jpeg"
  ],
  [
    "WhatsApp Image 2026-04-21 at 11.21.18 (1).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.18.jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.19 (1).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.19 (2).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.19 (3).jpeg"
  ],
  [
    "WhatsApp Image 2026-04-21 at 11.21.19.jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.20 (1).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.20 (2).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.20.jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.21 (1).jpeg"
  ],
  [
    "WhatsApp Image 2026-04-21 at 11.21.21 (2).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.21 (3).jpeg",
    "WhatsApp Image 2026-04-21 at 11.21.21.jpeg"
  ]
];

export function ProjectsGallery() {
  const [ref, isInView] = useScrollAnimation(0.05);

  return (
    <section id="projects-gallery" className="py-24 lg:py-32 bg-gray-50 overflow-hidden relative border-y border-gray-100">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full mb-4">
            Our Masterpieces
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-dark tracking-tight">
            Featured Projects Gallery
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            Explore our curated collages of recent interior execution and furniture projects.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full flex overflow-hidden group py-4">
        <div className="animate-marquee flex space-x-8 px-4 w-max shrink-0">
          {projects.map((projectImages, idx) => (
            <div key={`proj-${idx}`} className="w-[600px] h-[400px] shrink-0 grid grid-cols-4 grid-rows-4 gap-2 bg-white p-3 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300">
              {projectImages.map((img, i) => {
                let classes = 'rounded-xl object-cover w-full h-full';
                let wrapClasses = '';
                if (i === 0) wrapClasses = 'col-span-2 row-span-4';
                else if (i === 1) wrapClasses = 'col-span-2 row-span-2';
                else if (i === 2) wrapClasses = 'col-span-1 row-span-2';
                else if (i === 3) wrapClasses = 'col-span-1 row-span-2';
                else wrapClasses = 'col-span-2 row-span-2'; // fallback or adjust if < 5
                
                return (
                  <div key={i} className={`overflow-hidden relative group/img ${wrapClasses}`}>
                    <img src={`/projects/${img}`} alt={`Project ${idx+1} image ${i+1}`} className={`${classes} group-hover/img:scale-110 transition-transform duration-700`} loading="lazy" />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        
        {/* Duplicate for seamless looping */}
        <div className="animate-marquee flex space-x-8 px-4 w-max shrink-0" aria-hidden="true">
          {projects.map((projectImages, idx) => (
            <div key={`dup-${idx}`} className="w-[600px] h-[400px] shrink-0 grid grid-cols-4 grid-rows-4 gap-2 bg-white p-3 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300">
              {projectImages.map((img, i) => {
                let classes = 'rounded-xl object-cover w-full h-full';
                let wrapClasses = '';
                if (i === 0) wrapClasses = 'col-span-2 row-span-4';
                else if (i === 1) wrapClasses = 'col-span-2 row-span-2';
                else if (i === 2) wrapClasses = 'col-span-1 row-span-2';
                else if (i === 3) wrapClasses = 'col-span-1 row-span-2';
                else wrapClasses = 'col-span-2 row-span-2';
                
                return (
                  <div key={i} className={`overflow-hidden relative group/img ${wrapClasses}`}>
                    <img src={`/projects/${img}`} alt={`Project ${idx+1} image ${i+1}`} className={`${classes} group-hover/img:scale-110 transition-transform duration-700`} loading="lazy" />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
