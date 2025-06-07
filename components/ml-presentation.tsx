"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Brain,
  Stethoscope,
  Activity,
  Shield,
  TrendingUp,
  Database,
  Users,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Microscope,
  Cpu,
  Globe,
  Edit3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PresentationEditor from "@/components/presentation-editor"

const initialSlides = [
  {
    id: 1,
    title: "Machine Learning in Healthcare",
    subtitle: "Transforming Patient Care Through AI",
    content:
      "A comprehensive overview of how artificial intelligence is revolutionizing healthcare delivery, diagnosis, and treatment outcomes across global healthcare systems.",
    icon: "Heart",
    gradient: "from-red-500 to-pink-500",
  },
  {
    id: 2,
    title: "Research Methodology",
    subtitle: "Systematic Literature Review Approach",
    content: [
      "Systematic review of 150+ peer-reviewed papers (2020-2024)",
      "Meta-analysis of clinical trial data from 50+ institutions",
      "Cross-sectional analysis of healthcare AI implementations",
      "Qualitative interviews with 25 healthcare professionals",
      "Quantitative assessment of patient outcome metrics",
    ],
    icon: "Microscope",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Key Application Areas",
    subtitle: "Where ML Makes the Biggest Impact",
    content: [
      "Medical Image Analysis & Radiology (94% accuracy)",
      "Drug Discovery & Development (40% faster)",
      "Predictive Analytics for Patient Outcomes",
      "Natural Language Processing for Clinical Notes",
      "Personalized Treatment Recommendations",
      "Robotic Surgery and Precision Medicine",
    ],
    icon: "Brain",
    gradient: "from-purple-500 to-indigo-500",
  },
  // Add more slides as needed...
]

const iconMap = {
  Heart,
  Brain,
  Stethoscope,
  Activity,
  Shield,
  TrendingUp,
  Database,
  Users,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Microscope,
  Cpu,
  Globe,
}

export default function MLPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState(initialSlides)
  const [viewMode, setViewMode] = useState<"view" | "edit">("view")

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const getCurrentIcon = () => {
    const iconName = slides[currentSlide]?.icon as keyof typeof iconMap
    return iconMap[iconName] || Brain
  }

  const CurrentIcon = getCurrentIcon()

  if (viewMode === "edit") {
    return (
      <PresentationEditor
        slides={slides}
        onSlidesChange={setSlides}
        onViewModeChange={setViewMode}
        currentMode={viewMode}
      />
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* View Mode Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Presentation View</h3>
        <Button
          onClick={() => setViewMode("edit")}
          variant="outline"
          className="text-white border-purple-500 hover:bg-purple-500/20"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Presentation
        </Button>
      </div>

      <Card className="bg-white/5 border-white/10 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-96 md:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide]?.gradient} p-8 md:p-12 flex flex-col justify-center`}
              >
                <div className="max-w-4xl mx-auto text-center text-white">
                  <div className="mb-6">
                    {CurrentIcon && <CurrentIcon className="w-16 h-16 mx-auto mb-4 opacity-80" />}
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{slides[currentSlide]?.title}</h2>

                  <h3 className="text-xl md:text-2xl font-medium mb-8 opacity-90">{slides[currentSlide]?.subtitle}</h3>

                  {/* Content based on slide type */}
                  {Array.isArray(slides[currentSlide]?.content) ? (
                    <div className="space-y-3 text-left max-w-2xl mx-auto">
                      {(slides[currentSlide].content as string[]).map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 text-lg"
                        >
                          <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                      {slides[currentSlide]?.content}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <Button
              onClick={prevSlide}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              onClick={nextSlide}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center items-center gap-1 p-4 bg-white/5 overflow-x-auto">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                  index === currentSlide ? "bg-purple-500 scale-125" : "bg-gray-500 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="text-center py-2 text-gray-400 text-sm">
            Slide {currentSlide + 1} of {slides.length}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Download Full Presentation</Button>
      </div>
    </motion.div>
  )
}
