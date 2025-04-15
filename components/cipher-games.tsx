"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, Lock, Unlock, CheckCircle, XCircle, Info, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const CipherGames = () => {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [key, setKey] = useState("3")
  const [activeTab, setActiveTab] = useState("caesar")
  const [isEncrypting, setIsEncrypting] = useState(true)
  const [challenge, setChallenge] = useState(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  // Define challenge type
  type Challenge = {
    text: string
    encryptedText: string
    key: string
    hint: string
    explanation: string
    difficulty: "easy" | "medium" | "hard"
    timeLimit: number
  }

  const challenges = {
    caesar: [
      {
        text: "HELLO WORLD",
        encryptedText: "KHOOR ZRUOG",
        key: "3",
        hint: "The key is a single digit number",
        explanation: "Caesar cipher shifts each letter by the key amount (3). H → K (shift 3), E → H, etc.",
        difficulty: "easy",
        timeLimit: 60,
      },
      {
        text: "CYBERSECURITY",
        encryptedText: "HFIJWXJHZWNYD",
        key: "5",
        hint: "The key is between 1 and 10",
        explanation: "Caesar cipher shifts each letter by the key amount (5). C → H (shift 5), Y → D, etc.",
        difficulty: "medium",
        timeLimit: 90,
      },
    ],
    vigenere: [
      {
        text: "ATTACK AT DAWN",
        encryptedText: "LXFOPV EF WNHR",
        key: "KEY",
        hint: "The key is a 3-letter word",
        explanation:
          "Vigenère cipher uses a keyword (KEY) repeated to match the message length. Each letter shifts by the corresponding key letter value.",
        difficulty: "medium",
        timeLimit: 120,
      },
    ],
    morse: [
      {
        text: "SOS",
        encryptedText: "... --- ...",
        key: "",
        hint: "This is a common distress signal",
        explanation: "Morse code uses dots and dashes to represent letters. S = ... and O = ---",
        difficulty: "easy",
        timeLimit: 45,
      },
    ],
    xor: [
      {
        text: "HACK",
        encryptedText: "0x08 0x00 0x0F 0x0B",
        key: "65",
        hint: "The key is ASCII for capital A",
        explanation:
          "XOR cipher performs the XOR operation between each character and the key. H (72) XOR A (65) = 8, etc.",
        difficulty: "hard",
        timeLimit: 150,
      },
    ],
    reverse: [
      {
        text: "HELLO WORLD",
        encryptedText: "DLROW OLLEH",
        key: "",
        hint: "Think about reading backwards",
        explanation: "Reverse cipher simply reverses the order of characters in the text.",
        difficulty: "easy",
        timeLimit: 30,
      },
    ],
  }

  useEffect(() => {
    // Reset output when input changes
    processText()
  }, [inputText, key, activeTab, isEncrypting])

  useEffect(() => {
    // Timer for challenges
    let interval

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false)
      setIsCorrect(false)
    }

    return () => clearInterval(interval)
  }, [timerActive, timeLeft])

  const processText = () => {
    if (!inputText) {
      setOutputText("")
      return
    }

    let result = ""

    switch (activeTab) {
      case "caesar":
        result = caesarCipher(inputText, Number.parseInt(key), isEncrypting)
        break
      case "vigenere":
        result = vigenereCipher(inputText, key, isEncrypting)
        break
      case "morse":
        result = isEncrypting ? textToMorse(inputText) : morseToText(inputText)
        break
      case "xor":
        result = xorCipher(inputText, Number.parseInt(key), isEncrypting)
        break
      case "reverse":
        result = reverseText(inputText)
        break
    }

    setOutputText(result)
  }

  const caesarCipher = (text, shift, encrypt) => {
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

  const vigenereCipher = (text, keyword, encrypt) => {
    if (!keyword) return text

    const key = keyword.toUpperCase().replace(/[^A-Z]/g, "")
    if (key.length === 0) return text

    return text
      .split("")
      .map((char, i) => {
        const code = char.charCodeAt(0)
        const keyChar = key[i % key.length]
        const keyShift = keyChar.charCodeAt(0) - 65

        // Handle uppercase letters
        if (code >= 65 && code <= 90) {
          if (encrypt) {
            return String.fromCharCode(((code - 65 + keyShift) % 26) + 65)
          } else {
            return String.fromCharCode(((code - 65 - keyShift + 26) % 26) + 65)
          }
        }
        // Handle lowercase letters
        else if (code >= 97 && code <= 122) {
          if (encrypt) {
            return String.fromCharCode(((code - 97 + keyShift) % 26) + 97)
          } else {
            return String.fromCharCode(((code - 97 - keyShift + 26) % 26) + 97)
          }
        }
        // Return unchanged for non-alphabetic characters
        return char
      })
      .join("")
  }

  const morseCodeMap = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "'": ".----.",
    "!": "-.-.--",
    "/": "-..-.",
    "(": "-.--.",
    ")": "-.--.-",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    _: "..--.-",
    '"': ".-..-.",
    $: "...-..-",
    "@": ".--.-.",
  }

  // Create reverse mapping for decoding
  const reverseMorseCodeMap = {}
  Object.keys(morseCodeMap).forEach((key) => {
    reverseMorseCodeMap[morseCodeMap[key]] = key
  })

  const textToMorse = (text) => {
    return text
      .toUpperCase()
      .split("")
      .map((char) => {
        if (char === " ") return "/"
        return morseCodeMap[char] || char
      })
      .join(" ")
  }

  const morseToText = (morse) => {
    return morse
      .split(" ")
      .map((code) => {
        if (code === "/") return " "
        return reverseMorseCodeMap[code] || code
      })
      .join("")
  }

  const xorCipher = (text, key, encrypt) => {
    // XOR is its own inverse, so encrypt and decrypt are the same
    return text
      .split("")
      .map((char) => {
        const charCode = char.charCodeAt(0)
        const xorResult = charCode ^ key

        if (encrypt) {
          return `0x${xorResult.toString(16).padStart(2, "0")}`
        } else {
          // Try to convert from hex format like "0x41" to character
          if (char === "0" && text[text.indexOf(char) + 1] === "x") {
            return ""
          }

          const hexMatch = text.match(/0x([0-9A-Fa-f]{2})/g)
          if (hexMatch) {
            return hexMatch
              .map((hex) => {
                const value = Number.parseInt(hex.substring(2), 16)
                return String.fromCharCode(value ^ key)
              })
              .join("")
          }

          return String.fromCharCode(xorResult)
        }
      })
      .join(" ")
  }

  const reverseText = (text) => {
    return text.split("").reverse().join("")
  }

  const startChallenge = () => {
    if (!challenges[activeTab] || challenges[activeTab].length === 0) {
      return
    }

    const randomIndex = Math.floor(Math.random() * challenges[activeTab].length)
    const newChallenge = challenges[activeTab][randomIndex]

    setChallenge(newChallenge)
    setUserAnswer("")
    setIsCorrect(null)
    setTimeLeft(newChallenge.timeLimit)
    setTimerActive(true)
    setShowExplanation(false)

    // Set the form to decryption mode
    setIsEncrypting(false)
    setInputText(newChallenge.encryptedText)

    if (activeTab === "caesar" || activeTab === "vigenere" || activeTab === "xor") {
      setKey("")
    }
  }

  const checkAnswer = () => {
    if (!challenge) return

    let isAnswerCorrect = false

    if (activeTab === "caesar" || activeTab === "vigenere" || activeTab === "xor") {
      isAnswerCorrect = key === challenge.key
    } else {
      isAnswerCorrect = outputText.toUpperCase() === challenge.text.toUpperCase()
    }

    setIsCorrect(isAnswerCorrect)
    setTimerActive(false)

    if (isAnswerCorrect) {
      setScore((prev) => prev + (timeLeft > 0 ? Math.ceil(timeLeft / 10) + 10 : 5))
    }
  }

  const resetGame = () => {
    setInputText("")
    setOutputText("")
    setKey(activeTab === "caesar" ? "3" : "")
    setChallenge(null)
    setIsCorrect(null)
    setTimerActive(false)
    setShowExplanation(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <section id="cipher-games" className="py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 neon-text font-mono">Cipher Games Zone</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Encrypt and decrypt messages using various ciphers. Learn how they work, test your skills with challenges, and
          become a master cryptographer.
        </p>
      </div>

      <div className="terminal mb-8">
        <div className="terminal-header">
          <div className="terminal-button terminal-button-red"></div>
          <div className="terminal-button terminal-button-yellow"></div>
          <div className="terminal-button terminal-button-green"></div>
          <div className="terminal-title">cipher-games.sh</div>
        </div>

        <div className="terminal-content">
          <div className="flex justify-between items-center mb-4">
            <div className="text-green-400 font-mono">
              <span className="text-purple-400">$</span> ./cipher-tools --mode=interactive
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2 text-sm">Score:</span>
              <span className="text-green-400 font-bold">{score}</span>
            </div>
          </div>

          <Tabs defaultValue="caesar" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-black border border-green-500/30 mb-4">
              <TabsTrigger value="caesar" className="data-[state=active]:bg-green-900/20">
                Caesar
              </TabsTrigger>
              <TabsTrigger value="vigenere" className="data-[state=active]:bg-green-900/20">
                Vigenère
              </TabsTrigger>
              <TabsTrigger value="morse" className="data-[state=active]:bg-green-900/20">
                Morse
              </TabsTrigger>
              <TabsTrigger value="xor" className="data-[state=active]:bg-green-900/20">
                XOR
              </TabsTrigger>
              <TabsTrigger value="reverse" className="data-[state=active]:bg-green-900/20">
                Reverse
              </TabsTrigger>
            </TabsList>

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="w-full md:w-1/2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-gray-400">Input Text</label>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() => setIsEncrypting(!isEncrypting)}
                      >
                        {isEncrypting ? (
                          <>
                            <Lock className="h-3 w-3 mr-1" /> Encrypt
                          </>
                        ) : (
                          <>
                            <Unlock className="h-3 w-3 mr-1" /> Decrypt
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={`Enter text to ${isEncrypting ? "encrypt" : "decrypt"}...`}
                      className="bg-black border-green-500/30 font-mono"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => setInputText("")}
                    >
                      ×
                    </Button>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-gray-400">Output</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => {
                        navigator.clipboard.writeText(outputText)
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <div className="bg-black border border-green-500/30 rounded-md p-2 min-h-[38px] font-mono text-green-400 break-all">
                    {outputText || <span className="text-gray-600">Output will appear here...</span>}
                  </div>
                </div>
              </div>

              {(activeTab === "caesar" || activeTab === "vigenere" || activeTab === "xor") && (
                <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-400 w-16">
                    {activeTab === "caesar" ? "Shift" : activeTab === "vigenere" ? "Keyword" : "Key"}:
                  </label>
                  <Input
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder={
                      activeTab === "caesar"
                        ? "Enter shift (e.g. 3)"
                        : activeTab === "vigenere"
                          ? "Enter keyword (e.g. KEY)"
                          : "Enter key (e.g. 65)"
                    }
                    className="bg-black border-green-500/30 font-mono max-w-xs"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                          <Info className="h-4 w-4 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {activeTab === "caesar"
                          ? "Caesar cipher shifts each letter by the specified amount (0-25)"
                          : activeTab === "vigenere"
                            ? "Vigenère cipher uses a keyword that repeats to match message length"
                            : "XOR cipher performs bitwise XOR operation with the key (0-255)"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button onClick={startChallenge} className="bg-purple-700 hover:bg-purple-800 text-white">
                  Start Challenge
                </Button>
                <Button variant="outline" onClick={resetGame} className="border-green-500/50 text-green-400">
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>

              {challenge && (
                <div className="mt-6 border border-purple-500/30 rounded-lg p-4 bg-black/50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-purple-400">Decryption Challenge</h3>
                    <div className="flex items-center">
                      <span className={`text-sm ${timeLeft < 10 ? "text-red-400" : "text-gray-400"}`}>
                        Time: {formatTime(timeLeft)}
                      </span>
                      <span className="ml-4 text-xs px-2 py-0.5 rounded bg-purple-900/50 text-purple-300">
                        {challenge.difficulty}
                      </span>
                    </div>
                  </div>

                  <p className="mb-4 text-gray-300">
                    {isEncrypting ? "Decrypt the following message:" : "Find the correct key to decrypt this message:"}
                  </p>

                  <div className="bg-black border border-purple-500/30 rounded-md p-2 mb-4 font-mono text-purple-400 break-all">
                    {challenge.encryptedText}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20"
                      onClick={() => alert(challenge.hint)}
                    >
                      <AlertCircle className="h-4 w-4 mr-1" /> Hint
                    </Button>
                  </div>

                  {isCorrect !== null && (
                    <div
                      className={`mb-4 p-3 rounded-md ${
                        isCorrect ? "bg-green-900/20 text-green-400" : "bg-red-900/20 text-red-400"
                      }`}
                    >
                      <div className="flex items-center">
                        {isCorrect ? <CheckCircle className="h-5 w-5 mr-2" /> : <XCircle className="h-5 w-5 mr-2" />}
                        <span>
                          {isCorrect ? `Correct! +${Math.ceil(timeLeft / 10) + 10} points` : "Incorrect. Try again!"}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="mt-2 text-sm">
                          <span className="text-gray-300">Correct answer: </span>
                          {activeTab === "caesar" || activeTab === "vigenere" || activeTab === "xor" ? (
                            <span className="text-green-400 font-mono">Key = {challenge.key}</span>
                          ) : (
                            <span className="text-green-400 font-mono">{challenge.text}</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={checkAnswer}
                      disabled={isCorrect !== null}
                      className="bg-purple-700 hover:bg-purple-800 text-white"
                    >
                      Submit Answer
                    </Button>

                    {isCorrect !== null && (
                      <Button
                        variant="outline"
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="border-purple-500/50 text-purple-400"
                      >
                        {showExplanation ? "Hide" : "Show"} Explanation
                      </Button>
                    )}
                  </div>

                  {showExplanation && (
                    <div className="mt-4 p-3 bg-purple-900/10 border border-purple-500/30 rounded-md">
                      <h4 className="font-bold text-purple-400 mb-2">How it works:</h4>
                      <p className="text-gray-300 text-sm">{challenge.explanation}</p>
                    </div>
                  )}
                </div>
              )}

              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="about" className="border-green-500/30">
                  <AccordionTrigger className="text-green-400 hover:text-green-300">
                    About{" "}
                    {activeTab === "caesar"
                      ? "Caesar"
                      : activeTab === "vigenere"
                        ? "Vigenère"
                        : activeTab === "morse"
                          ? "Morse"
                          : activeTab === "xor"
                            ? "XOR"
                            : "Reverse"}{" "}
                    Cipher
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    {activeTab === "caesar" && (
                      <>
                        <p className="mb-2">
                          The Caesar cipher is one of the simplest encryption techniques. It works by shifting each
                          letter in the plaintext by a fixed number of positions down the alphabet.
                        </p>
                        <p className="mb-2">For example, with a shift of 3:</p>
                        <ul className="list-disc list-inside mb-2">
                          <li>A becomes D</li>
                          <li>B becomes E</li>
                          <li>Z becomes C (wrapping around)</li>
                        </ul>
                        <p>
                          This cipher is named after Julius Caesar, who reportedly used it to communicate with his
                          generals.
                        </p>
                      </>
                    )}

                    {activeTab === "vigenere" && (
                      <>
                        <p className="mb-2">
                          The Vigenère cipher is a method of encrypting alphabetic text by using a simple form of
                          polyalphabetic substitution.
                        </p>
                        <p className="mb-2">
                          It uses a keyword that repeats to match the length of the plaintext. Each letter of the
                          keyword determines the shift amount for the corresponding letter in the plaintext.
                        </p>
                        <p className="mb-2">For example, with the keyword "KEY":</p>
                        <ul className="list-disc list-inside mb-2">
                          <li>K shifts by 10 (K is the 11th letter, so shift by 10)</li>
                          <li>E shifts by 4 (E is the 5th letter, so shift by 4)</li>
                          <li>Y shifts by 24 (Y is the 25th letter, so shift by 24)</li>
                        </ul>
                        <p>
                          This pattern repeats for the entire message, making it much stronger than the Caesar cipher.
                        </p>
                      </>
                    )}

                    {activeTab === "morse" && (
                      <>
                        <p className="mb-2">
                          Morse code is a method of encoding text characters as standardized sequences of two different
                          signal durations, called dots and dashes (or dits and dahs).
                        </p>
                        <p className="mb-2">
                          It was developed by Samuel Morse and Alfred Vail in the 1830s and 1840s for use with the
                          telegraph.
                        </p>
                        <p className="mb-2">Some common Morse code patterns:</p>
                        <ul className="list-disc list-inside mb-2">
                          <li>A: .-</li>
                          <li>B: -...</li>
                          <li>S: ...</li>
                          <li>O: ---</li>
                        </ul>
                        <p>The famous SOS distress signal is "... --- ..." (three dots, three dashes, three dots).</p>
                      </>
                    )}

                    {activeTab === "xor" && (
                      <>
                        <p className="mb-2">
                          The XOR cipher is a simple encryption algorithm that operates on the principle of the
                          exclusive OR (XOR) logical operation.
                        </p>
                        <p className="mb-2">
                          XOR works by comparing two bits: if they are the same, the result is 0; if they are different,
                          the result is 1.
                        </p>
                        <p className="mb-2">
                          For encryption, each byte of the plaintext is XORed with a key value. For decryption, the same
                          operation is performed again, as XOR is its own inverse.
                        </p>
                        <p className="mb-2">For example, with the ASCII value of 'A' (65) as the key:</p>
                        <ul className="list-disc list-inside mb-2">
                          <li>'H' (72) XOR 'A' (65) = 9</li>
                          <li>9 XOR 'A' (65) = 'H' (72)</li>
                        </ul>
                        <p>While simple, XOR is a fundamental operation in many more complex encryption algorithms.</p>
                      </>
                    )}

                    {activeTab === "reverse" && (
                      <>
                        <p className="mb-2">
                          The Reverse cipher is the simplest of all ciphers. It simply reverses the order of characters
                          in the plaintext.
                        </p>
                        <p className="mb-2">For example:</p>
                        <ul className="list-disc list-inside mb-2">
                          <li>"HELLO" becomes "OLLEH"</li>
                          <li>"CIPHER" becomes "REHPIC"</li>
                        </ul>
                        <p>
                          While extremely basic and easily broken, it serves as a good introduction to the concept of
                          text transformation.
                        </p>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default CipherGames
