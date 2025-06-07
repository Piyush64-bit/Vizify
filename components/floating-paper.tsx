"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FileText } from "lucide-react"

export function FloatingPaper({ count = 5 }) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (!isClient) {
    return <div className="relative w-full h-full" />
  }

  return (
    <div className="relative w-full h-full">
      {Array.from({ length: count }).map((_, i) => {
        const initialX = Math.random() * Math.max(dimensions.width - 100, 100)
        const initialY = Math.random() * Math.max(dimensions.height - 100, 100)

        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: initialX,
              y: initialY,
            }}
            animate={{
              x: [
                initialX,
                Math.random() * Math.max(dimensions.width - 100, 100),
                Math.random() * Math.max(dimensions.width - 100, 100),
              ],
              y: [
                initialY,
                Math.random() * Math.max(dimensions.height - 100, 100),
                Math.random() * Math.max(dimensions.height - 100, 100),
              ],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <div className="relative w-16 h-20 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center transform hover:scale-110 transition-transform">
              <FileText className="w-8 h-8 text-purple-400/50" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
