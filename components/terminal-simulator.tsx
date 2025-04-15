"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  Maximize2,
  Minimize2,
  HelpCircle,
  FileText,
  Folder,
  Lock,
  Unlock,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

type CommandHistory = {
  command: string
  output: string | JSX.Element
  isError?: boolean
}

const TerminalSimulator = () => {
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([
    {
      command: "",
      output: (
        <div>
          <div className="text-green-400 font-bold mb-2">CipherHacker Terminal v1.0</div>
          <div className="text-gray-400 mb-4">
            Type <span className="text-purple-400">help</span> to see available commands
          </div>
        </div>
      ),
    },
  ])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [unlockedLevels, setUnlockedLevels] = useState([1])
  const [currentChallenge, setCurrentChallenge] = useState<any>(null)

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Scroll to bottom when command history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commandHistory])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand()
    }
  }

  const handleCommand = () => {
    if (!input.trim()) return

    const command = input.trim()
    let output: string | JSX.Element = ""
    let isError = false

    // Process command
    if (currentChallenge) {
      // Handle challenge-specific commands
      output = handleChallengeCommand(command)
    } else {
      // Handle regular commands
      const result = processCommand(command)
      output = result.output
      isError = result.isError
    }

    // Add to history
    setCommandHistory([...commandHistory, { command, output, isError }])

    // Clear input
    setInput("")

    // Focus input
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const processCommand = (command: string): { output: string | JSX.Element; isError?: boolean } => {
    const parts = command.split(" ")
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    switch (cmd) {
      case "help":
        return {
          output: (
            <div className="space-y-2">
              <div className="text-purple-400 font-bold mb-2">Available Commands:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <div className="text-green-400 font-mono">help</div>
                  <div className="text-gray-400 text-sm">Display this help message</div>
                </div>
                <div>
                  <div className="text-green-400 font-mono">clear</div>
                  <div className="text-gray-400 text-sm">Clear the terminal</div>
                </div>
                <div>
                  <div className="text-green-400 font-mono">ls</div>
                  <div className="text-gray-400 text-sm">List available files and directories</div>
                </div>
                <div>
                  <div className="text-green-400 font-mono">cat [file]</div>
                  <div className="text-gray-400 text-sm">Display file contents</div>
                </div>
                <div>
                  <div className="text-green-400 font-mono">levels</div>
                  <div className="text-gray-400 text-sm">Show available hacking challenges</div>
                </div>
                <div>
                  <div className="text-green-400 font-mono">hack [level]</div>
                  <div className="text-gray-400 text-sm">Start a hacking challenge</div>
                </div>
                <div>
                  <div className="text-green-400 font-mono">encrypt [text] [key]</div>
                  <div className="text-gray-400 text-sm">Encrypt text using Caesar cipher</div>
                </div>
                <div>
                  <div className="text-green-400 font-mono">decrypt [text] [key]</div>
                  <div className="text-gray-400 text-sm">Decrypt text using Caesar cipher</div>
                </div>
                <div>
                  <div className="text-green-400 font-mono">scan [target]</div>
                  <div className="text-gray-400 text-sm">Scan a target for vulnerabilities</div>
                </div>
                <div>
                  <div className="text-green-400 font-mono">whoami</div>
                  <div className="text-gray-400 text-sm">Display current user</div>
                </div>
              </div>
            </div>
          ),
        }

      case "clear":
        setCommandHistory([])
        return { output: "" }

      case "ls":
        return {
          output: (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div className="flex items-center">
                <Folder className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-blue-400">challenges</span>
              </div>
              <div className="flex items-center">
                <Folder className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-blue-400">docs</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-400">readme.txt</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-400">cipher_guide.txt</span>
              </div>
              <div className="flex items-center">
                <Lock className="h-4 w-4 text-red-400 mr-2" />
                <span className="text-red-400">secret.enc</span>
              </div>
            </div>
          ),
        }

      case "cat":
        if (args.length === 0) {
          return { output: "Usage: cat [file]", isError: true }
        }

        const file = args[0]

        if (file === "readme.txt") {
          return {
            output: (
              <div className="space-y-2">
                <div className="text-yellow-400 font-bold">== README ==</div>
                <p className="text-gray-300">
                  Welcome to CipherHacker Terminal! This interactive environment allows you to practice cybersecurity
                  skills through simulated challenges and commands.
                </p>
                <p className="text-gray-300">
                  Start by exploring the available commands with 'help', then try the hacking challenges with 'levels'
                  and 'hack [level]'.
                </p>
                <p className="text-gray-300">Good luck, hacker!</p>
              </div>
            ),
          }
        } else if (file === "cipher_guide.txt") {
          return {
            output: (
              <div className="space-y-2">
                <div className="text-yellow-400 font-bold">== CIPHER GUIDE ==</div>
                <p className="text-gray-300">Quick reference for common ciphers:</p>
                <div className="text-gray-300 space-y-1">
                  <div>
                    <span className="text-green-400">Caesar Cipher:</span> Shifts each letter by a fixed number of
                    positions
                  </div>
                  <div>
                    <span className="text-green-400">Vigenère Cipher:</span> Uses a keyword to determine shift values
                  </div>
                  <div>
                    <span className="text-green-400">XOR Cipher:</span> Applies XOR operation with a key
                  </div>
                  <div>
                    <span className="text-green-400">Morse Code:</span> Represents characters as sequences of dots and
                    dashes
                  </div>
                </div>
                <p className="text-gray-300">Use 'encrypt' and 'decrypt' commands to practice with Caesar cipher.</p>
              </div>
            ),
          }
        } else if (file === "secret.enc") {
          return {
            output: (
              <div className="text-red-400">Error: File is encrypted. Decrypt it first using the appropriate key.</div>
            ),
            isError: true,
          }
        } else {
          return { output: `File not found: ${file}`, isError: true }
        }

      case "levels":
        return {
          output: (
            <div className="space-y-4">
              <div className="text-purple-400 font-bold">Available Hacking Challenges:</div>

              <div
                className={`p-3 border ${unlockedLevels.includes(1) ? "border-green-500/30 bg-green-900/10" : "border-gray-700 bg-gray-900/10"} rounded-md`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="text-green-400 font-bold mr-2">Level 1:</div>
                    <div className="text-gray-300">Caesar's Secret</div>
                  </div>
                  <div className="text-xs px-2 py-0.5 rounded bg-green-900/50 text-green-300">Easy</div>
                </div>
                <div className="text-gray-400 text-sm mt-1">Decrypt a message encoded with the Caesar cipher.</div>
              </div>

              <div
                className={`p-3 border ${unlockedLevels.includes(2) ? "border-green-500/30 bg-green-900/10" : "border-gray-700 bg-gray-900/10"} rounded-md`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="text-green-400 font-bold mr-2">Level 2:</div>
                    <div className="text-gray-300">Password Cracker</div>
                  </div>
                  <div className="text-xs px-2 py-0.5 rounded bg-yellow-900/50 text-yellow-300">Medium</div>
                </div>
                <div className="text-gray-400 text-sm mt-1">Crack a password using brute force techniques.</div>
                {!unlockedLevels.includes(2) && (
                  <div className="flex items-center mt-2 text-sm text-yellow-400">
                    <Lock className="h-3 w-3 mr-1" /> Complete Level 1 to unlock
                  </div>
                )}
              </div>

              <div
                className={`p-3 border ${unlockedLevels.includes(3) ? "border-green-500/30 bg-green-900/10" : "border-gray-700 bg-gray-900/10"} rounded-md`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="text-green-400 font-bold mr-2">Level 3:</div>
                    <div className="text-gray-300">Network Infiltration</div>
                  </div>
                  <div className="text-xs px-2 py-0.5 rounded bg-red-900/50 text-red-300">Hard</div>
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  Find and exploit vulnerabilities in a simulated network.
                </div>
                {!unlockedLevels.includes(3) && (
                  <div className="flex items-center mt-2 text-sm text-yellow-400">
                    <Lock className="h-3 w-3 mr-1" /> Complete Level 2 to unlock
                  </div>
                )}
              </div>
            </div>
          ),
        }

      case "hack":
        if (args.length === 0) {
          return { output: "Usage: hack [level]", isError: true }
        }

        const level = Number.parseInt(args[0])

        if (isNaN(level) || level < 1 || level > 3) {
          return { output: "Invalid level. Available levels: 1-3", isError: true }
        }

        if (!unlockedLevels.includes(level)) {
          return {
            output: `Level ${level} is locked. Complete previous levels to unlock.`,
            isError: true,
          }
        }

        // Start the challenge
        if (level === 1) {
          setCurrentChallenge({
            level: 1,
            name: "Caesar's Secret",
            description:
              "A secret message has been intercepted, but it's encrypted with a Caesar cipher. Decrypt it to reveal the hidden information.",
            encryptedMessage: "DWWDFN DW GDZQ",
            key: 3,
            hint: "The key is a single digit number between 1 and 5.",
            solved: false,
          })

          return {
            output: (
              <div className="space-y-3">
                <div className="text-green-400 font-bold text-lg">Level 1: Caesar's Secret</div>
                <p className="text-gray-300">
                  A secret message has been intercepted, but it's encrypted with a Caesar cipher. Decrypt it to reveal
                  the hidden information.
                </p>
                <div className="p-2 bg-black border border-green-500/30 rounded-md font-mono">
                  Encrypted message: DWWDFN DW GDZQ
                </div>
                <p className="text-gray-400 text-sm">
                  Use the 'decrypt' command with the correct key to solve this challenge.
                </p>
                <p className="text-gray-400 text-sm">Type 'hint' for a hint, or 'exit' to quit the challenge.</p>
              </div>
            ),
          }
        } else if (level === 2) {
          setCurrentChallenge({
            level: 2,
            name: "Password Cracker",
            description: "A password hash has been obtained. Crack it to gain access to the system.",
            passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99", // MD5 hash of "password"
            possiblePasswords: ["123456", "password", "admin", "welcome", "secret"],
            hint: "The password is one of the most common passwords used.",
            solved: false,
          })

          return {
            output: (
              <div className="space-y-3">
                <div className="text-green-400 font-bold text-lg">Level 2: Password Cracker</div>
                <p className="text-gray-300">
                  A password hash has been obtained. Crack it to gain access to the system.
                </p>
                <div className="p-2 bg-black border border-green-500/30 rounded-md font-mono">
                  Password Hash: 5f4dcc3b5aa765d61d8327deb882cf99
                </div>
                <p className="text-gray-400 text-sm">Use the 'crack' command with a password to attempt to crack it.</p>
                <p className="text-gray-400 text-sm">Type 'hint' for a hint, or 'exit' to quit the challenge.</p>
              </div>
            ),
          }
        } else if (level === 3) {
          setCurrentChallenge({
            level: 3,
            name: "Network Infiltration",
            description:
              "You've gained access to a network. Find and exploit vulnerabilities to reach the target server.",
            network: [
              { ip: "192.168.1.1", name: "Gateway", ports: [80, 22], vulnerable: false },
              { ip: "192.168.1.10", name: "Web Server", ports: [80, 443, 22], vulnerable: true },
              { ip: "192.168.1.20", name: "Database", ports: [3306], vulnerable: false },
              { ip: "192.168.1.30", name: "Target Server", ports: [22], vulnerable: false },
            ],
            currentPosition: "192.168.1.1",
            targetPosition: "192.168.1.30",
            hint: "Scan for vulnerabilities, then exploit them to move through the network.",
            solved: false,
          })

          return {
            output: (
              <div className="space-y-3">
                <div className="text-green-400 font-bold text-lg">Level 3: Network Infiltration</div>
                <p className="text-gray-300">
                  You've gained access to a network. Find and exploit vulnerabilities to reach the target server.
                </p>
                <div className="p-2 bg-black border border-green-500/30 rounded-md font-mono">
                  Current position: 192.168.1.1 (Gateway) Target: 192.168.1.30 (Target Server)
                </div>
                <p className="text-gray-400 text-sm">Available commands: 'scan [ip]', 'exploit [ip]', 'connect [ip]'</p>
                <p className="text-gray-400 text-sm">Type 'hint' for a hint, or 'exit' to quit the challenge.</p>
              </div>
            ),
          }
        }

        return { output: `Starting level ${level}...` }

      case "encrypt":
        if (args.length < 2) {
          return { output: "Usage: encrypt [text] [key]", isError: true }
        }

        const textToEncrypt = args.slice(0, args.length - 1).join(" ")
        const encryptKey = Number.parseInt(args[args.length - 1])

        if (isNaN(encryptKey)) {
          return { output: "Key must be a number", isError: true }
        }

        return {
          output: `Encrypted: ${caesarCipher(textToEncrypt, encryptKey, true)}`,
        }

      case "decrypt":
        if (args.length < 2) {
          return { output: "Usage: decrypt [text] [key]", isError: true }
        }

        const textToDecrypt = args.slice(0, args.length - 1).join(" ")
        const decryptKey = Number.parseInt(args[args.length - 1])

        if (isNaN(decryptKey)) {
          return { output: "Key must be a number", isError: true }
        }

        return {
          output: `Decrypted: ${caesarCipher(textToDecrypt, decryptKey, false)}`,
        }

      case "scan":
        if (args.length === 0) {
          return { output: "Usage: scan [target]", isError: true }
        }

        const target = args[0]

        return {
          output: (
            <div className="space-y-2">
              <div className="text-green-400">Scanning target: {target}</div>
              <div className="text-gray-400">
                <div className="animate-pulse">■ Checking open ports...</div>
                <div className="animate-pulse" style={{ animationDelay: "0.5s" }}>
                  ■ Identifying services...
                </div>
                <div className="animate-pulse" style={{ animationDelay: "1s" }}>
                  ■ Looking for vulnerabilities...
                </div>
              </div>
              <div className="text-yellow-400 mt-2">Scan complete. This is a simulated scan.</div>
            </div>
          ),
        }

      case "whoami":
        return {
          output: (
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-green-400 mr-2" />
              <span>hacker@cipherhacker:~$</span>
            </div>
          ),
        }

      default:
        return {
          output: `Command not found: ${cmd}. Type 'help' for available commands.`,
          isError: true,
        }
    }
  }

  const handleChallengeCommand = (command: string): string | JSX.Element => {
    if (!currentChallenge) return "No active challenge"

    const parts = command.split(" ")
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    if (cmd === "exit") {
      setCurrentChallenge(null)
      return "Challenge exited"
    }

    if (cmd === "hint") {
      return (
        <div className="text-yellow-400">
          <HelpCircle className="h-4 w-4 inline-block mr-1" />
          Hint: {currentChallenge.hint}
        </div>
      )
    }

    // Level 1 commands
    if (currentChallenge.level === 1) {
      if (cmd === "decrypt") {
        if (args.length < 2) {
          return "Usage: decrypt [text] [key]"
        }

        const textToDecrypt = args.slice(0, args.length - 1).join(" ")
        const decryptKey = Number.parseInt(args[args.length - 1])

        if (isNaN(decryptKey)) {
          return "Key must be a number"
        }

        const decrypted = caesarCipher(textToDecrypt, decryptKey, false)

        // Check if the solution is correct
        if (textToDecrypt === currentChallenge.encryptedMessage && decryptKey === currentChallenge.key) {
          // Mark challenge as solved
          setCurrentChallenge({ ...currentChallenge, solved: true })

          // Unlock next level
          if (!unlockedLevels.includes(2)) {
            setUnlockedLevels([...unlockedLevels, 2])
          }

          return (
            <div className="space-y-3">
              <div className="text-green-400 font-bold">
                <CheckCircle className="h-4 w-4 inline-block mr-1" />
                Challenge Completed!
              </div>
              <p className="text-gray-300">Decrypted message: {decrypted}</p>
              <p className="text-gray-300">
                You've successfully decrypted the message using a Caesar cipher with key {decryptKey}.
              </p>
              <div className="text-yellow-400">Level 2 has been unlocked!</div>
              <p className="text-gray-400 text-sm">Type 'exit' to return to the main terminal.</p>
            </div>
          )
        }

        return `Decrypted: ${decrypted}`
      }
    }

    // Level 2 commands
    if (currentChallenge.level === 2) {
      if (cmd === "crack") {
        if (args.length === 0) {
          return "Usage: crack [password]"
        }

        const password = args.join(" ")

        // Simulate password cracking
        if (password === "password") {
          // Mark challenge as solved
          setCurrentChallenge({ ...currentChallenge, solved: true })

          // Unlock next level
          if (!unlockedLevels.includes(3)) {
            setUnlockedLevels([...unlockedLevels, 3])
          }

          return (
            <div className="space-y-3">
              <div className="text-green-400 font-bold">
                <CheckCircle className="h-4 w-4 inline-block mr-1" />
                Challenge Completed!
              </div>
              <p className="text-gray-300">Password cracked: "password"</p>
              <p className="text-gray-300">You've successfully cracked the password hash.</p>
              <div className="text-yellow-400">Level 3 has been unlocked!</div>
              <p className="text-gray-400 text-sm">Type 'exit' to return to the main terminal.</p>
            </div>
          )
        }

        return (
          <div className="text-red-400">
            <AlertTriangle className="h-4 w-4 inline-block mr-1" />
            Password incorrect. Try again.
          </div>
        )
      }
    }

    // Level 3 commands
    if (currentChallenge.level === 3) {
      if (cmd === "scan") {
        if (args.length === 0) {
          return "Usage: scan [ip]"
        }

        const ip = args[0]
        const target = currentChallenge.network.find((n) => n.ip === ip)

        if (!target) {
          return `IP address ${ip} not found in the network`
        }

        return (
          <div className="space-y-2">
            <div className="text-green-400">
              Scan results for {ip} ({target.name}):
            </div>
            <div className="text-gray-300">
              <div>Open ports: {target.ports.join(", ")}</div>
              {target.vulnerable && (
                <div className="text-red-400">
                  <AlertTriangle className="h-4 w-4 inline-block mr-1" />
                  Vulnerability detected: Outdated web server
                </div>
              )}
            </div>
          </div>
        )
      }

      if (cmd === "exploit") {
        if (args.length === 0) {
          return "Usage: exploit [ip]"
        }

        const ip = args[0]
        const target = currentChallenge.network.find((n) => n.ip === ip)

        if (!target) {
          return `IP address ${ip} not found in the network`
        }

        if (!target.vulnerable) {
          return `No exploitable vulnerabilities found on ${ip}`
        }

        if (ip !== "192.168.1.10") {
          return `Cannot exploit ${ip} from current position`
        }

        return (
          <div className="space-y-2">
            <div className="text-green-400">Exploiting vulnerability on {ip}...</div>
            <div className="text-gray-300">
              <div className="animate-pulse">■ Preparing exploit payload...</div>
              <div className="animate-pulse" style={{ animationDelay: "0.5s" }}>
                ■ Sending exploit...
              </div>
              <div className="animate-pulse" style={{ animationDelay: "1s" }}>
                ■ Establishing backdoor...
              </div>
            </div>
            <div className="text-green-400 mt-2">
              <Unlock className="h-4 w-4 inline-block mr-1" />
              Exploit successful! You now have access to the internal network.
            </div>
            <div className="text-gray-300">You can now connect to 192.168.1.20 and 192.168.1.30</div>
          </div>
        )
      }

      if (cmd === "connect") {
        if (args.length === 0) {
          return "Usage: connect [ip]"
        }

        const ip = args[0]
        const target = currentChallenge.network.find((n) => n.ip === ip)

        if (!target) {
          return `IP address ${ip} not found in the network`
        }

        if (ip === "192.168.1.30") {
          // Mark challenge as solved
          setCurrentChallenge({ ...currentChallenge, solved: true })

          return (
            <div className="space-y-3">
              <div className="text-green-400 font-bold">
                <CheckCircle className="h-4 w-4 inline-block mr-1" />
                Challenge Completed!
              </div>
              <p className="text-gray-300">Connected to Target Server (192.168.1.30)</p>
              <p className="text-gray-300">
                You've successfully infiltrated the network and reached the target server.
              </p>
              <div className="text-yellow-400">Congratulations! You've completed all available challenges.</div>
              <p className="text-gray-400 text-sm">Type 'exit' to return to the main terminal.</p>
            </div>
          )
        }

        return `Connected to ${ip} (${target.name})`
      }
    }

    return `Command not recognized. Type 'help' for available commands or 'exit' to quit the challenge.`
  }

  const caesarCipher = (text: string, shift: number, encrypt: boolean) => {
    if (!encrypt) shift = 26 - (shift % 26)

    return text
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0)

        // Handle uppercase letters
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shift) % 26) + 65)
        }
        // Handle lowercase letters
        else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + shift) % 26) + 97)
        }
        // Return unchanged for non-alphabetic characters
        return char
      })
      .join("")
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <section id="terminal" className="py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 neon-text font-mono">Terminal Simulator</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Practice your hacking skills in a simulated terminal environment. Complete challenges, decrypt messages, and
          explore the command line interface.
        </p>
      </div>

      <div className={`terminal ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""}`}>
        <div className="terminal-header">
          <div className="terminal-button terminal-button-red"></div>
          <div className="terminal-button terminal-button-yellow"></div>
          <div className="terminal-button terminal-button-green"></div>
          <div className="terminal-title">hacker@cipherhacker:~$</div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-6 w-6 text-gray-400 hover:text-gray-300"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </Button>
        </div>

        <div
          ref={terminalRef}
          className="terminal-content overflow-y-auto"
          style={{ height: isFullscreen ? "calc(100vh - 120px)" : "400px" }}
        >
          {commandHistory.map((entry, index) => (
            <div key={index} className="mb-4">
              {entry.command && (
                <div className="flex items-center text-gray-400 mb-1">
                  <span className="text-green-400 mr-1">$</span>
                  <span className="text-purple-400 mr-1">~</span>
                  <ChevronRight className="h-3 w-3 mr-1 text-gray-500" />
                  <span className={entry.isError ? "text-red-400" : ""}>{entry.command}</span>
                </div>
              )}
              <div className={entry.isError ? "text-red-400" : "text-gray-300"}>{entry.output}</div>
            </div>
          ))}
        </div>

        <div className="terminal-input flex items-center p-3 border-t border-green-500/30">
          <div className="text-green-400 mr-2">$</div>
          <div className="text-purple-400 mr-2">~</div>
          <ChevronRight className="h-4 w-4 mr-2 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            className="bg-transparent w-full outline-none text-gray-300 font-mono"
            placeholder="Enter command..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            autoFocus
          />
        </div>
      </div>
    </section>
  )
}

export default TerminalSimulator
