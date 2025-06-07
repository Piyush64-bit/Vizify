"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit3, Save, Eye, Plus, Trash2, Copy, Palette, Type, Download, Undo, Redo } from "lucide-react"

interface SlideData {
  id: number
  title: string
  subtitle: string
  content: string | string[]
  gradient: string
  icon: string
}

interface PresentationEditorProps {
  slides: SlideData[]
  onSlidesChange: (slides: SlideData[]) => void
  onViewModeChange: (mode: "edit" | "view") => void
  currentMode: "edit" | "view"
}

export default function PresentationEditor({
  slides,
  onSlidesChange,
  onViewModeChange,
  currentMode,
}: PresentationEditorProps) {
  const [selectedSlide, setSelectedSlide] = useState(0)
  const [editingSlide, setEditingSlide] = useState<SlideData | null>(null)
  const [history, setHistory] = useState<SlideData[][]>([slides])
  const [historyIndex, setHistoryIndex] = useState(0)

  const gradientOptions = [
    "from-red-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-indigo-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-teal-500 to-blue-500",
    "from-indigo-500 to-purple-500",
    "from-cyan-500 to-teal-500",
    "from-pink-500 to-rose-500",
    "from-violet-500 to-purple-500",
  ]

  const saveToHistory = (newSlides: SlideData[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...newSlides])
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      onSlidesChange(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      onSlidesChange(history[historyIndex + 1])
    }
  }

  const startEditing = (slide: SlideData) => {
    setEditingSlide({ ...slide })
  }

  const saveSlide = () => {
    if (!editingSlide) return

    const newSlides = slides.map((slide) => (slide.id === editingSlide.id ? editingSlide : slide))

    saveToHistory(newSlides)
    onSlidesChange(newSlides)
    setEditingSlide(null)
  }

  const cancelEdit = () => {
    setEditingSlide(null)
  }

  const addSlide = () => {
    const newSlide: SlideData = {
      id: Math.max(...slides.map((s) => s.id)) + 1,
      title: "New Slide",
      subtitle: "Subtitle",
      content: "Add your content here...",
      gradient: gradientOptions[Math.floor(Math.random() * gradientOptions.length)],
      icon: "Brain",
    }

    const newSlides = [...slides, newSlide]
    saveToHistory(newSlides)
    onSlidesChange(newSlides)
    setSelectedSlide(newSlides.length - 1)
  }

  const deleteSlide = (slideId: number) => {
    if (slides.length <= 1) return

    const newSlides = slides.filter((slide) => slide.id !== slideId)
    saveToHistory(newSlides)
    onSlidesChange(newSlides)

    if (selectedSlide >= newSlides.length) {
      setSelectedSlide(newSlides.length - 1)
    }
  }

  const duplicateSlide = (slide: SlideData) => {
    const newSlide: SlideData = {
      ...slide,
      id: Math.max(...slides.map((s) => s.id)) + 1,
      title: `${slide.title} (Copy)`,
    }

    const slideIndex = slides.findIndex((s) => s.id === slide.id)
    const newSlides = [...slides.slice(0, slideIndex + 1), newSlide, ...slides.slice(slideIndex + 1)]

    saveToHistory(newSlides)
    onSlidesChange(newSlides)
  }

  const moveSlide = (fromIndex: number, toIndex: number) => {
    const newSlides = [...slides]
    const [movedSlide] = newSlides.splice(fromIndex, 1)
    newSlides.splice(toIndex, 0, movedSlide)

    saveToHistory(newSlides)
    onSlidesChange(newSlides)
    setSelectedSlide(toIndex)
  }

  const updateSlideGradient = (gradient: string) => {
    if (!editingSlide) return
    setEditingSlide({ ...editingSlide, gradient })
  }

  const exportPresentation = () => {
    const dataStr = JSON.stringify(slides, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "presentation.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Editor Header */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-purple-400" />
              Presentation Editor
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={historyIndex <= 0}
                className="text-white border-purple-500 hover:bg-purple-500/20"
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="text-white border-purple-500 hover:bg-purple-500/20"
              >
                <Redo className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewModeChange(currentMode === "edit" ? "view" : "edit")}
                className="text-white border-purple-500 hover:bg-purple-500/20"
              >
                {currentMode === "edit" ? <Eye className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                {currentMode === "edit" ? "Preview" : "Edit"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportPresentation}
                className="text-white border-purple-500 hover:bg-purple-500/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Slide List */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-sm">Slides ({slides.length})</CardTitle>
              <Button size="sm" onClick={addSlide} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 max-h-96 overflow-y-auto">
            {slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedSlide === index
                    ? "border-purple-500 bg-purple-500/20"
                    : "border-white/10 bg-white/5 hover:border-purple-500/50"
                }`}
                onClick={() => setSelectedSlide(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {index + 1}. {slide.title}
                    </p>
                    <p className="text-gray-400 text-xs truncate">{slide.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        startEditing(slide)
                      }}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        duplicateSlide(slide)
                      }}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteSlide(slide.id)
                      }}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                      disabled={slides.length <= 1}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Editor Panel */}
        <div className="lg:col-span-3">
          {editingSlide ? (
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Edit Slide {editingSlide.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-white/5">
                    <TabsTrigger value="content" className="data-[state=active]:bg-purple-600">
                      <Type className="w-4 h-4 mr-2" />
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="design" className="data-[state=active]:bg-purple-600">
                      <Palette className="w-4 h-4 mr-2" />
                      Design
                    </TabsTrigger>
                    <TabsTrigger value="media" className="data-[state=active]:bg-purple-600">
                      <Image className="w-4 h-4 mr-2" />
                      Media
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-white">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={editingSlide.title}
                        onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subtitle" className="text-white">
                        Subtitle
                      </Label>
                      <Input
                        id="subtitle"
                        value={editingSlide.subtitle}
                        onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content" className="text-white">
                        Content
                      </Label>
                      <Textarea
                        id="content"
                        value={
                          Array.isArray(editingSlide.content) ? editingSlide.content.join("\n") : editingSlide.content
                        }
                        onChange={(e) =>
                          setEditingSlide({
                            ...editingSlide,
                            content: e.target.value.includes("\n") ? e.target.value.split("\n") : e.target.value,
                          })
                        }
                        className="bg-white/5 border-white/10 text-white min-h-32"
                        placeholder="Enter content (use new lines for bullet points)"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="design" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label className="text-white">Background Gradient</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {gradientOptions.map((gradient, index) => (
                          <button
                            key={index}
                            onClick={() => updateSlideGradient(gradient)}
                            className={`h-12 rounded-lg bg-gradient-to-r ${gradient} border-2 transition-all ${
                              editingSlide.gradient === gradient
                                ? "border-white"
                                : "border-transparent hover:border-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-4 mt-4">
                    <div className="text-center text-gray-400 py-8">
                      <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Media upload functionality</p>
                      <p className="text-sm">Coming soon...</p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10">
                  <Button onClick={saveSlide} className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button onClick={cancelEdit} variant="outline" className="text-white border-white/20">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center text-gray-400">
                  <Edit3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Select a slide to edit</p>
                  <p className="text-sm">Choose a slide from the list to start editing</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
