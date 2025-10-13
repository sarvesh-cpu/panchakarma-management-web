import { PatientSidebar } from "@/components/patient-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Phone } from "lucide-react"

const sessions = [
  {
    id: 1,
    therapy: "Abhyanga (Oil Massage)",
    date: "Today",
    time: "2:00 PM",
    practitioner: "Dr. Priya Sharma",
    location: "Room 101, Wellness Center",
    status: "confirmed",
    duration: "60 minutes",
    instructions: "Please arrive 15 minutes early. Avoid heavy meals 2 hours before the session.",
  },
  {
    id: 2,
    therapy: "Shirodhara",
    date: "Tomorrow",
    time: "10:00 AM",
    practitioner: "Dr. Raj Patel",
    location: "Room 203, Wellness Center",
    status: "confirmed",
    duration: "45 minutes",
    instructions: "Wear comfortable clothing. Bring a change of clothes if needed.",
  },
  {
    id: 3,
    therapy: "Panchakarma Consultation",
    date: "Dec 28",
    time: "3:30 PM",
    practitioner: "Dr. Priya Sharma",
    location: "Consultation Room A",
    status: "pending",
    duration: "30 minutes",
    instructions: "Bring any previous medical reports and current medications list.",
  },
  {
    id: 4,
    therapy: "Nasya Therapy",
    date: "Dec 30",
    time: "11:00 AM",
    practitioner: "Dr. Raj Patel",
    location: "Room 105, Wellness Center",
    status: "confirmed",
    duration: "30 minutes",
    instructions: "Avoid nasal sprays or medications 24 hours before treatment.",
  },
]

export default function PatientSessions() {
  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Sessions</h1>
            <p className="text-muted-foreground">View and manage your therapy appointments</p>
          </div>

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-gradient text-white">Book New Session</Button>
                <Button variant="outline">Reschedule Session</Button>
                <Button variant="outline">View Calendar</Button>
              </div>
            </CardContent>
          </Card>

          {/* Sessions List */}
          <div className="space-y-6">
            {sessions.map((session) => (
              <Card key={session.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{session.therapy}</CardTitle>
                      <CardDescription className="mt-1">Session with {session.practitioner}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        session.status === "confirmed"
                          ? "default"
                          : session.status === "pending"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {session.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Session Details */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{session.date}</p>
                          <p className="text-sm text-muted-foreground">Date</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{session.time}</p>
                          <p className="text-sm text-muted-foreground">Duration: {session.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{session.location}</p>
                          <p className="text-sm text-muted-foreground">Location</p>
                        </div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Pre-session Instructions</h4>
                        <p className="text-sm text-muted-foreground bg-surface p-3 rounded-lg">
                          {session.instructions}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Practitioner
                        </Button>
                        {session.status === "confirmed" && (
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State for no sessions */}
          {sessions.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Sessions Scheduled</h3>
                <p className="text-muted-foreground mb-6">You don't have any therapy sessions scheduled yet.</p>
                <Button className="btn-gradient text-white">Book Your First Session</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
