"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Message = {
  role: "user" | "bot"
  content: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "bot",
    content:
      "Hello! I'm CipherBot, your guide to the world of cryptography and cybersecurity. Ask me anything about ciphers, encryption, or security concepts!",
  },
]

const RESPONSES: Record<string, string> = {
  hello: "Hello there! How can I help you with cryptography today?",
  hi: "Hi! I'm CipherBot. What would you like to know about ciphers or cybersecurity?",
  help: "I can help you understand various ciphers, encryption methods, cybersecurity concepts, and more. Just ask me a specific question!",

  "caesar cipher":
    "The Caesar cipher is a substitution cipher where each letter in the plaintext is shifted a certain number of places down the alphabet. It's named after Julius Caesar, who used it to communicate with his generals. While historically significant, it's extremely easy to break with only 25 possible keys.",

  "vigenere cipher":
    "The Vigenère cipher is a polyalphabetic substitution cipher that uses a keyword to determine different shift values for each letter in the plaintext. It was considered unbreakable for centuries until Friedrich Kasiski developed a method to crack it in 1863. It's much stronger than the Caesar cipher because it resists simple frequency analysis.",

  "substitution cipher":
    "A substitution cipher replaces each letter in the plaintext with a different letter or symbol according to a fixed rule. The simple substitution cipher uses a completely scrambled alphabet as the key, giving it 26! possible keys (about 4 × 10²⁶). While stronger than Caesar, it's still vulnerable to frequency analysis.",

  "transposition cipher":
    "Unlike substitution ciphers, transposition ciphers rearrange the order of letters without changing them. The Rail Fence cipher is a simple example where letters are written diagonally and then read horizontally. These ciphers are more secure when combined with substitution ciphers.",

  "xor cipher":
    "The XOR cipher applies the exclusive OR operation between each byte of the plaintext and a key. It has the special property that applying it twice with the same key restores the original value. XOR is fundamental to many modern cryptographic algorithms and is the basis for the one-time pad.",

  rsa: "RSA (Rivest–Shamir–Adleman) is a public-key cryptosystem widely used for secure data transmission. It relies on the practical difficulty of factoring the product of two large prime numbers. In RSA, the encryption key is public while the decryption key is kept private, enabling secure communication without a shared secret key.",

  "public key cryptography":
    "Public key cryptography uses a pair of keys: a public key for encryption and a private key for decryption. This revolutionary approach allows secure communication without requiring a pre-shared secret. RSA, ECC, and Diffie-Hellman are popular public key systems that form the backbone of modern secure communications.",

  "symmetric encryption":
    "Symmetric encryption uses the same key for both encryption and decryption. It's typically faster than asymmetric encryption but requires a secure method to share the key. AES (Advanced Encryption Standard) is the most widely used symmetric algorithm today, offering excellent security and performance.",

  "hash function":
    "A cryptographic hash function converts data of any size into a fixed-size output (hash) that cannot be reversed. Good hash functions have properties like collision resistance and the avalanche effect. They're used for password storage, data integrity verification, and digital signatures. Common examples include SHA-256 and Blake2.",

  blockchain:
    "Blockchain is a distributed ledger technology that stores data in blocks linked using cryptography. Each block contains a cryptographic hash of the previous block, creating an immutable chain. This technology underpins cryptocurrencies like Bitcoin but has applications in supply chain, voting systems, and more.",

  encryption:
    "Encryption is the process of converting information into a code to prevent unauthorized access. Modern encryption uses complex mathematical algorithms and keys to transform plaintext into ciphertext. It's fundamental to data security, privacy, and secure communications in our digital world.",

  cybersecurity:
    "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks often aim to access, change, or destroy sensitive information, extort money, or interrupt business processes. Effective cybersecurity requires a combination of technologies, processes, and human awareness.",

  malware:
    "Malware (malicious software) includes viruses, worms, trojans, ransomware, spyware, and other harmful programs. They can steal data, encrypt files for ransom, spy on users, or damage systems. Protection involves using antivirus software, keeping systems updated, and practicing safe browsing habits.",

  firewall:
    "A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on predetermined security rules. It establishes a barrier between trusted internal networks and untrusted external networks, such as the Internet. Firewalls can be hardware, software, or both.",

  vpn: "A Virtual Private Network (VPN) creates an encrypted connection over a less secure network. It allows users to send and receive data across shared or public networks as if their devices were directly connected to a private network. VPNs are essential for secure remote access and protecting privacy online.",

  "morse code":
    "Morse code represents characters as sequences of dots and dashes. While not a cipher (as it doesn't provide secrecy), it's an important encoding system developed for telegraph communications in the 1830s and 1840s. It remains useful in emergency situations and is still used in aviation and amateur radio.",
}

const CipherBot = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [isNearBottom, setIsNearBottom] = useState(true)

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      // Consider "near bottom" if within 100px of the bottom
      setIsNearBottom(scrollHeight - scrollTop - clientHeight < 100)
    }
  }

  useEffect(() => {
    const chatContainer = chatContainerRef.current
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll)
      return () => chatContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    // Only scroll to bottom if user was already near bottom
    if (isNearBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isNearBottom])

  const handleSend = () => {
    if (input.trim() === "") return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Find a response based on keywords in the input
    const lowercaseInput = input.toLowerCase()
    let botResponse =
      "I'm not sure about that. Try asking me about specific ciphers like Caesar, Vigenère, or concepts like encryption and cybersecurity."

    // Check for matches in our response dictionary
    for (const [keyword, response] of Object.entries(RESPONSES)) {
      if (lowercaseInput.includes(keyword.toLowerCase())) {
        botResponse = response
        break
      }
    }

    // Add bot response after a short delay to simulate thinking
    setTimeout(() => {
      const botMessage: Message = {
        role: "bot",
        content: botResponse,
      }
      setMessages((prev) => [...prev, botMessage])
    }, 500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border border-green-500/30 bg-black/50 shadow-green-900/20 shadow-lg">
      <CardHeader className="border-b border-green-500/30">
        <CardTitle className="text-green-400 flex items-center">
          <Bot className="mr-2 h-5 w-5" /> CipherBot
        </CardTitle>
        <CardDescription>Your AI assistant for all things cryptography and cybersecurity</CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-[400px] overflow-y-auto" ref={chatContainerRef}>
        <div className="space-y-4 p-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 text-gray-100 border border-green-500/30"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === "user" ? "bg-green-700" : "bg-gray-700 border border-green-500/30"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-green-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t border-green-500/30 p-4">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Ask about ciphers, encryption, or cybersecurity..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-gray-900 border-green-500/30 focus:border-green-400 focus:ring-green-400/20"
          />
          <Button onClick={handleSend} className="bg-green-600 hover:bg-green-700 text-white" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CipherBot
