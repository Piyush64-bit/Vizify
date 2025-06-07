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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const slides = [
  {
    id: 1,
    title: "Machine Learning in Healthcare",
    subtitle: "Transforming Patient Care Through AI",
    content:
      "A comprehensive overview of how artificial intelligence is revolutionizing healthcare delivery, diagnosis, and treatment outcomes across global healthcare systems.",
    icon: Heart,
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
    icon: Microscope,
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
    icon: Brain,
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: 4,
    title: "Diagnostic Accuracy Comparison",
    subtitle: "AI vs Traditional Methods",
    content:
      "Machine learning models achieve 94% accuracy in medical image diagnosis, compared to 87% for traditional methods. This represents a significant improvement in early disease detection and reduced false positives.",
    stats: [
      { label: "AI Accuracy", value: "94%", color: "text-green-400" },
      { label: "Traditional Methods", value: "87%", color: "text-yellow-400" },
      { label: "Improvement", value: "+7%", color: "text-purple-400" },
    ],
    icon: Stethoscope,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 5,
    title: "Patient Outcome Improvements",
    subtitle: "Measurable Healthcare Benefits",
    content:
      "Implementation of ML systems has led to significant improvements across multiple healthcare metrics, demonstrating clear value in patient care delivery.",
    metrics: [
      { label: "Reduced Readmission Rates", value: "23%", icon: Activity },
      { label: "Faster Diagnosis Time", value: "40%", icon: TrendingUp },
      { label: "Improved Treatment Accuracy", value: "31%", icon: Shield },
    ],
    icon: BarChart3,
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
    icon: Target,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 7,
    title: "Drug Discovery Acceleration",
    subtitle: "AI in Pharmaceutical Research",
    content:
      "Machine learning algorithms are revolutionizing drug discovery by predicting molecular behavior, identifying potential drug targets, and optimizing clinical trial design, reducing development time from 10-15 years to 5-7 years.",
    stats: [
      { label: "Time Reduction", value: "40%", color: "text-green-400" },
      { label: "Cost Savings", value: "$2.6B", color: "text-blue-400" },
      { label: "Success Rate", value: "+25%", color: "text-purple-400" },
    ],
    icon: Cpu,
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
    icon: TrendingUp,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 9,
    title: "Natural Language Processing",
    subtitle: "Extracting Insights from Clinical Data",
    content:
      "NLP systems process unstructured clinical notes, extracting valuable insights for diagnosis, treatment planning, and research. This technology improves documentation efficiency by 40% and reduces physician burnout.",
    metrics: [
      { label: "Documentation Efficiency", value: "40%", icon: Zap },
      { label: "Data Extraction Accuracy", value: "92%", icon: Database },
      { label: "Physician Time Saved", value: "2.5hrs", icon: Users },
    ],
    icon: Database,
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
    icon: Users,
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
    icon: AlertTriangle,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 12,
    title: "Data Quality & Standardization",
    subtitle: "Foundation for Successful AI Implementation",
    content:
      "High-quality, standardized data is crucial for ML success. Healthcare organizations must invest in data infrastructure, interoperability standards, and quality assurance processes to maximize AI potential.",
    stats: [
      { label: "Data Quality Impact", value: "85%", color: "text-green-400" },
      { label: "Standardization Need", value: "78%", color: "text-yellow-400" },
      { label: "Interoperability Gap", value: "45%", color: "text-red-400" },
    ],
    icon: Database,
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
    icon: Shield,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 14,
    title: "Global Implementation Status",
    subtitle: "Worldwide Adoption Patterns",
    content:
      "AI adoption in healthcare varies globally, with leading countries investing heavily in digital health infrastructure. The US, China, and EU lead in research and implementation, while developing nations face infrastructure challenges.",
    metrics: [
      { label: "US Market Share", value: "35%", icon: Globe },
      { label: "EU Investment", value: "€2.1B", icon: TrendingUp },
      { label: "Asia-Pacific Growth", value: "45%", icon: BarChart3 },
    ],
    icon: Globe,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 15,
    title: "Economic Impact",
    subtitle: "Financial Benefits and Cost Savings",
    content:
      "Healthcare AI is projected to save $150 billion annually by 2026 through improved efficiency, reduced errors, and better patient outcomes. ROI typically ranges from 200-400% within 3-5 years of implementation.",
    stats: [
      { label: "Annual Savings", value: "$150B", color: "text-green-400" },
      { label: "ROI Range", value: "200-400%", color: "text-blue-400" },
      { label: "Payback Period", value: "3-5 years", color: "text-purple-400" },
    ],
    icon: TrendingUp,
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
    icon: CheckCircle,
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
    icon: Zap,
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
    icon: Target,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: 19,
    title: "Conclusion",
    subtitle: "The Transformative Potential of Healthcare AI",
    content:
      "Machine learning represents a paradigm shift in healthcare delivery, offering unprecedented opportunities to improve patient outcomes, reduce costs, and enhance clinical decision-making. Success requires thoughtful implementation, ethical considerations, and collaborative approaches.",
    future:
      "The future of healthcare lies in seamless AI integration, personalized medicine, and improved patient outcomes through intelligent automation and human-AI collaboration.",
    icon: Heart,
    gradient: "from-pink-500 to-red-500",
  },
  {
    id: 20,
    title: "Thank You",
    subtitle: "Questions & Discussion",
    content:
      "This comprehensive analysis demonstrates the transformative potential of machine learning in healthcare. The evidence supports continued investment in AI technologies while addressing implementation challenges through collaborative, ethical approaches.",
    contact: {
      email: "research@researchai.com",
      website: "www.researchai.com",
      twitter: "@ResearchAI",
    },
    icon: Users,
    gradient: "from-purple-500 to-pink-500",
  },
]

