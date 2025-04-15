"use client"

import { useState, useEffect } from "react"
import { MessageSquare } from "lucide-react"

const HackerAvatar = () => {
  const [blinking, setBlinking] = useState(false)
  const [quote, setQuote] = useState("")

  const securityQuotes = [
    "Security is a process, not a product.",
    "The only secure system is one that is powered off.",
    "Encryption works. Properly implemented strong crypto systems are one of the few things that you can rely on.",
    "Privacy is not something that I'm merely entitled to, it's an absolute prerequisite.",
    "If you think technology can solve your security problems, then you don't understand the problems and you don't understand the technology.",
    "Security is always excessive until it's not enough.",
    "The weakest link in the security chain is the human element.",
  ]

  useEffect(() => {
    // Set initial quote
    setQuote(securityQuotes[Math.floor(Math.random() * securityQuotes.length)])

    // Blink eyes randomly
    const blinkInterval = setInterval(
      () => {
        setBlinking(true)
        setTimeout(() => setBlinking(false), 200)
      },
      Math.random() * 3000 + 2000,
    )

    // Change quote periodically
    const quoteInterval = setInterval(() => {
      setQuote((prevQuote) => {
        let newQuote = prevQuote
        while (newQuote === prevQuote) {
          newQuote = securityQuotes[Math.floor(Math.random() * securityQuotes.length)]
        }
        return newQuote
      })
    }, 10000)

    return () => {
      clearInterval(blinkInterval)
      clearInterval(quoteInterval)
    }
  }, []) // Empty dependency array

  return (
    <div className="hacker-card p-6 h-full">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 relative mb-6">
          {/* CSS-only hacker avatar */}
          <div className="absolute w-32 h-32 rounded-full bg-gray-800 border-2 border-green-500"></div>

          {/* Face */}
          <div className="absolute w-24 h-24 rounded-full bg-gray-900 top-4 left-4"></div>

          {/* Eyes */}
          <div className="absolute w-6 h-8 bg-gray-900 rounded-full top-12 left-10 flex justify-center items-center">
            <div className={`w-4 h-${blinking ? "1" : "4"} bg-green-400 rounded-full avatar-eye`}></div>
          </div>
          <div className="absolute w-6 h-8 bg-gray-900 rounded-full top-12 right-10 flex justify-center items-center">
            <div className={`w-4 h-${blinking ? "1" : "4"} bg-green-400 rounded-full avatar-eye`}></div>
          </div>

          {/* Mouth */}
          <div className="absolute w-12 h-1 bg-green-400 rounded-full top-22 left-10"></div>

          {/* Headphones */}
          <div className="absolute w-36 h-6 bg-gray-700 rounded-full top-6 left-[-2px]"></div>
          <div className="absolute w-4 h-8 bg-gray-700 rounded-full top-12 left-[-2px]"></div>
          <div className="absolute w-4 h-8 bg-gray-700 rounded-full top-12 right-[-2px]"></div>
        </div>

        <h3 className="text-xl font-bold text-green-400 mb-2">CipherBot</h3>

        <div className="relative mt-4 p-4 bg-gray-900 rounded-lg border border-green-500/30">
          <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-green-500/30"></div>
          <MessageSquare className="h-5 w-5 text-green-400 absolute top-2 left-2" />
          <p className="text-gray-300 text-sm pl-7">{quote}</p>
        </div>
      </div>
    </div>
  )
}

export default HackerAvatar
