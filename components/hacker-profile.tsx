"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, Lock, Terminal, Trophy, BookOpen } from "lucide-react"

const HackerProfile = () => {
  const [level, setLevel] = useState(1)
  const [experience, setExperience] = useState(75)
  const [blinking, setBlinking] = useState(false)
  const [stats, setStats] = useState({
    ciphersCompleted: 12,
    modulesFinished: 3,
    challengesSolved: 8,
    totalPoints: 1250,
  })

  useEffect(() => {
    // Blink eyes randomly
    const blinkInterval = setInterval(
      () => {
        setBlinking(true)
        setTimeout(() => setBlinking(false), 200)
      },
      Math.random() * 3000 + 2000,
    )

    return () => clearInterval(blinkInterval)
  }, [])

  return (
    <div className="hacker-card p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-32 h-32 relative">
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

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
            <h2 className="text-2xl font-bold text-green-400">CipherNinja</h2>
            <Badge className="bg-green-900/30 text-green-400 border border-green-500/30 self-center md:self-auto">
              Level {level} Hacker
            </Badge>
          </div>

          <p className="text-gray-400 mb-4">"Security is a process, not a product. Stay vigilant, stay secure."</p>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">Experience</span>
              <span className="text-xs text-green-400">{experience}/100 XP</span>
            </div>
            <Progress value={experience} className="h-2 bg-gray-800">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
            </Progress>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/50 border border-green-500/20 rounded-md p-3">
              <div className="flex items-center mb-1">
                <Lock className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-xs text-gray-400">Ciphers Completed</span>
              </div>
              <span className="text-xl font-bold text-green-400">{stats.ciphersCompleted}</span>
            </div>

            <div className="bg-black/50 border border-green-500/20 rounded-md p-3">
              <div className="flex items-center mb-1">
                <Shield className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-xs text-gray-400">Modules Finished</span>
              </div>
              <span className="text-xl font-bold text-green-400">{stats.modulesFinished}</span>
            </div>

            <div className="bg-black/50 border border-green-500/20 rounded-md p-3">
              <div className="flex items-center mb-1">
                <Terminal className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-xs text-gray-400">Challenges Solved</span>
              </div>
              <span className="text-xl font-bold text-green-400">{stats.challengesSolved}</span>
            </div>

            <div className="bg-black/50 border border-green-500/20 rounded-md p-3">
              <div className="flex items-center mb-1">
                <Trophy className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-xs text-gray-400">Total Points</span>
              </div>
              <span className="text-xl font-bold text-green-400">{stats.totalPoints}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center">
          <Trophy className="h-5 w-5 mr-2" /> Recent Achievements
        </h3>
        <div className="space-y-3">
          <div className="bg-green-900/10 border border-green-500/30 rounded-md p-3 flex items-center">
            <div className="p-2 rounded-full bg-green-900/30 mr-3">
              <Lock className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h4 className="text-green-400 font-bold">Caesar Master</h4>
              <p className="text-xs text-gray-400">Completed all Caesar cipher challenges</p>
            </div>
            <div className="ml-auto">
              <Badge className="bg-green-900/30 text-green-400 border border-green-500/30">+100 XP</Badge>
            </div>
          </div>

          <div className="bg-purple-900/10 border border-purple-500/30 rounded-md p-3 flex items-center">
            <div className="p-2 rounded-full bg-purple-900/30 mr-3">
              <Shield className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-purple-400 font-bold">Security Specialist</h4>
              <p className="text-xs text-gray-400">Completed the Web Security module</p>
            </div>
            <div className="ml-auto">
              <Badge className="bg-purple-900/30 text-purple-400 border border-purple-500/30">+150 XP</Badge>
            </div>
          </div>

          <div className="bg-green-900/10 border border-green-500/30 rounded-md p-3 flex items-center">
            <div className="p-2 rounded-full bg-green-900/30 mr-3">
              <Terminal className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h4 className="text-green-400 font-bold">Terminal Hacker</h4>
              <p className="text-xs text-gray-400">Solved your first terminal challenge</p>
            </div>
            <div className="ml-auto">
              <Badge className="bg-green-900/30 text-green-400 border border-green-500/30">+75 XP</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center">
          <BookOpen className="h-5 w-5 mr-2" /> Learning Progress
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-300">Cryptography</span>
              <span className="text-xs text-green-400">65%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-300">Network Security</span>
              <span className="text-xs text-purple-400">40%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: "40%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-300">Web Security</span>
              <span className="text-xs text-green-400">80%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-300">Data Structures & Algorithms</span>
              <span className="text-xs text-purple-400">35%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: "35%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HackerProfile
