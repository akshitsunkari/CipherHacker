"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Terminal, Lock, Shield, Server, Code, CheckCircle, Trophy, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Challenge = {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string
  commands: string[]
  objectives: string[]
  hints: string[]
  solution: string
  completed: boolean
}

const TerminalChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "challenge-1",
      title: "File System Navigation",
      description:
        "Navigate the file system to find a hidden file containing a secret message. Practice using cd, ls, and cat commands.",
      difficulty: "beginner",
      category: "Basic Commands",
      commands: ["cd", "ls", "cat", "pwd"],
      objectives: ["Navigate to the /home/user/documents directory", "Find the hidden file", "Read its contents"],
      hints: [
        "Use 'ls -a' to show hidden files (those starting with a dot)",
        "The file might be in a nested directory",
        "Try using 'find' command to search for files",
      ],
      solution: "cd /home/user/documents\nls -a\ncd .secret\ncat message.txt",
      completed: false,
    },
    {
      id: "challenge-2",
      title: "Caesar Cipher Decryption",
      description:
        "Decrypt a message that has been encoded with a Caesar cipher. Use terminal tools to analyze and decode the text.",
      difficulty: "intermediate",
      category: "Cryptography",
      commands: ["cat", "tr", "grep", "echo"],
      objectives: [
        "Read the encrypted file",
        "Determine the cipher shift",
        "Decrypt the message",
        "Verify the plaintext makes sense",
      ],
      hints: [
        "Caesar ciphers shift each letter by a fixed amount",
        "Try different shift values (0-25) until you find readable text",
        "You can use 'tr' command for character substitution",
      ],
      solution: "cat encrypted.txt\necho \"GRYYVJBEYQ\" | tr 'A-Za-z' 'N-ZA-Mn-za-m'\n# Output: HELLOWORLD",
      completed: false,
    },
    {
      id: "challenge-3",
      title: "Network Reconnaissance",
      description:
        "Perform basic network reconnaissance to identify open ports and services on a target system. Use common network scanning tools.",
      difficulty: "advanced",
      category: "Network Security",
      commands: ["ping", "nmap", "netstat", "traceroute"],
      objectives: [
        "Check if the target is online",
        "Scan for open ports",
        "Identify running services",
        "Document your findings",
      ],
      hints: [
        "Start with a simple ping to check connectivity",
        "Use nmap for port scanning",
        "The -sV flag in nmap helps identify service versions",
        "Look for common ports like 22 (SSH), 80 (HTTP), 443 (HTTPS)",
      ],
      solution: "ping -c 4 target.example.com\nnmap -sV target.example.com\nnetstat -tuln",
      completed: false,
    },
  ])

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleChallengeSelect = (challenge: Challenge) => {
    setSelectedChallenge(challenge)
    setDialogOpen(true)
  }

  const handleMarkAsCompleted = (id: string) => {
    setChallenges(challenges.map((challenge) => (challenge.id === id ? { ...challenge, completed: true } : challenge)))
    setDialogOpen(false)
  }

  const calculateProgress = () => {
    const completedCount = challenges.filter((challenge) => challenge.completed).length
    return (completedCount / challenges.length) * 100
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-900/30 text-green-400 border-green-500/30"
      case "intermediate":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-500/30"
      case "advanced":
        return "bg-red-900/30 text-red-400 border-red-500/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-500/30"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Basic Commands":
        return <Terminal className="h-5 w-5" />
      case "Cryptography":
        return <Lock className="h-5 w-5" />
      case "Network Security":
        return <Server className="h-5 w-5" />
      case "System Security":
        return <Shield className="h-5 w-5" />
      case "Scripting":
        return <Code className="h-5 w-5" />
      default:
        return <Terminal className="h-5 w-5" />
    }
  }

  return (
    <section id="terminal-challenges" className="py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 neon-text font-mono">Terminal Challenges</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Put your terminal skills to the test with these practical challenges. Each challenge focuses on different
          aspects of command-line usage and cybersecurity techniques.
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <Card
            key={challenge.id}
            className={`border ${
              challenge.completed ? "border-green-500/50 bg-green-900/10" : "border-gray-800 bg-black/50"
            } hover:border-green-500/30 transition-colors`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div
                  className={`p-2 rounded-md ${
                    challenge.category === "Cryptography"
                      ? "bg-purple-900/20"
                      : challenge.category === "Network Security"
                        ? "bg-blue-900/20"
                        : "bg-green-900/20"
                  }`}
                >
                  <div
                    className={`${
                      challenge.category === "Cryptography"
                        ? "text-purple-400"
                        : challenge.category === "Network Security"
                          ? "text-blue-400"
                          : "text-green-400"
                    }`}
                  >
                    {getCategoryIcon(challenge.category)}
                  </div>
                </div>
                {challenge.completed && (
                  <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500/30">
                    <CheckCircle className="h-3 w-3 mr-1" /> Completed
                  </Badge>
                )}
              </div>
              <CardTitle
                className={`${
                  challenge.category === "Cryptography"
                    ? "text-purple-400"
                    : challenge.category === "Network Security"
                      ? "text-blue-400"
                      : "text-green-400"
                } mt-4`}
              >
                {challenge.title}
              </CardTitle>
              <CardDescription className="text-gray-400">{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                <Badge className="bg-gray-800 text-gray-300">{challenge.category}</Badge>
              </div>

              <div className="text-sm text-gray-400 mb-2">Required Commands:</div>
              <div className="flex flex-wrap gap-1 mb-4">
                {challenge.commands.map((command) => (
                  <span key={command} className="px-2 py-1 bg-black rounded-md text-green-400 font-mono text-xs">
                    {command}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleChallengeSelect(challenge)}
                className={`w-full ${
                  challenge.completed
                    ? "bg-green-900/30 text-green-400 border border-green-500/30 hover:bg-green-900/50"
                    : "bg-black text-green-400 border border-green-500/30 hover:bg-green-900/20"
                }`}
              >
                {challenge.completed ? "Review Challenge" : "Start Challenge"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-green-900/20 to-purple-900/20 rounded-xl border border-green-500/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-green-900/30 mb-4">
              <Trophy className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-green-400 font-bold mb-2">Earn Achievements</h3>
            <p className="text-gray-300 text-sm">
              Complete challenges to earn achievements and track your progress in mastering terminal skills.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-purple-900/30 mb-4">
              <Clock className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-purple-400 font-bold mb-2">Practice at Your Pace</h3>
            <p className="text-gray-300 text-sm">
              No time pressure. Learn and practice terminal commands at your own pace in a safe environment.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-green-900/30 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-green-400 font-bold mb-2">Real-World Skills</h3>
            <p className="text-gray-300 text-sm">
              Develop practical skills that transfer directly to real cybersecurity and system administration tasks.
            </p>
          </div>
        </div>
      </div>

      {selectedChallenge && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-black border border-green-500/30 text-green-400 max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle
                className={`${
                  selectedChallenge.category === "Cryptography"
                    ? "text-purple-400"
                    : selectedChallenge.category === "Network Security"
                      ? "text-blue-400"
                      : "text-green-400"
                } text-xl`}
              >
                {selectedChallenge.title}
              </DialogTitle>
              <DialogDescription className="text-gray-400">{selectedChallenge.description}</DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className={getDifficultyColor(selectedChallenge.difficulty)}>
                  {selectedChallenge.difficulty}
                </Badge>
                <Badge className="bg-gray-800 text-gray-300">{selectedChallenge.category}</Badge>
              </div>

              <div>
                <h3 className="text-green-400 font-bold mb-2">Objectives:</h3>
                <ul className="space-y-1 text-gray-300">
                  {selectedChallenge.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <div className="text-green-400 mr-2">•</div>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-green-400 font-bold mb-2">Required Commands:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedChallenge.commands.map((command) => (
                    <span key={command} className="px-2 py-1 bg-black rounded-md text-green-400 font-mono">
                      {command}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-green-400 font-bold mb-2">Hints:</h3>
                <div className="space-y-2">
                  {selectedChallenge.hints.map((hint, index) => (
                    <div key={index} className="p-3 bg-black/70 rounded-md text-gray-300 text-sm">
                      <span className="text-yellow-400 font-bold mr-2">Hint {index + 1}:</span>
                      {hint}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-green-400 font-bold mb-2">Solution:</h3>
                <div className="bg-black/70 p-4 rounded-md">
                  <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
                    {selectedChallenge.solution}
                  </pre>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Try to solve the challenge on your own before looking at the solution!
                </p>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="border-gray-700 text-gray-400"
                >
                  Close
                </Button>

                {!selectedChallenge.completed && (
                  <Button
                    onClick={() => handleMarkAsCompleted(selectedChallenge.id)}
                    className="bg-green-600 hover:bg-green-700 text-black"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" /> Mark as Completed
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}

export default TerminalChallenges
