import { PractitionerSidebar } from "@/components/practitioner-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, Calendar, Phone, Mail } from "lucide-react"

const patients = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    therapy: "Panchakarma Complete",
    nextSession: "Today, 2:00 PM",
    progress: "85%",
    status: "active",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 234-5678",
    therapy: "Shirodhara Series",
    nextSession: "Tomorrow, 11:00 AM",
    progress: "60%",
    status: "active",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789",
    therapy: "Abhyanga Therapy",
    nextSession: "Dec 28, 3:30 PM",
    progress: "40%",
    status: "active",
  },
  {
    id: 4,
    name: "Robert Wilson",
    email: "r.wilson@email.com",
    phone: "+1 (555) 456-7890",
    therapy: "Consultation",
    nextSession: "Dec 30, 10:00 AM",
    progress: "20%",
    status: "new",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    phone: "+1 (555) 567-8901",
    therapy: "Nasya Treatment",
    nextSession: "Completed",
    progress: "100%",
    status: "completed",
  },
]

export default function PractitionerPatients() {
  return (
    <div className="flex min-h-screen bg-background">
      <PractitionerSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Patient Management</h1>
            <p className="text-muted-foreground">Manage your patients and track their therapy progress</p>
          </div>

          {/* Search and Actions */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search patients..." className="pl-10" />
                </div>
                <Button className="btn-gradient text-white">Add New Patient</Button>
              </div>
            </CardContent>
          </Card>

          {/* Patient List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Patient List
              </CardTitle>
              <CardDescription>Overview of all your patients and their therapy status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="p-6 bg-surface rounded-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                      {/* Patient Info */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">{patient.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          {patient.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {patient.phone}
                        </div>
                      </div>

                      {/* Therapy Info */}
                      <div className="space-y-2">
                        <p className="font-medium text-foreground">{patient.therapy}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-border rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: patient.progress }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{patient.progress}</span>
                        </div>
                      </div>

                      {/* Next Session */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground">{patient.nextSession}</span>
                        </div>
                        <Badge
                          variant={
                            patient.status === "active" ? "default" : patient.status === "new" ? "secondary" : "outline"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" className="btn-gradient text-white">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
