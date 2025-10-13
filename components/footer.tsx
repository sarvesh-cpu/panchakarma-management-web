import { Leaf, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">PBL Panchakarma</span>
            </div>
            <p className="text-background/80 text-pretty">
              Revolutionizing Ayurvedic care through digital innovation and personalized therapy management.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-background/80">info@pblpanchakarma.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-background/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-background/80">123 Wellness Street, Ayurveda City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="/about" className="block text-background/80 hover:text-background transition-colors">
                About Panchakarma
              </a>
              <a href="/patient" className="block text-background/80 hover:text-background transition-colors">
                Patient Portal
              </a>
              <a href="/practitioner" className="block text-background/80 hover:text-background transition-colors">
                Practitioner Portal
              </a>
              <a href="/contact" className="block text-background/80 hover:text-background transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60">
            © 2025 PBL Panchakarma. All rights reserved. | Empowering wellness through ancient wisdom and modern
            technology.
          </p>
        </div>
      </div>
    </footer>
  )
}
