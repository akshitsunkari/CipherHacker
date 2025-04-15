import DSAIntroduction from "@/components/dsa-introduction"
import DSAVisualizer from "@/components/dsa-visualizer"
import DSAChallenges from "@/components/dsa-challenges"
import Footer from "@/components/footer"

export default function DSAPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <DSAIntroduction />
        <DSAVisualizer />
        <DSAChallenges />
        <Footer />
      </div>
    </main>
  )
}
