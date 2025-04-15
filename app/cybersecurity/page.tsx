import CyberSecurityIntroduction from "@/components/cybersecurity-introduction"
import CyberSecurityModules from "@/components/cybersecurity-modules"
import CyberSecurityResources from "@/components/cybersecurity-resources"
import Footer from "@/components/footer"

export default function CybersecurityPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <CyberSecurityIntroduction />
        <CyberSecurityModules />
        <CyberSecurityResources />
        <Footer />
      </div>
    </main>
  )
}
