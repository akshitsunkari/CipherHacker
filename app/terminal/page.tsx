import TerminalIntroduction from "@/components/terminal-introduction"
import TerminalSimulator from "@/components/terminal-simulator"
import TerminalChallenges from "@/components/terminal-challenges"
import Footer from "@/components/footer"

export default function TerminalPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <TerminalIntroduction />
        <TerminalSimulator />
        <TerminalChallenges />
        <Footer />
      </div>
    </main>
  )
}
