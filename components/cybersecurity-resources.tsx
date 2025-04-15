import type React from "react"
import { ExternalLink, BookOpen, FileText, Video, Download, Globe, Github } from "lucide-react"
import Link from "next/link"

const CyberSecurityResources = () => {
  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-400 neon-text font-mono">Cybersecurity Resources</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Expand your knowledge with these carefully curated resources, tools, and references for cybersecurity
          professionals and enthusiasts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResourceCard title="Documentation & Guides" icon={<BookOpen className="h-6 w-6" />} color="green">
          <ResourceLink href="https://owasp.org/www-project-top-ten/" title="OWASP Top 10" />
          <ResourceLink href="https://csrc.nist.gov/publications/sp" title="NIST Special Publications" />
          <ResourceLink href="https://www.sans.org/reading-room/" title="SANS Reading Room" />
          <ResourceLink href="https://www.cisecurity.org/controls/cis-controls-list" title="CIS Controls" />
          <ResourceLink href="https://attack.mitre.org/" title="MITRE ATT&CK Framework" />
        </ResourceCard>

        <ResourceCard title="Online Courses & Training" icon={<Video className="h-6 w-6" />} color="purple">
          <ResourceLink
            href="https://www.coursera.org/specializations/cyber-security"
            title="Coursera: Cybersecurity Specialization"
          />
          <ResourceLink href="https://www.edx.org/learn/cybersecurity" title="edX: Cybersecurity Courses" />
          <ResourceLink href="https://www.cybrary.it/" title="Cybrary - Free Cybersecurity Training" />
          <ResourceLink href="https://tryhackme.com/" title="TryHackMe - Learn Cybersecurity" />
          <ResourceLink href="https://www.hackthebox.com/" title="Hack The Box - Hacking Training" />
        </ResourceCard>

        <ResourceCard title="Tools & Software" icon={<Download className="h-6 w-6" />} color="green">
          <ResourceLink href="https://www.kali.org/" title="Kali Linux - Penetration Testing" />
          <ResourceLink href="https://www.wireshark.org/" title="Wireshark - Network Protocol Analyzer" />
          <ResourceLink href="https://nmap.org/" title="Nmap - Network Scanner" />
          <ResourceLink href="https://www.metasploit.com/" title="Metasploit Framework" />
          <ResourceLink href="https://www.openvas.org/" title="OpenVAS - Vulnerability Scanner" />
        </ResourceCard>

        <ResourceCard title="Blogs & News" icon={<Globe className="h-6 w-6" />} color="purple">
          <ResourceLink href="https://krebsonsecurity.com/" title="Krebs on Security" />
          <ResourceLink href="https://www.darkreading.com/" title="Dark Reading" />
          <ResourceLink href="https://www.schneier.com/" title="Schneier on Security" />
          <ResourceLink href="https://thehackernews.com/" title="The Hacker News" />
          <ResourceLink href="https://www.bleepingcomputer.com/" title="Bleeping Computer" />
        </ResourceCard>

        <ResourceCard title="Practice Platforms" icon={<Github className="h-6 w-6" />} color="green">
          <ResourceLink href="https://www.vulnhub.com/" title="VulnHub - Vulnerable VMs" />
          <ResourceLink href="https://ctftime.org/" title="CTFtime - CTF Events" />
          <ResourceLink href="https://portswigger.net/web-security" title="PortSwigger Web Security Academy" />
          <ResourceLink href="https://picoctf.org/" title="picoCTF - Beginner CTF" />
          <ResourceLink href="https://cryptohack.org/" title="CryptoHack - Cryptography Challenges" />
        </ResourceCard>

        <ResourceCard title="Standards & Frameworks" icon={<FileText className="h-6 w-6" />} color="purple">
          <ResourceLink href="https://www.iso.org/isoiec-27001-information-security.html" title="ISO/IEC 27001" />
          <ResourceLink href="https://www.pcisecuritystandards.org/" title="PCI DSS" />
          <ResourceLink href="https://www.nist.gov/cyberframework" title="NIST Cybersecurity Framework" />
          <ResourceLink href="https://gdpr-info.eu/" title="GDPR" />
          <ResourceLink
            href="https://csrc.nist.gov/projects/risk-management/sp800-53-controls"
            title="NIST SP 800-53"
          />
        </ResourceCard>
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-green-900/20 to-purple-900/20 rounded-xl border border-green-500/30">
        <h3 className="text-xl font-bold text-green-400 mb-4">Recommended Books for Cybersecurity Professionals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BookRecommendation
            title="The Art of Deception"
            author="Kevin Mitnick"
            description="Explores social engineering and the human elements of security."
          />
          <BookRecommendation
            title="Practical Malware Analysis"
            author="Michael Sikorski & Andrew Honig"
            description="A hands-on guide to dissecting malicious software."
          />
          <BookRecommendation
            title="Applied Cryptography"
            author="Bruce Schneier"
            description="Comprehensive guide to cryptography protocols and techniques."
          />
          <BookRecommendation
            title="The Web Application Hacker's Handbook"
            author="Dafydd Stuttard & Marcus Pinto"
            description="Finding and exploiting security flaws in web applications."
          />
          <BookRecommendation
            title="Hacking: The Art of Exploitation"
            author="Jon Erickson"
            description="Programming, exploitation, and network security fundamentals."
          />
          <BookRecommendation
            title="Social Engineering: The Science of Human Hacking"
            author="Christopher Hadnagy"
            description="Understanding the psychological aspects of security breaches."
          />
        </div>
      </div>
    </section>
  )
}

const ResourceCard = ({
  title,
  icon,
  color,
  children,
}: {
  title: string
  icon: React.ReactNode
  color: "green" | "purple"
  children: React.ReactNode
}) => {
  return (
    <div className={`hacker-${color === "green" ? "" : "purple-"}card p-6`}>
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-md bg-${color}-900/20 mr-3`}>
          <div className={`text-${color}-400`}>{icon}</div>
        </div>
        <h3 className={`text-${color}-400 font-bold text-lg`}>{title}</h3>
      </div>
      <ul className="space-y-2">{children}</ul>
    </div>
  )
}

const ResourceLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <li>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
      >
        <ExternalLink className="h-3 w-3 mr-2 text-gray-500" />
        {title}
      </Link>
    </li>
  )
}

const BookRecommendation = ({ title, author, description }: { title: string; author: string; description: string }) => {
  return (
    <div className="bg-black/50 border border-green-500/20 rounded-md p-3">
      <h4 className="text-green-400 font-bold text-sm mb-1">{title}</h4>
      <p className="text-gray-400 text-xs mb-2">by {author}</p>
      <p className="text-gray-300 text-xs">{description}</p>
    </div>
  )
}

export default CyberSecurityResources
