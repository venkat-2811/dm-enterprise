import { useInView } from 'framer-motion'
import { useRef } from 'react'
import type { RefObject } from 'react'

export function useScrollAnimation(threshold = 0.15): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  return [ref, isInView]
}
