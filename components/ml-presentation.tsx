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
  {
    id: 4,
    title: "Diagnostic Accuracy Comparison",
    subtitle: "AI vs Traditional Methods",
    content:
      "Machine learning models achieve 94% accuracy in medical image diagnosis, compared to 87% for traditional methods. This represents a significant improvement in early disease detection and reduced false positives.",
    icon: "Stethoscope",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 5,
    title: "Patient Outcome Improvements",
    subtitle: "Measurable Healthcare Benefits",
    content:
      "Implementation of ML systems has led to significant improvements across multiple healthcare metrics, demonstrating clear value in patient care delivery.",
    icon: "BarChart3",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: 6,
    title: "Medical Imaging Revolution",
    subtitle: "AI-Powered Diagnostic Imaging",
    content: [
      "Radiology: 95% accuracy in detecting lung cancer",
      "Ophthalmology: Early diabetic retinopathy detection",
      "Cardiology: Automated ECG interpretation",
      "Pathology: Digital slide analysis and tumor detection",
      "Dermatology: Skin cancer classification systems",
    ],
    icon: "Target",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 7,
    title: "Drug Discovery Acceleration",
    subtitle: "AI in Pharmaceutical Research",
    content:
      "Machine learning algorithms are revolutionizing drug discovery by predicting molecular behavior, identifying potential drug targets, and optimizing clinical trial design, reducing development time from 10-15 years to 5-7 years.",
    icon: "Cpu",
    gradient: "from-teal-500 to-blue-500",
  },
  {
    id: 8,
    title: "Predictive Analytics",
    subtitle: "Anticipating Patient Needs",
    content: [
      "Early warning systems for patient deterioration",
      "Sepsis prediction models (6-hour advance warning)",
      "Hospital readmission risk assessment",
      "ICU length of stay optimization",
      "Medication adherence prediction",
      "Epidemic outbreak modeling and response",
    ],
    icon: "TrendingUp",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 9,
    title: "Natural Language Processing",
    subtitle: "Extracting Insights from Clinical Data",
    content:
      "NLP systems process unstructured clinical notes, extracting valuable insights for diagnosis, treatment planning, and research. This technology improves documentation efficiency by 40% and reduces physician burnout.",
    icon: "Database",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    id: 10,
    title: "Personalized Medicine",
    subtitle: "Tailored Treatment Approaches",
    content: [
      "Genomic analysis for targeted therapies",
      "Pharmacogenomics for drug selection",
      "Precision oncology treatment plans",
      "Individualized dosing recommendations",
      "Risk stratification based on genetic markers",
    ],
    icon: "Users",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 11,
    title: "Implementation Challenges",
    subtitle: "Barriers to Widespread Adoption",
    content: [
      "Data Privacy & Security Concerns (HIPAA compliance)",
      "Regulatory Approval Processes (FDA guidelines)",
      "Integration with Existing Healthcare Systems",
      "Training Healthcare Professionals on AI tools",
      "Ensuring Algorithmic Fairness and Bias Mitigation",
      "Cost-benefit Analysis and ROI demonstration",
    ],
    icon: "AlertTriangle",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 12,
    title: "Data Quality & Standardization",
    subtitle: "Foundation for Successful AI Implementation",
    content:
      "High-quality, standardized data is crucial for ML success. Healthcare organizations must invest in data infrastructure, interoperability standards, and quality assurance processes to maximize AI potential.",
    icon: "Database",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: 13,
    title: "Ethical Considerations",
    subtitle: "Responsible AI in Healthcare",
    content: [
      "Patient consent and data ownership rights",
      "Algorithmic transparency and explainability",
      "Bias detection and mitigation strategies",
      "Equity in AI-driven healthcare access",
      "Professional liability and accountability",
      "Long-term societal impact assessment",
    ],
    icon: "Shield",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 14,
    title: "Global Implementation Status",
    subtitle: "Worldwide Adoption Patterns",
    content:
      "AI adoption in healthcare varies globally, with leading countries investing heavily in digital health infrastructure. The US, China, and EU lead in research and implementation, while developing nations face infrastructure challenges.",
    icon: "Globe",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 15,
    title: "Economic Impact",
    subtitle: "Financial Benefits and Cost Savings",
    content:
      "Healthcare AI is projected to save $150 billion annually by 2026 through improved efficiency, reduced errors, and better patient outcomes. ROI typically ranges from 200-400% within 3-5 years of implementation.",
    icon: "TrendingUp",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 16,
    title: "Success Stories",
    subtitle: "Real-World Implementation Examples",
    content: [
      "Google DeepMind: 50+ eye diseases detection",
      "IBM Watson: Oncology treatment recommendations",
      "PathAI: Pathology diagnosis accuracy improvement",
      "Zebra Medical: Radiology screening automation",
      "Tempus: Precision medicine platform",
    ],
    icon: "CheckCircle",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    id: 17,
    title: "Future Trends & Innovations",
    subtitle: "Next Generation Healthcare AI",
    content: [
      "Quantum computing for drug discovery",
      "Edge AI for real-time patient monitoring",
      "Federated learning for privacy-preserving research",
      "Digital twins for personalized treatment simulation",
      "Brain-computer interfaces for neurological disorders",
      "AI-powered robotic surgery advancement",
    ],
    icon: "Zap",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: 18,
    title: "Recommendations",
    subtitle: "Strategic Implementation Guidelines",
    content: [
      "Invest in robust data infrastructure and governance",
      "Develop comprehensive AI ethics frameworks",
      "Create interdisciplinary teams (clinicians + data scientists)",
      "Implement gradual, pilot-based deployment strategies",
      "Establish continuous monitoring and evaluation systems",
      "Foster collaboration between academia and industry",
    ],
    icon: "Target",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: 19,
    title: "Conclusion",
    subtitle: "The Transformative Potential of Healthcare AI",
    content:
      "Machine learning represents a paradigm shift in healthcare delivery, offering unprecedented opportunities to improve patient outcomes, reduce costs, and enhance clinical decision-making. Success requires thoughtful implementation, ethical considerations, and collaborative approaches.",
    icon: "Heart",
    gradient: "from-pink-500 to-red-500",
  },
  {
    id: 20,
    title: "Thank You",
    subtitle: "Questions & Discussion",
    content:
      "This comprehensive analysis demonstrates the transformative potential of machine learning in healthcare. The evidence supports continued investment in AI technologies while addressing implementation challenges through collaborative, ethical approaches.",
    icon: "Users",
    gradient: "from-purple-500 to-pink-500",
  },
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
