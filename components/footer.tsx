import { Github, Linkedin, Mail, Instagram, Terminal } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="py-12 border-t border-green-500/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-green-400 neon-text font-mono mb-4">&lt;CipherHacker/&gt;</h2>
            <p className="text-gray-400 max-w-md">
              A gamified learning platform for cybersecurity and data structures & algorithms. Built with Next.js and
              Tailwind CSS.
            </p>
          </div>

          <div className="terminal max-w-md w-full">
            <div className="terminal-header">
              <div className="terminal-button terminal-button-red"></div>
              <div className="terminal-button terminal-button-yellow"></div>
              <div className="terminal-button terminal-button-green"></div>
              <div className="terminal-title">developer.sh</div>
            </div>

            <div className="terminal-content p-4">
              <div className="text-green-400 font-mono mb-4">
                <span className="text-purple-400">$</span> ./about-developer
              </div>

              <div className="mb-4">
                <div className="text-gray-300 mb-2">
                  <span className="text-green-400 font-bold">Developer:</span> Srinivas Akshit
                </div>
                <div className="text-gray-300 mb-2">
                  <span className="text-green-400 font-bold">Education:</span> Final Year Student at VIT, Chennai
                </div>
                <div className="text-gray-300">
                  <span className="text-green-400 font-bold">Email:</span> Akshit.sunkari@gmail.com
                </div>
              </div>

              <div className="text-green-400 font-mono mb-2">
                <span className="text-purple-400">$</span> ./connect --social
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="https://www.linkedin.com/in/sunkarisrinivasakshit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Terminal className="h-4 w-4 mr-2" />
                  <span className="text-sm">connect --linkedin</span>
                </Link>

                <Link
                  href="https://www.instagram.com/akshit__.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <Terminal className="h-4 w-4 mr-2" />
                  <span className="text-sm">connect --instagram</span>
                </Link>

                <Link
                  href="mailto:contact@cipherhacker.dev"
                  className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Terminal className="h-4 w-4 mr-2" />
                  <span className="text-sm">connect --email</span>
                </Link>

                <Link
                  href="mailto:Akshit.sunkari@gmail.com"
                  className="flex items-center text-green-400 hover:text-green-300 transition-colors"
                >
                  <Terminal className="h-4 w-4 mr-2" />
                  <span className="text-sm">connect --gmail</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link
              href="https://www.linkedin.com/in/sunkarisrinivasakshit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>

            <Link
              href="https://www.instagram.com/akshit__.official/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 transition-colors"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>

            <Link
              href="mailto:contact@cipherhacker.dev"
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>

          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} CipherHacker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
