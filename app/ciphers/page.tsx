import CipherIntroduction from "@/components/cipher-introduction"
import CipherGames from "@/components/cipher-games"
import CipherTutorials from "@/components/cipher-tutorials"
import Footer from "@/components/footer"

export default function CiphersPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <CipherIntroduction />
        <CipherTutorials />
        <CipherGames />
        <Footer />
      </div>
    </main>
  )
}
