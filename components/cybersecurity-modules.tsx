"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Shield, Key, AlertTriangle, Eye, ArrowRight, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Module = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  content: {
    intro: string
    sections: {
      title: string
      content: string
      animation?: string
    }[]
    quiz: {
      question: string
      options: string[]
      answer: number
    }[]
  }
  completed: boolean
}

const CyberSecurityModules = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: "encryption",
      title: "What is Encryption?",
      description: "Learn the basics of encryption and why it matters",
      icon: <Lock className="h-6 w-6" />,
      color: "green",
      content: {
        intro:
          "Encryption is the process of encoding information in such a way that only authorized parties can access it. It transforms readable data (plaintext) into an unreadable format (ciphertext) using mathematical algorithms and keys.",
        sections: [
          {
            title: "Why Encryption Matters",
            content:
              "Encryption protects sensitive data from unauthorized access. It ensures confidentiality, integrity, and authenticity of information, especially when transmitted over networks or stored in databases.",
            animation: "lock",
          },
          {
            title: "Symmetric vs. Asymmetric Encryption",
            content:
              "Symmetric encryption uses the same key for both encryption and decryption. It's fast but requires secure key exchange. Asymmetric encryption uses a pair of keys (public and private). The public key encrypts data, while the private key decrypts it.",
            animation: "keys",
          },
          {
            title: "Common Encryption Algorithms",
            content:
              "AES (Advanced Encryption Standard): A symmetric encryption algorithm widely used for secure data transmission.\nRSA: An asymmetric encryption algorithm used for secure data transmission and digital signatures.\nECC (Elliptic Curve Cryptography): A modern approach to asymmetric encryption using elliptic curves.",
          },
        ],
        quiz: [
          {
            question: "What is the purpose of encryption?",
            options: [
              "To make data faster to transmit",
              "To protect data from unauthorized access",
              "To compress data for storage",
              "To format data for display",
            ],
            answer: 1,
          },
          {
            question: "Which type of encryption uses the same key for encryption and decryption?",
            options: [
              "Asymmetric encryption",
              "Symmetric encryption",
              "Hybrid encryption",
              "Zero-knowledge encryption",
            ],
            answer: 1,
          },
        ],
      },
      completed: false,
    },
    {
      id: "attacks",
      title: "Types of Attacks",
      description: "Understand common cybersecurity threats and attack vectors",
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "red",
      content: {
        intro:
          "Cyber attacks come in many forms, each with different techniques and objectives. Understanding these attack types is crucial for developing effective defense strategies.",
        sections: [
          {
            title: "Brute Force Attacks",
            content:
              "A brute force attack attempts to crack passwords or encryption keys by systematically trying all possible combinations until the correct one is found. These attacks can be time-consuming but are often successful against weak passwords.",
            animation: "bruteforce",
          },
          {
            title: "Man-in-the-Middle (MITM) Attacks",
            content:
              "In a MITM attack, the attacker secretly intercepts and possibly alters communications between two parties who believe they are directly communicating with each other. This allows the attacker to eavesdrop on sensitive information or manipulate the conversation.",
            animation: "mitm",
          },
          {
            title: "Phishing Attacks",
            content:
              "Phishing attacks use deceptive emails, websites, or messages that appear to come from trusted sources to trick users into revealing sensitive information like passwords or credit card details. They often create a sense of urgency to prompt immediate action.",
            animation: "phishing",
          },
        ],
        quiz: [
          {
            question: "What characterizes a brute force attack?",
            options: [
              "Using social engineering to trick users",
              "Intercepting communications between two parties",
              "Systematically trying all possible password combinations",
              "Exploiting software vulnerabilities",
            ],
            answer: 2,
          },
          {
            question: "In a phishing attack, what technique do attackers commonly use?",
            options: [
              "Password cracking algorithms",
              "Network traffic interception",
              "Impersonating trusted entities",
              "Distributed denial of service",
            ],
            answer: 2,
          },
        ],
      },
      completed: false,
    },
    {
      id: "hashing",
      title: "How Hashing Works",
      description: "Explore the fundamentals of cryptographic hash functions",
      icon: <Key className="h-6 w-6" />,
      color: "purple",
      content: {
        intro:
          "Hashing is a one-way cryptographic function that converts input data of any size into a fixed-size string of characters. Unlike encryption, hashing is not reversible - you cannot derive the original input from the hash value.",
        sections: [
          {
            title: "Properties of Hash Functions",
            content:
              "A good cryptographic hash function has several key properties:\n- Deterministic: The same input always produces the same hash\n- Quick to compute: Efficient for any input size\n- Pre-image resistant: Cannot determine the input from the hash\n- Small changes cause large hash differences (avalanche effect)\n- Collision resistant: Difficult to find two inputs with the same hash",
            animation: "hash",
          },
          {
            title: "Common Hash Functions",
            content:
              "MD5: Now considered insecure due to vulnerabilities\nSHA-1: Also deprecated for security applications\nSHA-256: Part of the SHA-2 family, widely used in security applications\nBCRYPT: Specifically designed for password hashing with built-in salt",
          },
          {
            title: "Password Storage",
            content:
              "Hashing is essential for secure password storage. Instead of storing actual passwords, systems store their hash values. When a user attempts to log in, the entered password is hashed and compared to the stored hash. This way, even if the database is compromised, actual passwords remain protected.",
            animation: "password",
          },
        ],
        quiz: [
          {
            question: "What is a key characteristic of cryptographic hash functions?",
            options: [
              "They are easily reversible with the right key",
              "They produce variable-length outputs depending on input",
              "They are one-way functions that cannot be reversed",
              "They encrypt data for secure transmission",
            ],
            answer: 2,
          },
          {
            question: "Why is hashing used for password storage?",
            options: [
              "To make passwords easier to remember",
              "To compress passwords and save database space",
              "To encrypt passwords for later decryption",
              "To avoid storing actual passwords in databases",
            ],
            answer: 3,
          },
        ],
      },
      completed: false,
    },
    {
      id: "security",
      title: "Web Security Basics",
      description: "Learn fundamental concepts for securing web applications",
      icon: <Shield className="h-6 w-6" />,
      color: "blue",
      content: {
        intro:
          "Web security involves protecting websites and web applications from various threats and vulnerabilities. As web applications handle increasingly sensitive data, implementing proper security measures is crucial.",
        sections: [
          {
            title: "HTTPS and TLS",
            content:
              "HTTPS (HTTP Secure) uses TLS (Transport Layer Security) to encrypt communications between a user's browser and the website. This encryption prevents eavesdropping and man-in-the-middle attacks, ensuring data integrity and confidentiality during transmission.",
            animation: "https",
          },
          {
            title: "Cross-Site Scripting (XSS)",
            content:
              "XSS attacks occur when malicious scripts are injected into trusted websites. These scripts execute in users' browsers and can steal cookies, session tokens, or other sensitive information. Preventing XSS requires proper input validation and output encoding.",
            animation: "xss",
          },
          {
            title: "SQL Injection",
            content:
              "SQL injection attacks insert malicious SQL code into database queries through unvalidated user inputs. This can lead to unauthorized data access, modification, or deletion. Using parameterized queries and ORM libraries helps prevent SQL injection.",
          },
        ],
        quiz: [
          {
            question: "What does HTTPS protect against?",
            options: [
              "Server hardware failures",
              "Eavesdropping on data transmission",
              "SQL injection attacks",
              "Weak user passwords",
            ],
            answer: 1,
          },
          {
            question: "How can developers prevent XSS attacks?",
            options: [
              "By using stronger encryption algorithms",
              "By implementing proper input validation and output encoding",
              "By frequently changing database passwords",
              "By disabling JavaScript in the application",
            ],
            answer: 1,
          },
        ],
      },
      completed: false,
    },
  ])

  const [activeModule, setActiveModule] = useState<Module | null>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleModuleSelect = (module: Module) => {
    setActiveModule(module)
    setCurrentSection(0)
    setShowQuiz(false)
    setQuizAnswers([])
    setQuizSubmitted(false)
    setDialogOpen(true)
  }

  const handleNextSection = () => {
    if (!activeModule) return

    if (currentSection < activeModule.content.sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else {
      setShowQuiz(true)
    }
  }

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers]
    newAnswers[questionIndex] = answerIndex
    setQuizAnswers(newAnswers)
  }

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)

    if (!activeModule) return

    // Check if all answers are correct
    const allCorrect = activeModule.content.quiz.every((q, index) => quizAnswers[index] === q.answer)

    if (allCorrect) {
      // Mark module as completed
      const updatedModules = modules.map((m) => (m.id === activeModule.id ? { ...m, completed: true } : m))
      setModules(updatedModules)
    }
  }

  const calculateProgress = () => {
    const completedCount = modules.filter((m) => m.completed).length
    return (completedCount / modules.length) * 100
  }

  const renderAnimation = (type: string) => {
    switch (type) {
      case "lock":
        return (
          <div className="flex justify-center py-4">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute w-12 h-16 bg-green-500/20 rounded-t-lg border-2 border-green-500 animate-pulse"></div>
              <div className="absolute top-6 w-20 h-14 bg-green-500/30 rounded-md border-2 border-green-500 flex items-center justify-center">
                <Lock className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </div>
        )
      case "keys":
        return (
          <div className="flex justify-center py-4">
            <div className="relative flex space-x-8">
              <div className="flex flex-col items-center">
                <Key className="h-10 w-10 text-green-400 animate-pulse" />
                <span className="text-xs mt-2 text-green-400">Public Key</span>
              </div>
              <div className="flex flex-col items-center">
                <Key className="h-10 w-10 text-purple-400 animate-pulse" />
                <span className="text-xs mt-2 text-purple-400">Private Key</span>
              </div>
            </div>
          </div>
        )
      case "bruteforce":
        return (
          <div className="flex justify-center py-4">
            <div className="relative w-64 h-16 border border-red-500 rounded-md bg-black/50 flex flex-col items-center justify-center">
              <div className="text-xs text-gray-400 mb-2">Password Attempt:</div>
              <div className="font-mono text-red-400 password-attempt">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="inline-block w-2 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                    {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      case "mitm":
        return (
          <div className="flex justify-center items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
                <span className="text-blue-400">A</span>
              </div>
              <div className="relative">
                <div className="w-24 h-1 bg-red-500/50"></div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center animate-pulse">
                  <Eye className="h-5 w-5 text-red-400" />
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                <span className="text-green-400">B</span>
              </div>
            </div>
          </div>
        )
      case "phishing":
        return (
          <div className="flex justify-center py-4">
            <div className="relative w-64 h-20 border border-red-500 rounded-md bg-black/50 p-2">
              <div className="text-xs text-gray-400 mb-1">From: security@y0urbank.com</div>
              <div className="text-xs text-gray-400 mb-1">
                Subject: <span className="text-red-400">URGENT: Verify Account</span>
              </div>
              <div className="text-xs text-gray-300">
                Click here to verify your account immediately or it will be suspended...
              </div>
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
                !
              </div>
            </div>
          </div>
        )
      case "hash":
        return (
          <div className="flex flex-col items-center py-4">
            <div className="mb-4 font-mono text-sm text-purple-400">Input: "password123"</div>
            <div className="w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center mb-2">
              <ArrowRight className="h-4 w-4 text-purple-400" />
            </div>
            <div className="font-mono text-xs text-purple-400 break-all">
              Hash: ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f
            </div>
          </div>
        )
      case "password":
        return (
          <div className="flex justify-center py-4">
            <div className="relative flex flex-col items-center">
              <div className="mb-2 flex items-center space-x-2">
                <div className="w-24 p-1 border border-purple-500 rounded bg-black font-mono text-xs text-purple-400">
                  password123
                </div>
                <ArrowRight className="h-4 w-4 text-purple-400" />
                <div className="w-24 p-1 border border-purple-500 rounded bg-black font-mono text-xs text-purple-400 truncate">
                  ef92b778ba...
                </div>
              </div>
              <div className="w-64 h-16 border border-purple-500 rounded-md bg-black/50 p-2">
                <div className="text-xs text-gray-400 mb-1">User Database</div>
                <div className="text-xs font-mono">
                  <div className="flex">
                    <span className="text-green-400 w-20">username:</span>
                    <span className="text-gray-300">user1</span>
                  </div>
                  <div className="flex">
                    <span className="text-green-400 w-20">password:</span>
                    <span className="text-purple-400 truncate">ef92b778ba...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "https":
        return (
          <div className="flex justify-center py-4">
            <div className="relative flex items-center space-x-4">
              <div className="w-12 h-12 rounded-md bg-gray-800 border border-gray-600 flex items-center justify-center">
                <span className="text-gray-300 text-xs">Client</span>
              </div>
              <div className="relative">
                <div className="w-24 h-1 bg-green-500/50"></div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-green-400 text-xs">
                  🔒 HTTPS
                </div>
              </div>
              <div className="w-12 h-12 rounded-md bg-gray-800 border border-gray-600 flex items-center justify-center">
                <span className="text-gray-300 text-xs">Server</span>
              </div>
            </div>
          </div>
        )
      case "xss":
        return (
          <div className="flex justify-center py-4">
            <div className="relative w-64 h-20 border border-red-500 rounded-md bg-black/50 p-2">
              <div className="text-xs text-gray-400 mb-1">Comment Form:</div>
              <div className="text-xs font-mono text-red-400">{"<script>stealCookies()</script>"}</div>
              <div className="absolute top-2 right-2 text-xs text-red-400 animate-pulse">Malicious Code</div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section id="cybersecurity" className="py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 neon-text font-mono">
          Cybersecurity Learning Modules
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Master essential cybersecurity concepts through interactive learning modules. Complete challenges to earn
          badges and track your progress.
        </p>

        <div className="mt-6 max-w-md mx-auto">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-400 mr-2">Progress:</span>
            <span className="text-sm text-green-400">{Math.round(calculateProgress())}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${calculateProgress()}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((module) => (
          <Card key={module.id} className={`hacker-${module.color === "green" ? "" : "purple-"}card`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-md bg-${module.color}-900/20`}>{module.icon}</div>
                {module.completed && (
                  <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500/30">
                    <CheckCircle className="h-3 w-3 mr-1" /> Completed
                  </Badge>
                )}
              </div>
              <CardTitle className={`text-${module.color}-400 mt-4`}>{module.title}</CardTitle>
              <CardDescription className="text-gray-400">{module.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                className={`w-full bg-${module.color}-900/30 text-${module.color}-400 border border-${module.color}-500/30 hover:bg-${module.color}-900/50`}
                onClick={() => handleModuleSelect(module)}
              >
                {module.completed ? "Review Module" : "Start Learning"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {activeModule && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-black border border-green-500/30 text-green-400 max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className={`text-${activeModule.color}-400 text-xl`}>{activeModule.title}</DialogTitle>
              <DialogDescription className="text-gray-400">{activeModule.description}</DialogDescription>
            </DialogHeader>

            {!showQuiz ? (
              <div className="mt-4">
                {currentSection === 0 && (
                  <div className="mb-6 p-4 border border-gray-800 rounded-md bg-black/50">
                    <p className="text-gray-300">{activeModule.content.intro}</p>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className={`text-${activeModule.color}-400 text-lg font-bold mb-2`}>
                    {activeModule.content.sections[currentSection].title}
                  </h3>

                  {activeModule.content.sections[currentSection].animation &&
                    renderAnimation(activeModule.content.sections[currentSection].animation!)}

                  <div className="text-gray-300 whitespace-pre-line">
                    {activeModule.content.sections[currentSection].content}
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrevSection}
                    disabled={currentSection === 0}
                    className="border-gray-700 text-gray-400"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNextSection}
                    className={`bg-${activeModule.color}-900/30 text-${activeModule.color}-400 border border-${activeModule.color}-500/30 hover:bg-${activeModule.color}-900/50`}
                  >
                    {currentSection < activeModule.content.sections.length - 1 ? "Next" : "Take Quiz"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <h3 className={`text-${activeModule.color}-400 text-lg font-bold mb-4`}>Knowledge Check</h3>

                {activeModule.content.quiz.map((question, qIndex) => (
                  <div key={qIndex} className="mb-6 p-4 border border-gray-800 rounded-md bg-black/50">
                    <p className="text-gray-300 mb-3">
                      {qIndex + 1}. {question.question}
                    </p>

                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div
                          key={oIndex}
                          className={`p-2 rounded-md cursor-pointer border ${
                            quizAnswers[qIndex] === oIndex
                              ? `border-${activeModule.color}-500 bg-${activeModule.color}-900/20`
                              : "border-gray-800 hover:border-gray-700"
                          } ${
                            quizSubmitted && oIndex === question.answer
                              ? "border-green-500 bg-green-900/20"
                              : quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex !== question.answer
                                ? "border-red-500 bg-red-900/20"
                                : ""
                          }`}
                          onClick={() => !quizSubmitted && handleQuizAnswer(qIndex, oIndex)}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-5 h-5 rounded-full border ${
                                quizAnswers[qIndex] === oIndex ? `border-${activeModule.color}-500` : "border-gray-600"
                              } flex items-center justify-center mr-2`}
                            >
                              {quizAnswers[qIndex] === oIndex && (
                                <div className={`w-3 h-3 rounded-full bg-${activeModule.color}-500`}></div>
                              )}
                            </div>
                            <span
                              className={`text-${
                                quizSubmitted && oIndex === question.answer
                                  ? "green-400"
                                  : quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex !== question.answer
                                    ? "red-400"
                                    : "gray-300"
                              }`}
                            >
                              {option}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {quizSubmitted && (
                  <div
                    className={`mb-6 p-4 rounded-md ${
                      activeModule.content.quiz.every((q, index) => quizAnswers[index] === q.answer)
                        ? "bg-green-900/20 border border-green-500/30"
                        : "bg-red-900/20 border border-red-500/30"
                    }`}
                  >
                    <p
                      className={`font-bold ${
                        activeModule.content.quiz.every((q, index) => quizAnswers[index] === q.answer)
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {activeModule.content.quiz.every((q, index) => quizAnswers[index] === q.answer)
                        ? "Congratulations! You've completed this module."
                        : "Some answers are incorrect. Review the material and try again."}
                    </p>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowQuiz(false)
                      setCurrentSection(activeModule.content.sections.length - 1)
                    }}
                    className="border-gray-700 text-gray-400"
                  >
                    Back to Content
                  </Button>

                  {!quizSubmitted ? (
                    <Button
                      onClick={handleQuizSubmit}
                      disabled={quizAnswers.length !== activeModule.content.quiz.length}
                      className={`bg-${activeModule.color}-900/30 text-${activeModule.color}-400 border border-${activeModule.color}-500/30 hover:bg-${activeModule.color}-900/50`}
                    >
                      Submit Answers
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setDialogOpen(false)}
                      className={`bg-${activeModule.color}-900/30 text-${activeModule.color}-400 border border-${activeModule.color}-500/30 hover:bg-${activeModule.color}-900/50`}
                    >
                      Close
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}

export default CyberSecurityModules
