import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-12 h-12 bg-accent/10 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
        <Leaf
          className="absolute top-32 right-1/3 w-8 h-8 text-primary/20 animate-float"
          style={{ animationDelay: "0.5s" }}
        />
        <Sparkles
          className="absolute bottom-40 right-10 w-6 h-6 text-secondary/30 animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            PBL Panchakarma
            <span className="block text-primary mt-2">Digital Ayurveda Care</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            Schedule, Track & Recover with Personalized Panchakarma Therapy
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/patient/login">
              <Button size="lg" className="btn-gradient text-white px-8 py-4 text-lg font-semibold rounded-xl">
                Login as Patient
              </Button>
            </Link>
            <Link href="/practitioner/login">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
              >
                Login as Practitioner
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
