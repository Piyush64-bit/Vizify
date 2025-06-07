"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Award, Code, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import ImageUpload from "@/components/image-upload"

export default function About() {
  // Set the default image to the PNG file we added
  const [creatorImage, setCreatorImage] = useState<string | null>("/images/stuti-gupta-profile.png")

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
              <div className="flex-shrink-0">
                <ImageUpload
                  onImageChange={setCreatorImage}
                  currentImage={creatorImage}
                  size="lg"
                  shape="circle"
                  placeholder="SG"
                />
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
                    <span className="text-gray-300">Full-Stack Dev</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Lightbulb className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">AI Researcher</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Award className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Innovation Leader</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Button variant="outline" className="text-white border-purple-500 hover:bg-purple-500/20">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="outline" className="text-white border-purple-500 hover:bg-purple-500/20">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="text-white border-purple-500 hover:bg-purple-service/20">
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