export default function MLPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const CurrentIcon = slides[currentSlide].icon

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
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
                className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} p-8 md:p-12 flex flex-col justify-center`}
              >
                <div className="max-w-4xl mx-auto text-center text-white">
                  <div className="mb-6">
                    {CurrentIcon && <CurrentIcon className="w-16 h-16 mx-auto mb-4 opacity-80" />}
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{slides[currentSlide].title}</h2>

                  <h3 className="text-xl md:text-2xl font-medium mb-8 opacity-90">{slides[currentSlide].subtitle}</h3>

                  {/* Content based on slide type */}
                  {Array.isArray(slides[currentSlide].content) ? (
                    <div className="space-y-3 text-left max-w-2xl mx-auto">
                      {slides[currentSlide].content.map((item, index) => (
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
                      {slides[currentSlide].content}
                    </p>
                  )}

                  {/* Stats for diagnostic slide */}
                  {slides[currentSlide].stats && (
                    <div className="grid grid-cols-3 gap-6 mt-8 max-w-2xl mx-auto">
                      {slides[currentSlide].stats.map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="text-center"
                        >
                          <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                          <div className="text-sm opacity-80 mt-1">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Metrics for outcomes slide */}
                  {slides[currentSlide].metrics && (
                    <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
                      {slides[currentSlide].metrics.map((metric, index) => {
                        const MetricIcon = metric.icon
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="bg-white/10 rounded-lg p-6 text-center backdrop-blur-sm"
                          >
                            <MetricIcon className="w-8 h-8 mx-auto mb-3" />
                            <div className="text-2xl font-bold text-green-300 mb-2">{metric.value}</div>
                            <div className="text-sm opacity-90">{metric.label}</div>
                          </motion.div>
                        )
                      })}
                    </div>
                  )}

                  {/* Future section */}
                  {slides[currentSlide].future && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm max-w-3xl mx-auto"
                    >
                      <h4 className="text-xl font-semibold mb-3">The Future</h4>
                      <p className="text-lg opacity-90">{slides[currentSlide].future}</p>
                    </motion.div>
                  )}

                  {/* Contact section for last slide */}
                  {slides[currentSlide].contact && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm max-w-2xl mx-auto"
                    >
                      <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
                      <div className="space-y-2 text-lg">
                        <p>📧 {slides[currentSlide].contact.email}</p>
                        <p>🌐 {slides[currentSlide].contact.website}</p>
                        <p>🐦 {slides[currentSlide].contact.twitter}</p>
                      </div>
                    </motion.div>
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
