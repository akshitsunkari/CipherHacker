import { Terminal, Shield, Code, Lock, Server, Command } from "lucide-react"

const TerminalIntroduction = () => {
  return (
    <section className="py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 neon-text font-mono">Terminal Simulator</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Practice your command-line skills and cybersecurity techniques in a safe, simulated environment. Complete
          challenges and learn essential terminal commands.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="hacker-card p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">What is a Terminal?</h2>
            <p className="text-gray-300 mb-4">
              A terminal (or command-line interface) is a text-based interface used to interact with a computer's
              operating system. Instead of using a graphical user interface with icons and menus, you type commands to
              perform actions like navigating the file system, running programs, or managing processes.
            </p>
            <p className="text-gray-300 mb-4">
              Terminals are essential tools for cybersecurity professionals, system administrators, developers, and
              ethical hackers. They provide direct access to the system, allowing for powerful and precise control that
              isn't always possible through graphical interfaces.
            </p>
            <p className="text-gray-300">
              Our terminal simulator provides a safe environment to practice commands and techniques without the risk of
              damaging a real system. It's designed to help you build confidence and skills that transfer to real-world
              scenarios.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-green-900/10 border border-green-500/30 rounded-md p-4">
                <div className="flex items-center mb-2">
                  <Command className="h-5 w-5 text-green-400 mr-2" />
                  <h3 className="text-green-400 font-bold">Basic Commands</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Learn essential commands like ls, cd, cat, grep, and more. These form the foundation of command-line
                  proficiency and are used daily by professionals.
                </p>
              </div>

              <div className="bg-green-900/10 border border-green-500/30 rounded-md p-4">
                <div className="flex items-center mb-2">
                  <Lock className="h-5 w-5 text-green-400 mr-2" />
                  <h3 className="text-green-400 font-bold">Security Techniques</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Practice security-focused commands and techniques like encryption/decryption, network scanning, and
                  vulnerability assessment in a controlled environment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hacker-purple-card p-6">
          <div className="flex items-center mb-4">
            <Terminal className="h-6 w-6 text-purple-400 mr-2" />
            <h2 className="text-xl font-bold text-purple-400">Why Use the Terminal?</h2>
          </div>

          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Perform tasks more efficiently than with graphical interfaces</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Access powerful tools and features not available in GUIs</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Automate repetitive tasks with scripts and batch processing</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Work remotely on servers that don't have graphical interfaces</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Essential skill for cybersecurity, system administration, and development</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Better understand how operating systems and computers work</p>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-md">
            <p className="text-gray-300 text-sm italic">
              "The command line is not just for system administrators and hackers. It's a powerful tool that every
              computer user should have in their arsenal."
              <span className="block mt-2 text-right text-purple-400">— Anonymous</span>
            </p>
          </div>
        </div>
      </div>

      <div className="hacker-card p-6 mb-12">
        <h2 className="text-2xl font-bold text-green-400 mb-4">Terminal Skills for Cybersecurity</h2>
        <p className="text-gray-300 mb-6">
          The terminal is an essential tool in cybersecurity. Here are some key terminal-based skills that security
          professionals use regularly:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Server className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">System Reconnaissance</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Using commands to gather information about systems, networks, and services. This includes tools like nmap,
              netstat, and dig to understand the target environment.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Lock className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Cryptography</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Using terminal-based tools for encryption, decryption, hashing, and cryptographic operations. This
              includes tools like OpenSSL, GPG, and built-in commands for encoding/decoding.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Shield className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Security Monitoring</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Using the terminal to monitor logs, network traffic, and system activity for security events. This
              includes tools like tcpdump, wireshark (TUI mode), and log analysis commands.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Code className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Scripting & Automation</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Writing shell scripts to automate security tasks, scan for vulnerabilities, or respond to incidents. Bash,
              Python, and other scripting languages are commonly used.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Terminal className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Remote Access</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Using SSH and other terminal-based tools to securely access and manage remote systems. This is essential
              for administering servers and performing security operations.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Command className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Forensic Analysis</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Using terminal commands to analyze files, recover data, and investigate security incidents. This includes
              tools for file analysis, disk imaging, and memory forensics.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-900/20 to-purple-900/20 rounded-xl p-8 border border-green-500/30">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-400 mb-2">Ready to Start Your Terminal Journey?</h2>
          <p className="text-gray-300">
            Try our interactive terminal simulator below to practice commands, complete challenges, and build your
            skills in a safe environment. No prior experience required!
          </p>
        </div>
      </div>
    </section>
  )
}

export default TerminalIntroduction
