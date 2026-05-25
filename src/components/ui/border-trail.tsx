"use client"

import { cn } from "@/lib/utils"
import { motion, type Transition } from "framer-motion"

export function BorderTrail({
  className,
  size = 60,
  transition,
  style,
}: {
  className?: string
  size?: number
  transition?: Transition
  style?: React.CSSProperties
}) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn("absolute aspect-square bg-[var(--color-accent)]", className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity,
          ...transition,
        }}
      />
    </div>
  )
}
