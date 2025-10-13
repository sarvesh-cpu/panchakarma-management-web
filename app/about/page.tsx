import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Heart, Shield, Users, Clock, Award } from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    icon: Heart,
    title: "Holistic Healing",
    description: "Addresses root causes of health issues through natural detoxification and rejuvenation processes.",
  },
  {
    icon: Shield,
    title: "Safe & Natural",
    description: "Uses time-tested Ayurvedic methods with natural herbs and oils, free from harmful chemicals.",
  },
  {
    icon: Users,
    title: "Personalized Care",
    description: "Customized treatment plans based on individual constitution (Prakriti) and health conditions.",
  },
  {
    icon: Clock,
    title: "Long-lasting Results",
    description: "Provides sustainable health improvements that last beyond the treatment period.",
  },
]

const therapies = [
  {
    name: "Abhyanga",
    description: "Full-body oil massage that improves circulation, reduces stress, and nourishes the skin.",
    duration: "60-90 minutes",
  },
  {
    name: "Shirodhara",
    description: "Continuous pouring of warm oil on the forehead to calm the mind and nervous system.",
    duration: "45-60 minutes",
  },
  {
    name: "Nasya",
    description: "Nasal therapy that clears respiratory passages and improves mental clarity.",
    duration: "30-45 minutes",
  },
  {
    name: "Basti",
    description: "Medicated enema therapy for deep cleansing and balancing Vata dosha.",
    duration: "45-60 minutes",
  },
]

const stats = [
  { number: "5000+", label: "Patients Treated" },
  { number: "15+", label: "Years Experience" },
  { number: "98%", label: "Success Rate" },
  { number: "24/7", label: "Support Available" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">About Panchakarma</h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-pretty">
                Discover the ancient science of Ayurvedic detoxification and rejuvenation, now enhanced with modern
                digital management for a seamless healing experience.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is Panchakarma */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                  What is Panchakarma?
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-pretty">
                    Panchakarma, meaning "five actions" in Sanskrit, is a comprehensive detoxification and rejuvenation
                    program from Ayurveda, the ancient Indian system of medicine. This time-tested therapy removes
                    toxins from the body while restoring natural balance and vitality.
                  </p>
                  <p className="text-pretty">
                    The five therapeutic procedures work synergistically to eliminate accumulated toxins (ama) from deep
                    tissues, improve digestion, boost immunity, and promote mental clarity. Each treatment is carefully
                    customized based on individual constitution and health needs.
                  </p>
                  <p className="text-pretty">
                    Our digital platform makes this ancient wisdom accessible and manageable, allowing you to track your
                    progress, schedule sessions, and maintain communication with experienced practitioners throughout
                    your healing journey.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-primary/5 rounded-2xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Leaf className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Detoxification</h4>
                      <p className="text-sm text-muted-foreground">Deep cleansing of body systems</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Heart className="w-6 h-6 text-secondary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Rejuvenation</h4>
                      <p className="text-sm text-muted-foreground">Restore vitality and energy</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Shield className="w-6 h-6 text-accent" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Balance</h4>
                      <p className="text-sm text-muted-foreground">Harmonize mind, body, spirit</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Prevention</h4>
                      <p className="text-sm text-muted-foreground">Long-term health maintenance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Why Choose Panchakarma?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
                Experience the transformative benefits of this ancient healing system, backed by thousands of years of
                proven results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-pretty">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Therapies */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Our Therapy Offerings
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
                Comprehensive range of Panchakarma therapies tailored to your individual needs and health goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {therapies.map((therapy, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-foreground">{therapy.name}</h3>
                      <span className="text-sm text-muted-foreground bg-surface px-3 py-1 rounded-full">
                        {therapy.duration}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-pretty">{therapy.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Management Benefits */}
        <section className="py-20 bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Why Digital Management Matters
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
                Traditional wisdom meets modern convenience for an enhanced healing experience.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Seamless Scheduling</h3>
                  <p className="text-muted-foreground text-pretty">
                    Book appointments, reschedule sessions, and manage your therapy timeline with ease through our
                    intuitive platform.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Continuous Communication</h3>
                  <p className="text-muted-foreground text-pretty">
                    Stay connected with your practitioner, receive personalized guidance, and get support throughout
                    your healing journey.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Progress Tracking</h3>
                  <p className="text-muted-foreground text-pretty">
                    Monitor your healing progress with detailed analytics, visual charts, and personalized insights for
                    optimal results.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Begin Your Healing Journey Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Experience the transformative power of Panchakarma with the convenience of modern digital management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/patient/login">
                <Button size="lg" className="btn-gradient text-white px-8 py-4 text-lg font-semibold">
                  Start as Patient
                </Button>
              </Link>
              <Link href="/scheduling">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold bg-transparent">
                  View Schedule
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
