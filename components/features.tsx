"use client"

import { motion } from "framer-motion"
import { FileText, Presentation, Headphones, Video, Brain, Zap } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Smart Paper Analysis",
    description: "AI-powered analysis extracts key insights, methodologies, and findings from your research papers.",
  },
  {
    icon: Presentation,
    title: "Auto Presentations",
    description:
      "Generate professional slide decks with visual elements, charts, and structured content automatically.",
  },
  {
    icon: Headphones,
    title: "Podcast Generation",
    description: "Transform your research into engaging audio content with natural-sounding AI narration.",
  },
  {
    icon: Video,
    title: "Visual Summaries",
    description: "Create animated explainer videos and infographics to make complex research accessible.",
  },
  {
    icon: Brain,
    title: "Intelligent Insights",
    description: "Discover hidden patterns and connections across multiple research papers and datasets.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process and transform your research content in minutes, not hours or days.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {" "}
              Modern Research
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Leverage cutting-edge AI to transform how you present and share your research findings
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
