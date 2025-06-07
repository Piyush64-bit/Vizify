"use client"

import { motion } from "framer-motion"
import { Upload, Brain, Download, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload Your Research",
    description: "Simply drag and drop your research papers, PDFs, or documents into our secure platform.",
  },
  {
    icon: Brain,
    title: "AI Processing",
    description: "Our advanced AI analyzes your content, extracting key insights, methodologies, and findings.",
  },
  {
    icon: Download,
    title: "Get Your Content",
    description: "Download presentations, podcasts, videos, or visual summaries in your preferred format.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-white/[0.02]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> Works</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Transform your research in three simple steps with our AI-powered platform
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center max-w-sm"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className="hidden lg:block mx-8"
                >
                  <ArrowRight className="w-8 h-8 text-purple-400" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
