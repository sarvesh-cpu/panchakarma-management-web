import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Bell, TrendingUp, MessageCircle } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Automated Scheduling",
    description: "Seamlessly book and manage therapy appointments with intelligent scheduling system.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Receive timely reminders for sessions, medications, and pre-therapy preparations.",
  },
  {
    icon: TrendingUp,
    title: "Therapy Tracking",
    description: "Monitor your healing progress with detailed analytics and visual progress charts.",
  },
  {
    icon: MessageCircle,
    title: "Feedback Loop",
    description: "Continuous communication between patients and practitioners for optimal care.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Key Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Experience the future of Ayurvedic care with our comprehensive digital platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-card border-border/50"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
