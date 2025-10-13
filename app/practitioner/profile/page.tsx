"use client"

import { useState, useEffect } from "react"
import { PractitionerSidebar } from "@/components/practitioner-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, Edit, Save, X, Award, Clock } from "lucide-react"

export default function PractitionerProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({
    name: "Dr. Priya Sharma",
    title: "Senior Ayurveda Practitioner",
    email: "priya.sharma@ayurveda.com",
    phone: "+1 (555) 234-5678",
    license: "AP-2018-001234",
    experience: "12 years",
    specializations: ["Panchakarma", "Abhyanga", "Shirodhara", "Herbal Medicine"],
    education: "BAMS, MD (Ayurveda), Certified Panchakarma Specialist",
    languages: ["English", "Hindi", "Sanskrit"],
    address: "456 Wellness Center, Ayurveda City, AC 12345",
    bio: "Dr. Priya Sharma is a highly experienced Ayurveda practitioner with over 12 years of expertise in traditional healing methods. She specializes in Panchakarma treatments and has helped hundreds of patients achieve optimal health through personalized Ayurvedic therapies.",
    achievements: [
      "Certified Panchakarma Specialist - 2019",
      "Best Practitioner Award - Ayurveda Association 2022",
      "Published researcher in Ayurvedic Medicine Journal",
    ],
    workingHours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed",
    },
  })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const handleSave = () => {
    // TODO: Save to API
    setIsEditing(false)
  }

  const handleCancel = () => {
    // TODO: Reset form data
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <PractitionerSidebar />
        <div className="flex-1 p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="h-96 bg-muted rounded"></div>
              <div className="lg:col-span-2 h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <PractitionerSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Professional Profile</h1>
              <p className="text-muted-foreground">Manage your professional information and credentials</p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} className="gap-2 bg-transparent">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-lg">PS</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{profile.name}</h3>
                    <p className="text-muted-foreground">{profile.title}</p>
                    <Badge variant="secondary" className="mt-2">
                      {profile.experience} Experience
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">License: {profile.license}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profile.address}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.specializations.map((spec) => (
                      <Badge key={spec} variant="outline">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                  <CardDescription>Update your professional details and credentials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        value={profile.title}
                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license">License Number</Label>
                      <Input
                        id="license"
                        value={profile.license}
                        onChange={(e) => setProfile({ ...profile, license: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        value={profile.experience}
                        onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education">Education & Certifications</Label>
                    <Textarea
                      id="education"
                      value={profile.education}
                      onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                      disabled={!isEditing}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Practice Address</Label>
                    <Textarea
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      disabled={!isEditing}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Working Hours
                  </CardTitle>
                  <CardDescription>Set your availability for patient appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(profile.workingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center justify-between">
                        <Label className="capitalize font-medium">{day}</Label>
                        <Input
                          value={hours}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              workingHours: { ...profile.workingHours, [day]: e.target.value },
                            })
                          }
                          disabled={!isEditing}
                          className="w-48"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Achievements & Recognition
                  </CardTitle>
                  <CardDescription>Your professional achievements and awards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profile.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
