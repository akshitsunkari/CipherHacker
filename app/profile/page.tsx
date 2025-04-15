import HackerProfile from "@/components/hacker-profile"
import AchievementMap from "@/components/achievement-map"
import CipherBot from "@/components/cipher-bot"
import Footer from "@/components/footer"

export default function ProfilePage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <HackerProfile />
            <div className="mt-8">
              <CipherBot />
            </div>
          </div>
          <div className="lg:col-span-2">
            <AchievementMap />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
