"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AudioPlayerProps {
  title: string
  duration: string
  audioSrc: string
}

export default function AudioPlayer({ title, duration, audioSrc }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration_, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.75)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const audioRef = useRef<HTMLAudioElement>(null)

  // Generate synthetic audio using Web Audio API
  useEffect(() => {
    const generateSyntheticAudio = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const sampleRate = audioContext.sampleRate
        const durationInSeconds = 15 * 60 + 32 // 15:32
        const frameCount = sampleRate * durationInSeconds

        const audioBuffer = audioContext.createBuffer(1, frameCount, sampleRate)
        const channelData = audioBuffer.getChannelData(0)

        // Generate a simple synthetic speech-like audio pattern
        for (let i = 0; i < frameCount; i++) {
          const time = i / sampleRate
          // Create speech-like patterns with varying frequencies
          const baseFreq = 150 + Math.sin(time * 0.5) * 50 // Voice fundamental frequency
          const harmonics =
            Math.sin(time * baseFreq * 2 * Math.PI) * 0.3 +
            Math.sin(time * baseFreq * 3 * 2 * Math.PI) * 0.2 +
            Math.sin(time * baseFreq * 4 * 2 * Math.PI) * 0.1

          // Add speech-like modulation
          const modulation = Math.sin(time * 8) * 0.5 + 0.5
          const envelope = Math.sin(time * 0.1) * 0.3 + 0.7

          channelData[i] = harmonics * modulation * envelope * 0.1
        }

        // Create a blob URL from the audio buffer
        const offlineContext = new OfflineAudioContext(1, frameCount, sampleRate)
        const source = offlineContext.createBufferSource()
        source.buffer = audioBuffer
        source.connect(offlineContext.destination)
        source.start()

        offlineContext.startRendering().then((renderedBuffer) => {
          // Convert to WAV blob
          const wav = audioBufferToWav(renderedBuffer)
          const blob = new Blob([wav], { type: "audio/wav" })
          const url = URL.createObjectURL(blob)

          if (audioRef.current) {
            audioRef.current.src = url
            setIsLoading(false)
          }
        })
      } catch (err) {
        console.error("Error generating audio:", err)
        setError("Audio generation failed")
        setIsLoading(false)
      }
    }

    generateSyntheticAudio()
  }, [])

  // Convert AudioBuffer to WAV
  const audioBufferToWav = (buffer: AudioBuffer) => {
    const length = buffer.length
    const arrayBuffer = new ArrayBuffer(44 + length * 2)
    const view = new DataView(arrayBuffer)
    const channels = buffer.numberOfChannels
    const sampleRate = buffer.sampleRate

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i))
      }
    }

    writeString(0, "RIFF")
    view.setUint32(4, 36 + length * 2, true)
    writeString(8, "WAVE")
    writeString(12, "fmt ")
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, channels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * 2, true)
    view.setUint16(32, 2, true)
    view.setUint16(34, 16, true)
    writeString(36, "data")
    view.setUint32(40, length * 2, true)

    // Convert float samples to 16-bit PCM
    const channelData = buffer.getChannelData(0)
    let offset = 44
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]))
      view.setInt16(offset, sample * 0x7fff, true)
      offset += 2
    }

    return arrayBuffer
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleError = () => {
      setError("Failed to load audio")
      setIsLoading(false)
    }

    // Events
    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)
    audio.addEventListener("ended", () => setIsPlaying(false))
    audio.addEventListener("error", handleError)

    // Set initial volume
    audio.volume = volume

    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
      audio.removeEventListener("ended", () => setIsPlaying(false))
      audio.removeEventListener("error", handleError)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (isLoading || error) return

    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume
    }
  }

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60)
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
      const seconds = Math.floor(time % 60)
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
      return `${formatMinutes}:${formatSeconds}`
    }
    return "00:00"
  }

  const restart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      if (!isPlaying) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const forward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration_)
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const downloadAudio = () => {
    if (audioRef.current && audioRef.current.src) {
      const link = document.createElement("a")
      link.href = audioRef.current.src
      link.download = `${title}.wav`
      link.click()
    }
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-6">
        <div className="text-center text-red-400">
          <p>Error loading audio: {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-2">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-6">
      <audio ref={audioRef} preload="metadata" />
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-gray-400">{duration}</p>
          </div>
          <Button
            onClick={downloadAudio}
            variant="outline"
            size="sm"
            className="text-white border-purple-500 hover:bg-purple-500/20"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-400">
            <div className="animate-spin w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p>Generating AI podcast audio...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400 w-12 text-right">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration_ || 100}
                step={1}
                onValueChange={handleTimeChange}
                className="flex-1"
              />
              <span className="text-xs text-gray-400 w-12">{formatTime(duration_)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={restart} className="text-white hover:text-purple-400">
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button
                  onClick={togglePlay}
                  size="icon"
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full h-12 w-12 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={forward} className="text-white hover:text-purple-400">
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center space-x-2 w-32">
                <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:text-purple-400">
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="flex-1"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
