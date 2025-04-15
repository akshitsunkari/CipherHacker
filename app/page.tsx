import Hero from "@/components/hero"
import FeaturesSection from "@/components/features-section"
import CipherBot from "@/components/cipher-bot"
import ErrorBoundary from "@/components/error-boundary"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      <ErrorBoundary>
        <FeaturesSection />
      </ErrorBoundary>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Ask Our Cybersecurity Assistant</h2>
        <div className="max-w-2xl mx-auto">
          <ErrorBoundary>
            <CipherBot />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}
