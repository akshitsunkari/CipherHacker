"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, Trophy, Star, Shield, Code, Zap } from "lucide-react"

type Achievement = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  level: "beginner" | "intermediate" | "advanced" | "expert"
  unlocked: boolean
}

const AchievementMap = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "cipher-novice",
      title: "Cipher Novice",
      description: "Complete your first cipher challenge",
      icon: <Lock className="h-5 w-5" />,
      level: "beginner",
      unlocked: true,
    },
    {
      id: "code-breaker",
      title: "Code Breaker",
      description: "Successfully decrypt 5 messages",
      icon: <Unlock className="h-5 w-5" />,
      level: "beginner",
      unlocked: true,
    },
    {
      id: "algorithm-apprentice",
      title: "Algorithm Apprentice",
      description: "Visualize all sorting algorithms",
      icon: <Code className="h-5 w-5" />,
      level: "intermediate",
      unlocked: false,
    },
    {
      id: "security-specialist",
      title: "Security Specialist",
      description: "Complete all cybersecurity modules",
      icon: <Shield className="h-5 w-5" />,
      level: "intermediate",
      unlocked: false,
    },
    {
      id: "terminal-hacker",
      title: "Terminal Hacker",
      description: "Complete all terminal challenges",
      icon: <Zap className="h-5 w-5" />,
      level: "advanced",
      unlocked: false,
    },
    {
      id: "crypto-master",
      title: "Crypto Master",
      description: "Master all cipher techniques",
      icon: <Trophy className="h-5 w-5" />,
      level: "expert",
      unlocked: false,
    },
  ])

  const [currentLevel, setCurrentLevel] = useState<string>("beginner")

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "green"
      case "intermediate":
        return "blue"
      case "advanced":
        return "purple"
      case "expert":
        return "yellow"
      default:
        return "gray"
    }
  }

  const handleUnlockAchievement = (id: string) => {
    // This is just for demonstration purposes
    setAchievements(
      achievements.map((achievement) => (achievement.id === id ? { ...achievement, unlocked: true } : achievement)),
    )
  }

  return (
    <div id="achievements" className="hacker-card p-6">
      <h3 className="text-2xl font-bold text-green-400 mb-6">Achievement & Learning Map</h3>

      <div className="flex justify-between mb-6">
        <Button
          variant={currentLevel === "beginner" ? "default" : "outline"}
          className={`border-${getLevelColor("beginner")}-500/30 text-${getLevelColor("beginner")}-400`}
          onClick={() => setCurrentLevel("beginner")}
        >
          Beginner
        </Button>
        <Button
          variant={currentLevel === "intermediate" ? "default" : "outline"}
          className={`border-${getLevelColor("intermediate")}-500/30 text-${getLevelColor("intermediate")}-400`}
          onClick={() => setCurrentLevel("intermediate")}
        >
          Intermediate
        </Button>
        <Button
          variant={currentLevel === "advanced" ? "default" : "outline"}
          className={`border-${getLevelColor("advanced")}-500/30 text-${getLevelColor("advanced")}-400`}
          onClick={() => setCurrentLevel("advanced")}
        >
          Advanced
        </Button>
        <Button
          variant={currentLevel === "expert" ? "default" : "outline"}
          className={`border-${getLevelColor("expert")}-500/30 text-${getLevelColor("expert")}-400`}
          onClick={() => setCurrentLevel("expert")}
        >
          Expert
        </Button>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>

          {achievements
            .filter((achievement) => achievement.level === currentLevel)
            .map((achievement, index) => (
              <div key={achievement.id} className="relative pl-12 pb-8">
                <div
                  className={`absolute left-2 top-0 w-5 h-5 rounded-full ${
                    achievement.unlocked ? `bg-${getLevelColor(achievement.level)}-500` : "bg-gray-700"
                  } flex items-center justify-center z-10`}
                >
                  {achievement.unlocked && <Star className="h-3 w-3 text-black" />}
                </div>

                <div
                  className={`p-4 rounded-md border ${
                    achievement.unlocked
                      ? `border-${getLevelColor(achievement.level)}-500/30 bg-${getLevelColor(
                          achievement.level,
                        )}-900/10`
                      : "border-gray-700 bg-gray-900/10"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-md ${
                          achievement.unlocked
                            ? `bg-${getLevelColor(achievement.level)}-900/20 text-${getLevelColor(
                                achievement.level,
                              )}-400`
                            : "bg-gray-800 text-gray-500"
                        } mr-3`}
                      >
                        {achievement.icon}
                      </div>
                      <div>
                        <h4
                          className={`font-bold ${
                            achievement.unlocked ? `text-${getLevelColor(achievement.level)}-400` : "text-gray-500"
                          }`}
                        >
                          {achievement.title}
                        </h4>
                        <p className={`text-sm ${achievement.unlocked ? "text-gray-400" : "text-gray-600"}`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className={`${
                        achievement.unlocked
                          ? `bg-${getLevelColor(achievement.level)}-900/20 text-${getLevelColor(
                              achievement.level,
                            )}-400 border-${getLevelColor(achievement.level)}-500/30`
                          : "bg-gray-900/20 text-gray-500 border-gray-700"
                      }`}
                    >
                      {achievement.unlocked ? "Unlocked" : "Locked"}
                    </Badge>
                  </div>

                  {!achievement.unlocked && (
                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`border-${getLevelColor(
                          achievement.level,
                        )}-500/30 text-${getLevelColor(achievement.level)}-400`}
                        onClick={() => handleUnlockAchievement(achievement.id)}
                      >
                        <Lock className="h-3 w-3 mr-1" /> Unlock (Demo)
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-6 p-4 border border-purple-500/30 rounded-md bg-purple-900/10">
        <h4 className="font-bold text-purple-400 mb-2">Your Learning Journey</h4>
        <div className="flex justify-between items-center">
          <div className="text-gray-400">Noob</div>
          <div className="text-gray-400">Cipher Apprentice</div>
          <div className="text-gray-400">Code Breaker</div>
          <div className="text-gray-400">Cyber Ninja</div>
        </div>
        <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full"
            style={{ width: "35%" }}
          ></div>
        </div>
        <div className="mt-2 text-right text-sm text-gray-400">35% Complete</div>
      </div>
    </div>
  )
}

export default AchievementMap
