"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm Dylans's AI assistant, interfaced with MCP. I can answer questions about his skills, contact information, and availability. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    // Show popup after 3 seconds if chat hasn't been opened
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPopup(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    // Hide popup when chat is opened
    if (isOpen) {
      setShowPopup(false)
    }
  }, [isOpen])

  const sampleQuestions = [
    "What are your proficiencies?",
    "How can I contact you?",
    "When are you available to work?",
    "What technologies do you use?",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Replace with your actual server endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content.trim(),
          context: "portfolio_assistant", // Add context for your AI model
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from server")
      }

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I'm sorry, I couldn't process that request.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      // Fallback response for demo purposes
      const fallbackResponse = getFallbackResponse(content.trim())

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Fallback responses for demo purposes
  const getFallbackResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("proficiencies") || lowerQuestion.includes("skills")) {
      return "Dylans's main proficiencies include:\n\n• Frontend: React, Next.js, TypeScript, Vue.js, Tailwind CSS\n• Backend: Node.js, Python, Express.js, FastAPI, GraphQL\n• Database: PostgreSQL, MongoDB, Redis, MySQL\n• DevOps: AWS, Docker, Kubernetes, Git\n\nHe has 5+ years of experience building scalable web applications and has completed 50+ projects."
    }

    if (lowerQuestion.includes("experience")) {
      return "Dylans has 5+ years of professional experience as a software engineer. He's currently a Senior Software Engineer at TechCorp Inc., where he leads development of microservices serving 1M+ users. Previously, he worked at StartupXYZ as a Full Stack Developer and at Digital Agency as a Frontend Developer."
    }

    if (lowerQuestion.includes("projects")) {
      return "Some of Dylans's notable projects include:\n\n• E-Commerce Platform - Full-stack solution with payment integration\n• Task Management App - Collaborative tool with real-time updates\n• Weather Analytics Dashboard - Data visualization with interactive charts\n• Social Media API - RESTful API with authentication and notifications\n\nYou can view more details in the Projects section above!"
    }

    if (lowerQuestion.includes("technologies") || lowerQuestion.includes("tech")) {
      return "Dylans works with modern technologies across the full stack:\n\n• Frontend frameworks like React and Vue.js\n• Backend technologies including Node.js and Python\n• Cloud platforms like AWS\n• Databases including PostgreSQL and MongoDB\n• DevOps tools like Docker and Kubernetes\n\nCheck out the Technologies section for the complete list!"
    }

    return "I'm currently having trouble connecting to the server, but I'd be happy to help you learn more about Dylans's experience and skills. Try asking about his proficiencies, experience, projects, or technologies!"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleSampleQuestion = (question: string) => {
    sendMessage(question)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* Popup Message */}
        {showPopup && (
          <div className="absolute bottom-16 right-0 mb-2 animate-in slide-in-from-bottom-2 duration-300">
            <div className="relative bg-white rounded-lg shadow-lg border p-3 max-w-xs">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-gray-400 hover:bg-gray-500 text-white rounded-full flex items-center justify-center text-xs transition-colors"
              >
                ×
              </button>
              <p className="text-sm text-gray-700 pr-2">
                👋 Hi! I'm Dylans's AI assistant powered by MCP. I can answer questions about his skills, and availability.
                Try asking me!
              </p>
              {/* Arrow pointing to chat button */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b transform rotate-45"></div>
            </div>
          </div>
        )}

        {/* Chat Button */}
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl transition-all duration-200 relative"
        >
          <MessageCircle className="h-6 w-6" />
          {/* Pulsing dot indicator */}
          {showPopup && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>}
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-2xl border-0">
        <CardHeader className="bg-orange-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-lg">Ask about Dylans</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-orange-700 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-80 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-orange-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                      message.sender === "user"
                        ? "bg-orange-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="bg-gray-100 text-gray-900 p-3 rounded-lg rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Sample Questions */}
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSampleQuestion(question)}
                  className="text-xs h-7 px-2"
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about Dylans..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" size="sm" disabled={isLoading || !inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
