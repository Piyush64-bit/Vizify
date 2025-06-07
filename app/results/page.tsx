"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Presentation, Headphones, Video, Brain, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MLPresentation from "@/components/ml-presentation"
import AudioPlayer from "@/components/audio-player"
import VideoPlayer from "@/components/video-player"

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("analysis")

  const results = {
    analysis: {
      title: "Smart Paper Analysis",
      summary: "Machine Learning in Healthcare: A Comprehensive Review",
      keyFindings: [
        "ML algorithms show 94% accuracy in medical image diagnosis",
        "Predictive models reduce hospital readmission rates by 23%",
        "Natural language processing improves clinical documentation efficiency by 40%",
        "Deep learning models outperform traditional methods in drug discovery",
      ],
      methodology: "Systematic review of 150+ peer-reviewed papers from 2020-2024",
      implications: "Significant potential for ML to transform healthcare delivery and patient outcomes",
    },
    insights: [
      "Cross-validation with multiple datasets shows consistent performance",
      "Ethical considerations around data privacy are paramount",
      "Integration with existing healthcare systems remains a challenge",
      "Regulatory approval processes need adaptation for AI-driven solutions",
    ],
  }

  // Sample audio for podcast
  const sampleAudio = "https://cdn.freesound.org/previews/686/686675_14796221-lq.mp3"

  // Sample video for visual summary
  const sampleVideo =
    "https://cdn.videvo.net/videvo_files/video/premium/video0042/small_watermarked/900-2_900-6334-PD2_preview.mp4"

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Content Is
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> Ready!</span>
          </h1>
          <p className="text-gray-400 text-xl">AI has transformed your research into multiple engaging formats</p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-white/5 mb-8">
            <TabsTrigger value="analysis" className="data-[state=active]:bg-purple-600">
              <Brain className="w-4 h-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="presentation" className="data-[state=active]:bg-purple-600">
              <Presentation className="w-4 h-4 mr-2" />
              Slides
            </TabsTrigger>
            <TabsTrigger value="podcast" className="data-[state=active]:bg-purple-600">
              <Headphones className="w-4 h-4 mr-2" />
              Podcast
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-purple-600">
              <Video className="w-4 h-4 mr-2" />
              Video
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-purple-600">
              <FileText className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="download" className="data-[state=active]:bg-purple-600">
              <Download className="w-4 h-4 mr-2" />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analysis">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    Smart Paper Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Summary</h3>
                    <p className="text-gray-300">{results.analysis.summary}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Key Findings</h3>
                    <ul className="space-y-2">
                      {results.analysis.keyFindings.map((finding, index) => (
                        <li key={index} className="text-gray-300 flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Methodology</h3>
                    <p className="text-gray-300">{results.analysis.methodology}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Implications</h3>
                    <p className="text-gray-300">{results.analysis.implications}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="presentation">
            <MLPresentation />
          </TabsContent>

          <TabsContent value="podcast">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-purple-400" />
                    Generated Podcast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AudioPlayer title="ML in Healthcare: Research Insights" duration="15:32" audioSrc={sampleAudio} />
                  <div className="mt-4 text-gray-300 text-sm">
                    <p className="mb-2">
                      <strong>Episode Description:</strong> This AI-generated podcast explores the transformative
                      potential of machine learning in healthcare settings, covering diagnostic accuracy, predictive
                      analytics, and ethical considerations.
                    </p>
                    <p>
                      <strong>Topics covered:</strong> Medical imaging analysis, predictive patient outcomes, natural
                      language processing for clinical documentation, and integration challenges.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="video">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Video className="w-5 h-5 text-purple-400" />
                    Visual Summary Video
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <VideoPlayer title="Machine Learning in Healthcare" duration="8:45" videoSrc={sampleVideo} />
                  <div className="mt-4 text-gray-300 text-sm">
                    <p className="mb-2">
                      <strong>Video Description:</strong> This animated explainer breaks down complex machine learning
                      concepts in healthcare for general audiences, visualizing key statistics and findings.
                    </p>
                    <p>
                      <strong>Visual elements:</strong> Data visualizations, animated medical scenarios, comparison
                      charts, and expert interview segments.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="insights">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    Intelligent Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.insights.map((insight, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-gray-300">{insight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="download">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Download className="w-5 h-5 text-purple-400" />
                    Export Your Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-16 text-white border-purple-500 hover:bg-purple-500/20">
                      <FileText className="w-5 h-5 mr-2" />
                      Download Analysis (PDF)
                    </Button>
                    <Button variant="outline" className="h-16 text-white border-purple-500 hover:bg-purple-500/20">
                      <Presentation className="w-5 h-5 mr-2" />
                      Download Slides (PPTX)
                    </Button>
                    <Button variant="outline" className="h-16 text-white border-purple-500 hover:bg-purple-500/20">
                      <Headphones className="w-5 h-5 mr-2" />
                      Download Podcast (MP3)
                    </Button>
                    <Button variant="outline" className="h-16 text-white border-purple-500 hover:bg-purple-500/20">
                      <Video className="w-5 h-5 mr-2" />
                      Download Video (MP4)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
