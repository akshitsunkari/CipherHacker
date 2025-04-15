import { Shield, Lock, AlertTriangle, Server, Database, Globe } from "lucide-react"

const CyberSecurityIntroduction = () => {
  return (
    <section className="py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 neon-text font-mono">
          Cybersecurity Learning Hub
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Master essential cybersecurity concepts through interactive modules, challenges, and comprehensive resources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="hacker-card p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">What is Cybersecurity?</h2>
            <p className="text-gray-300 mb-4">
              Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These
              attacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money
              from users; or interrupting normal business processes.
            </p>
            <p className="text-gray-300 mb-4">
              Implementing effective cybersecurity measures is particularly challenging today because there are more
              devices than people, and attackers are becoming more innovative. there are more devices than people, and
              attackers are becoming more innovative.
            </p>
            <p className="text-gray-300 mb-4">
              A successful cybersecurity approach has multiple layers of protection spread across computers, networks,
              programs, and data that an organization wants to keep safe. In a world where cyber threats evolve rapidly,
              understanding the fundamentals of security is essential for everyone.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-green-900/10 border border-green-500/30 rounded-md p-4">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-green-400 mr-2" />
                  <h3 className="text-green-400 font-bold">Defense in Depth</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  A layered approach to security that uses multiple defensive mechanisms. If one layer fails, another
                  layer provides protection.
                </p>
              </div>

              <div className="bg-green-900/10 border border-green-500/30 rounded-md p-4">
                <div className="flex items-center mb-2">
                  <Lock className="h-5 w-5 text-green-400 mr-2" />
                  <h3 className="text-green-400 font-bold">Principle of Least Privilege</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Users should only have the minimum levels of access necessary to perform their job functions, reducing
                  potential damage from accidents or attacks.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hacker-purple-card p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-purple-400 mr-2" />
            <h2 className="text-xl font-bold text-purple-400">Why Study Cybersecurity?</h2>
          </div>

          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Protect sensitive personal and business information</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Prevent unauthorized access to systems and networks</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Develop skills that are in high demand across industries</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Understand and mitigate emerging threats</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Build secure systems and applications from the ground up</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Contribute to a safer digital environment for everyone</p>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-md">
            <p className="text-gray-300 text-sm italic">
              "Security used to be an inconvenience sometimes, but now it's a necessity all the time."
              <span className="block mt-2 text-right text-purple-400">— Martina Navratilova</span>
            </p>
          </div>
        </div>
      </div>

      <div className="hacker-card p-6 mb-12">
        <h2 className="text-2xl font-bold text-green-400 mb-4">Key Areas of Cybersecurity</h2>
        <p className="text-gray-300 mb-6">
          Cybersecurity encompasses several specialized fields, each focusing on different aspects of digital
          protection. Our learning modules cover these essential areas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Lock className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Cryptography</h3>
            </div>
            <p className="text-gray-400 text-sm">
              The practice of secure communication in the presence of adversaries. Learn about encryption, decryption,
              digital signatures, and secure key exchange protocols.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Server className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Network Security</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Protecting network infrastructure and data transmission. Covers firewalls, intrusion detection systems,
              VPNs, and secure network architecture.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Globe className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Web Security</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Securing websites and web applications. Learn about common vulnerabilities like XSS, CSRF, SQL injection,
              and how to implement secure coding practices.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Database className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Data Protection</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Safeguarding sensitive information throughout its lifecycle. Covers data encryption, access controls, data
              loss prevention, and privacy regulations.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Threat Intelligence</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Understanding and analyzing cyber threats. Learn about different types of attacks, threat actors, and how
              to use intelligence to improve security posture.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Shield className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Security Operations</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Day-to-day activities to maintain security. Covers incident response, security monitoring, vulnerability
              management, and security awareness.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-900/20 to-purple-900/20 rounded-xl p-8 border border-green-500/30">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-400 mb-2">Ready to Begin Your Cybersecurity Journey?</h2>
          <p className="text-gray-300">
            Explore our interactive learning modules below to build your knowledge and skills in various cybersecurity
            domains.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CyberSecurityIntroduction
