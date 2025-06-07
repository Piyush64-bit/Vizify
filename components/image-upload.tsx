"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Camera, Upload, X } from "lucide-react"

interface ImageUploadProps {
  onImageChange: (imageUrl: string | null) => void
  currentImage?: string | null
  className?: string
  size?: "sm" | "md" | "lg"
  shape?: "circle" | "square"
  placeholder?: string
  showRemoveButton?: boolean
  clickable?: boolean
}

export default function ImageUpload({
  onImageChange,
  currentImage,
  className = "",
  size = "lg",
  shape = "circle",
  placeholder = "Upload Image",
  showRemoveButton = true,
  clickable = true,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
  }

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg",
  }

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file")
      return false
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB")
      return false
    }

    setError(null)
    return true
  }

  const processFile = useCallback(
    (file: File) => {
      if (!validateFile(file)) return

      setIsUploading(true)
      setError(null)

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onImageChange(result)
        setIsUploading(false)
      }
      reader.onerror = () => {
        setError("Failed to read file")
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    },
    [onImageChange],
  )

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processFile(file)
    }
    // Reset input value to allow selecting the same file again
    event.target.value = ""
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const files = e.dataTransfer.files
      if (files && files[0]) {
        processFile(files[0])
      }
    },
    [processFile],
  )

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onImageChange(null)
    setError(null)
  }

  const isDefaultImage = currentImage?.startsWith("http") || currentImage?.startsWith("/images/")
  const showPlaceholder = !currentImage || (!currentImage.startsWith("data:") && !isDefaultImage)

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          ${sizeClasses[size]} 
          ${shapeClasses[shape]}
          bg-gradient-to-r from-purple-600 to-pink-600 
          flex items-center justify-center 
          overflow-hidden 
          relative 
          group 
          transition-all 
          duration-300 
          ${clickable ? "cursor-pointer" : ""}
          ${dragActive ? "scale-105 shadow-lg shadow-purple-500/50" : ""}
          ${shape === "circle" ? "p-1" : "p-2"}
        `}
        onDragEnter={clickable ? handleDrag : undefined}
        onDragLeave={clickable ? handleDrag : undefined}
        onDragOver={clickable ? handleDrag : undefined}
        onDrop={clickable ? handleDrop : undefined}
      >
        <div className={`w-full h-full bg-black ${shapeClasses[shape]} overflow-hidden relative`}>
          {currentImage && !showPlaceholder ? (
            <img
              src={currentImage || "/placeholder.svg"}
              alt="Profile image"
              className="w-full h-full object-cover"
              onError={() => {
                setError("Failed to load image")
                onImageChange(null)
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 flex flex-col items-center justify-center text-white">
              {size === "lg" ? (
                <>
                  <span className="text-6xl font-bold text-white mb-2">SG</span>
                  {clickable && (
                    <div className="text-xs text-white/70 text-center px-4">
                      <Upload className="w-4 h-4 mx-auto mb-1" />
                      <p>Drop image here</p>
                      <p>or click to upload</p>
                    </div>
                  )}
                </>
              ) : (
                <span className="text-2xl font-bold text-white">SG</span>
              )}
            </div>
          )}

          {/* Upload overlay - only show if clickable */}
          {clickable && (
            <div
              className={`absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ${shapeClasses[shape]}`}
            >
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <input id="image-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </label>
            </div>
          )}

          {/* Loading state */}
          {isUploading && (
            <div className={`absolute inset-0 bg-black/50 flex items-center justify-center ${shapeClasses[shape]}`}>
              <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full"></div>
            </div>
          )}

          {/* Drag active overlay */}
          {dragActive && clickable && (
            <div
              className={`absolute inset-0 bg-purple-500/30 flex items-center justify-center ${shapeClasses[shape]} border-2 border-dashed border-white`}
            >
              <div className="text-white text-center">
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Drop your image here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Remove button - only show for uploaded images, not default images */}
      {currentImage && !isDefaultImage && showRemoveButton && (
        <button
          onClick={removeImage}
          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors z-10"
          title="Remove image"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm text-center"
        >
          {error}
        </motion.div>
      )}
    </div>
  )
}
