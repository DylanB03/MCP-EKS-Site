"use client"

import { useState } from "react"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Technologies } from "@/components/technologies"
import { Education } from "@/components/education"
import { Certifications } from "@/components/certifications"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { Chatbot } from "@/components/chatbot"
import { IntroAnimation } from "@/components/intro-animation"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <main
        className={`min-h-screen bg-white transition-opacity duration-500 ${showIntro ? "opacity-0" : "opacity-100"}`}
      >
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Technologies />
        <Education />
        <Certifications />
        <Contact />
        <Chatbot />
      </main>
    </>
  )
}
