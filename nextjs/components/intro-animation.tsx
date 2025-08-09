"use client"

import { useState, useEffect } from "react"

interface IntroAnimationProps {
  onComplete: () => void
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [particles, setParticles] = useState<Particle[]>([])

  // Generate particles
  useEffect(() => {
    const colors = ["bg-orange-300", "bg-red-300", "bg-pink-300", "bg-amber-300", "bg-yellow-300", "bg-rose-300"]

    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4, // 4-12px
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 10 + 8, // 8-18s
      delay: Math.random() * 2, // 0-2s delay
    }))

    setParticles(newParticles)
  }, [])

  useEffect(() => {
    const steps = [
      { delay: 500, step: 1 }, // Show name
      { delay: 2000, step: 2 }, // Show title
      { delay: 4000, step: 3 }, // Start fade out
      { delay: 4700, step: 4 }, // Complete
    ]

    const timers = steps.map(({ delay, step }) =>
      setTimeout(() => {
        if (step === 4) {
          setIsVisible(false)
          setTimeout(onComplete, 500) // Wait for fade out
        } else {
          setCurrentStep(step)
        }
      }, delay),
    )

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex items-center justify-center transition-opacity duration-500 overflow-hidden ${
        currentStep === 3 ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full ${particle.color} opacity-30 animate-float`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Additional Larger Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`large-${i}`}
            className="absolute rounded-full bg-white opacity-10 animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 15}px`,
              height: `${Math.random() * 20 + 15}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Name Animation */}
        <div
          className={`transform transition-all duration-1000 ease-out ${
            currentStep >= 1 ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
          }`}
        >
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-4 tracking-wide drop-shadow-lg">
            {"Dylan Butz".split("").map((char, index) => (
              <span
                key={index}
                className="inline-block animate-pulse"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: "1s",
                  animationFillMode: "both",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Title Animation */}
        <div
          className={`transform transition-all duration-1000 ease-out delay-300 ${
            currentStep >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-xl sm:text-2xl text-orange-100 font-light tracking-wider drop-shadow-md">
            Software Engineering Student
          </p>
        </div>

        {/* Animated Line */}
        <div
          className={`mx-auto mt-8 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-1000 ease-out ${
            currentStep >= 2 ? "w-32 opacity-60" : "w-0 opacity-0"
          }`}
        />

        {/* Loading Dots */}
        <div
          className={`flex justify-center space-x-2 mt-8 transition-opacity duration-500 ${
            currentStep >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-bounce drop-shadow-sm"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white rounded-full animate-spin-slow" />
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 border border-white rounded-full animate-spin-slow"
          style={{ animationDirection: "reverse" }}
        />
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-white rounded-full animate-spin-slow" />
      </div>
    </div>
  )
}
