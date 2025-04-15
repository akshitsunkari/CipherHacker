import type React from "react"
import { Shield, Lock, Terminal, Code, BookOpen, Trophy, Server, Database } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 neon-text font-mono">
            Why Choose CipherHacker?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform offers a comprehensive approach to learning cybersecurity through interactive experiences,
            hands-on challenges, and in-depth educational content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Lock className="h-10 w-10" />}
            title="Interactive Cipher Games"
            description="Learn cryptography through hands-on cipher challenges. Practice encryption and decryption with Caesar, Vigenère, XOR, and more advanced ciphers."
            link="/ciphers"
            color="green"
          />

          <FeatureCard
            icon={<Shield className="h-10 w-10" />}
            title="Cybersecurity Modules"
            description="Master essential security concepts through comprehensive learning modules covering encryption, network security, web vulnerabilities, and more."
            link="/cybersecurity"
            color="purple"
          />

          <FeatureCard
            icon={<Code className="h-10 w-10" />}
            title="Algorithm Visualizations"
            description="See algorithms and data structures in action with interactive visualizations that help you understand the fundamentals of computer science."
            link="/dsa"
            color="green"
          />

          <FeatureCard
            icon={<Terminal className="h-10 w-10" />}
            title="Terminal Simulator"
            description="Practice your hacking skills in a safe, simulated terminal environment with guided challenges and real-world scenarios."
            link="/terminal"
            color="purple"
          />

          <FeatureCard
            icon={<Trophy className="h-10 w-10" />}
            title="Achievement System"
            description="Track your progress with an achievement system that rewards your learning journey and helps you identify areas for improvement."
            link="/profile"
            color="green"
          />

          <FeatureCard
            icon={<BookOpen className="h-10 w-10" />}
            title="Comprehensive Resources"
            description="Access a library of cybersecurity resources, tutorials, and reference materials to deepen your understanding of security concepts."
            link="/resources/cryptography"
            color="purple"
          />
        </div>

        <div className="bg-gradient-to-r from-green-900/20 to-purple-900/20 rounded-xl p-8 border border-green-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">Perfect for Students & Professionals</h3>
              <p className="text-gray-300 mb-6">
                Whether you're a cybersecurity student working on your final year project, a professional looking to
                sharpen your skills, or an enthusiast curious about the world of security, CipherHacker provides the
                tools and knowledge you need to succeed.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-green-400">✓</div>
                  <span className="text-gray-300">Learn at your own pace with interactive tutorials</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-green-400">✓</div>
                  <span className="text-gray-300">Practice with real-world security scenarios</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-green-400">✓</div>
                  <span className="text-gray-300">
                    Build a solid foundation in cryptography and security principles
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-green-400">✓</div>
                  <span className="text-gray-300">Track your progress and showcase your achievements</span>
                </li>
              </ul>
              <Button className="bg-green-600 hover:bg-green-700 text-black" asChild>
                <Link href="/cybersecurity">Start Learning Now</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-purple-600 rounded-lg blur opacity-25"></div>
              <div className="relative bg-black rounded-lg p-6 border border-green-500/30">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center p-4 bg-green-900/20 rounded-lg">
                    <Server className="h-8 w-8 text-green-400 mb-2" />
                    <h4 className="text-green-400 font-bold">Network Security</h4>
                    <p className="text-xs text-gray-400">Learn to secure networks and systems</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-purple-900/20 rounded-lg">
                    <Lock className="h-8 w-8 text-purple-400 mb-2" />
                    <h4 className="text-purple-400 font-bold">Cryptography</h4>
                    <p className="text-xs text-gray-400">Master encryption techniques</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-purple-900/20 rounded-lg">
                    <Database className="h-8 w-8 text-purple-400 mb-2" />
                    <h4 className="text-purple-400 font-bold">Data Protection</h4>
                    <p className="text-xs text-gray-400">Safeguard sensitive information</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-green-900/20 rounded-lg">
                    <Code className="h-8 w-8 text-green-400 mb-2" />
                    <h4 className="text-green-400 font-bold">Secure Coding</h4>
                    <p className="text-xs text-gray-400">Write vulnerability-free code</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FeatureCard = ({
  icon,
  title,
  description,
  link,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  color: "green" | "purple"
}) => {
  return (
    <div className={`hacker-${color === "green" ? "" : "purple-"}card p-6 h-full`}>
      <div className={`p-3 rounded-md bg-${color}-900/20 inline-block mb-4`}>
        <div className={`text-${color}-400`}>{icon}</div>
      </div>
      <h3 className={`text-${color}-400 font-bold text-xl mb-2`}>{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <Link href={link} className={`text-${color}-400 hover:text-${color}-300 font-mono text-sm flex items-center`}>
        Explore <span className="ml-1">→</span>
      </Link>
    </div>
  )
}

export default FeaturesSection
