"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, FileText, Headphones } from "lucide-react"

const examples = [
  {
    type: "Presentation",
    title: "Machine Learning in Healthcare",
    description:
      "A comprehensive slide deck generated from a 50-page research paper on ML applications in medical diagnosis.",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
  },
  {
    type: "Podcast",
    title: "Climate Change Research Summary",
    description: "15-minute audio summary of recent climate research findings with natural AI narration.",
    icon: Headphones,
    color: "from-green-500 to-emerald-500",
  },
  {
    type: "Video",
    title: "Quantum Computing Explained",
    description: "Animated explainer video breaking down complex quantum computing concepts for general audiences.",
    icon: Play,
    color: "from-purple-500 to-pink-500",
  },
]

export default function Examples() {
  return (
    <section id="examples" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            See It In
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> Action</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Explore examples of how ResearchAI transforms academic papers into engaging content
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${example.color} rounded-lg flex items-center justify-center mb-6`}
              >
                <example.icon className="w-8 h-8 text-white" />
              </div>
              <div className="mb-4">
                <span className="text-purple-400 text-sm font-medium">{example.type}</span>
                <h3 className="text-xl font-semibold text-white mt-1">{example.title}</h3>
              </div>
              <p className="text-gray-400 mb-6">{example.description}</p>
              <Button variant="outline" className="w-full text-white border-purple-500 hover:bg-purple-500/20">
                View Example
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
