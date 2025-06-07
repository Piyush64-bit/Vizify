"use client"

import { Button } from "@/components/ui/button"
import { Bot, Menu } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import type React from "react"

export default function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10 fixed w-full top-0 z-50"
    >
      <button onClick={() => scrollToSection("hero")} className="flex items-center space-x-2">
        <Bot className="w-8 h-8 text-purple-500" />
        <span className="text-white font-medium text-xl">ResearchAI</span>
      </button>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink onClick={() => scrollToSection("features")}>Features</NavLink>
        <NavLink onClick={() => scrollToSection("how-it-works")}>How it Works</NavLink>
        <NavLink onClick={() => scrollToSection("examples")}>Examples</NavLink>
        <NavLink onClick={() => scrollToSection("about")}>About</NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Link href="/auth/signin">
          <Button variant="ghost" className="text-white hover:text-purple-400">
            Sign In
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
        </Link>
      </div>

      <Button variant="ghost" size="icon" className="md:hidden text-white">
        <Menu className="w-6 h-6" />
      </Button>
    </motion.nav>
  )
}

function NavLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="text-gray-300 hover:text-white transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </button>
  )
}
