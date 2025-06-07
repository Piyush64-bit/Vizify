"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Award, Code, Lightbulb, Camera, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function About() {
  const [creatorImage, setCreatorImage] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setIsUploading(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        setCreatorImage(e.target?.result as string)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const removeImage = () => {
    setCreatorImage("")
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
              <div className="flex-shrink-0 relative">
                <div
                  className={`w-48 h-48 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center overflow-hidden relative group p-1 transition-all duration-300 ${
                    dragActive ? "scale-105 shadow-lg shadow-purple-500/50" : ""
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="w-full h-full bg-black rounded-full overflow-hidden relative">
                    {creatorImage ? (
                      <img
                        src={creatorImage || "/placeholder.svg"}
                        alt="Stuti Gupta - AI Researcher & Full-Stack Developer"
                        className="w-full h-full object-cover"
                        onError={() => setCreatorImage("")}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 flex flex-col items-center justify-center">
                        <span className="text-6xl font-bold text-white mb-2">SG</span>
                        <div className="text-xs text-white/70 text-center px-4">
                          <Upload className="w-4 h-4 mx-auto mb-1" />
                          <p>Drop image here</p>
                          <p>or click to upload</p>
                        </div>
                      </div>
                    )}

                    {/* Upload overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {isUploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full"></div>
                      </div>
                    )}

                    {dragActive && (
                      <div className="absolute inset-0 bg-purple-500/30 flex items-center justify-center rounded-full border-2 border-dashed border-white">
                        <div className="text-white text-center">
                          <Upload className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">Drop your image here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {creatorImage && (
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
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
                  <Button variant="outline" className="text-white border-purple-500 hover:bg-purple-500/20">
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
