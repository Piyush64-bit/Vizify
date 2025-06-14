"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Award, Code, Lightbulb, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import ImageUpload from "@/components/image-upload"

export default function About() {
  // Using the professional photo as default
  const defaultImageUrl = "/images/stuti-professional.jpg"

  const [creatorImage, setCreatorImage] = useState<string | null>(defaultImageUrl)

  // Creator's social links
  const creatorLinks = {
    portfolio: "https://v0-portfolio-website-makeover-seven.vercel.app/", // Replace with actual portfolio URL
    github: "https://github.com/stuticoder123", // Updated with actual GitHub URL
    linkedin: "https://www.linkedin.com/in/stuticoder1/", // Updated with actual LinkedIn URL
    email: "mailto:stuticoder123@gmail.com", // Replace with actual email
  }

  return (
    <section id="about" className="py-20 px-6 bg-white/[0.02]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About The
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> Creator</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">Meet the visionary behind ResearchAI</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0 relative group">
                {/* Clickable image with link */}
                <a
                  href={creatorLinks.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative"
                  title="Visit Stuti's Portfolio"
                >
                  <ImageUpload
                    onImageChange={setCreatorImage}
                    currentImage={creatorImage}
                    size="lg"
                    shape="circle"
                    placeholder="SG"
                  />

                  {/* Link indicator overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </a>

                {/* Portfolio link badge */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <a
                    href={creatorLinks.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Portfolio
                  </a>
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl font-bold text-white mb-2">Stuti Gupta</h3>
                <p className="text-purple-400 text-xl mb-4">AI Researcher & Full-Stack Developer</p>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Stuti is a passionate AI researcher and full-stack developer with a vision to democratize access to
                  research insights. With expertise in machine learning, natural language processing, and web
                  development, she created ResearchAI to bridge the gap between complex academic research and accessible
                  content creation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Code className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Tech Enthusiast</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Lightbulb className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Innovation Leader</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Award className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">LinkedIn Influencer</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Button
                    variant="outline"
                    className="text-white border-purple-500 hover:bg-purple-500/20"
                    onClick={() => window.open(creatorLinks.github, "_blank")}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-purple-500 hover:bg-purple-500/20"
                    onClick={() => window.open(creatorLinks.linkedin, "_blank")}
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-purple-500 hover:bg-purple-500/20"
                    onClick={() => window.open(creatorLinks.email, "_blank")}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <h4 className="text-2xl font-semibold text-white mb-4">The Vision</h4>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              "I believe that groundbreaking research should be accessible to everyone, not just academics. ResearchAI
              is my contribution to making scientific knowledge more engaging and understandable for researchers,
              students, and curious minds worldwide."
            </p>
            <div className="mt-6">
              <span className="text-purple-400 font-medium">- Stuti Gupta</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
