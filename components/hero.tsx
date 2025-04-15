"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Shield, Lock, Terminal, Code, ExternalLink } from "lucide-react"
import Link from "next/link"

const Hero = () => {
  const [typedText, setTypedText] = useState("")
  const fullText = "Master Cybersecurity Through Interactive Learning"
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [animatedElements, setAnimatedElements] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTypingComplete(true)

        // Start animating elements
        const elementsInterval = setInterval(() => {
          setAnimatedElements((prev) => {
            if (prev < 4) {
              return prev + 1
            } else {
              clearInterval(elementsInterval)
              return prev
            }
          })
        }, 300)
      }
    }, 70)

    return () => clearInterval(typingInterval)
  }, [])

  const scrollToContent = () => {
    if (containerRef.current) {
      const nextSection = containerRef.current.nextElementSibling
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="min-h-[90vh] flex flex-col justify-center items-center relative px-4 py-16 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/5 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Binary code background */}
      <div className="absolute inset-0 opacity-5 overflow-hidden select-none pointer-events-none">
        <div className="absolute top-0 left-0 text-[8px] font-mono text-green-500 whitespace-nowrap animate-slide-down">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i}>
              {Array.from({ length: 100 }).map((_, j) => (
                <span key={j}>{Math.round(Math.random())}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <div className="mb-6 inline-block relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-purple-600 rounded-lg blur opacity-75 animate-pulse"></div>
          <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold glitch font-mono" title="CipherHacker">
            &lt;CipherHacker/&gt;
          </h1>
        </div>

        <div className="h-8 mb-8">
          {typedText && (
            <p className="text-xl md:text-2xl text-green-400 font-mono">
              {typedText}
              {!isTypingComplete && <span className="blinking-cursor"></span>}
            </p>
          )}
        </div>

        <div className="mb-12 max-w-2xl mx-auto">
          <p className="text-gray-300">
            CipherHacker is a comprehensive cybersecurity learning platform designed to help students, enthusiasts, and
            professionals master essential security concepts through interactive games, visualizations, and challenges.
            Dive into the world of cryptography, explore data structures & algorithms, and develop practical hacking
            skills in a safe, educational environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div
            className={`hacker-card p-4 flex flex-col items-center text-center transition-all duration-500 ${animatedElements >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Lock className="h-10 w-10 text-green-400 mb-3" />
            <h3 className="text-green-400 font-bold mb-2">Cipher Games</h3>
            <p className="text-gray-400 text-sm mb-3">
              Master encryption techniques through interactive cipher challenges
            </p>
            <Link href="/ciphers" className="text-green-400 hover:text-green-300 text-sm font-mono flex items-center">
              Explore <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </div>

          <div
            className={`hacker-purple-card p-4 flex flex-col items-center text-center transition-all duration-500 ${animatedElements >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Shield className="h-10 w-10 text-purple-400 mb-3" />
            <h3 className="text-purple-400 font-bold mb-2">Cybersecurity</h3>
            <p className="text-gray-400 text-sm mb-3">Learn essential security concepts through interactive modules</p>
            <Link
              href="/cybersecurity"
              className="text-purple-400 hover:text-purple-300 text-sm font-mono flex items-center"
            >
              Explore <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </div>

          <div
            className={`hacker-card p-4 flex flex-col items-center text-center transition-all duration-500 ${animatedElements >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Code className="h-10 w-10 text-green-400 mb-3" />
            <h3 className="text-green-400 font-bold mb-2">DSA Visualizer</h3>
            <p className="text-gray-400 text-sm mb-3">Visualize algorithms and data structures in action</p>
            <Link href="/dsa" className="text-green-400 hover:text-green-300 text-sm font-mono flex items-center">
              Explore <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </div>

          <div
            className={`hacker-purple-card p-4 flex flex-col items-center text-center transition-all duration-500 ${animatedElements >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Terminal className="h-10 w-10 text-purple-400 mb-3" />
            <h3 className="text-purple-400 font-bold mb-2">Terminal</h3>
            <p className="text-gray-400 text-sm mb-3">Practice hacking skills in a simulated terminal environment</p>
            <Link
              href="/terminal"
              className="text-purple-400 hover:text-purple-300 text-sm font-mono flex items-center"
            >
              Explore <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>

        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <Button
            className="bg-green-600 hover:bg-green-700 text-black font-bold px-8 py-6 text-lg shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300"
            onClick={scrollToContent}
          >
            Start Learning
          </Button>

          <Button
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-950/30 hover:text-purple-300 px-8 py-6 text-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300"
            asChild
          >
            <Link href="/cybersecurity">View Modules</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-green-400 cursor-pointer" onClick={scrollToContent} />
      </div>
    </div>
  )
}

export default Hero
