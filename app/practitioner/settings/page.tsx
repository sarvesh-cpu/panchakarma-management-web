"use client"

import { useState, useEffect } from "react"
import { PractitionerSidebar } from "@/components/practitioner-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Bell, Shield, Palette, Calendar } from "lucide-react"

export default function PractitionerSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: true,
      push: true,
      appointments: true,
      cancellations: true,
      feedback: true,
      reminders: true,
    },
    privacy: {
      profileVisibility: "public",
      patientDataSharing: false,
      analytics: true,
      marketingEmails: false,
    },
    practice: {
      autoConfirmBookings: false,
      allowCancellations: true,
      cancellationWindow: "24",
      sessionDuration: "60",
      bufferTime: "15",
      currency: "USD",
      timezone: "America/New_York",
    },
    preferences: {
      language: "en",
      theme: "light",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12",
    },
  })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const handleSave = () => {
    // TODO: Save settings to API
    console.log("Saving settings:", settings)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <PractitionerSidebar />
        <div className="flex-1 p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded"></div>
              ))}
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
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Practice Settings</h1>
            <p className="text-muted-foreground">Configure your practice preferences and account settings</p>
          </div>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Manage how you receive notifications about your practice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, email: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive urgent notifications via text</p>
                </div>
                <Switch
                  checked={settings.notifications.sms}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, sms: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Appointments</Label>
                  <p className="text-sm text-muted-foreground">Get notified when patients book appointments</p>
                </div>
                <Switch
                  checked={settings.notifications.appointments}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, appointments: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cancellations</Label>
                  <p className="text-sm text-muted-foreground">Get notified about appointment cancellations</p>
                </div>
                <Switch
                  checked={settings.notifications.cancellations}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, cancellations: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Patient Feedback</Label>
                  <p className="text-sm text-muted-foreground">Get notified when patients leave feedback</p>
                </div>
                <Switch
                  checked={settings.notifications.feedback}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, feedback: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Practice Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Practice Management
              </CardTitle>
              <CardDescription>Configure your practice operations and booking settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-confirm Bookings</Label>
                  <p className="text-sm text-muted-foreground">Automatically confirm new patient bookings</p>
                </div>
                <Switch
                  checked={settings.practice.autoConfirmBookings}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      practice: { ...settings.practice, autoConfirmBookings: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Cancellations</Label>
                  <p className="text-sm text-muted-foreground">Allow patients to cancel their appointments</p>
                </div>
                <Switch
                  checked={settings.practice.allowCancellations}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      practice: { ...settings.practice, allowCancellations: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cancellation Window (hours)</Label>
                  <Select
                    value={settings.practice.cancellationWindow}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        practice: { ...settings.practice, cancellationWindow: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="48">48 hours</SelectItem>
                      <SelectItem value="72">72 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Default Session Duration (minutes)</Label>
                  <Select
                    value={settings.practice.sessionDuration}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        practice: { ...settings.practice, sessionDuration: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">120 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Buffer Time (minutes)</Label>
                  <Select
                    value={settings.practice.bufferTime}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        practice: { ...settings.practice, bufferTime: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No buffer</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select
                    value={settings.practice.currency}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        practice: { ...settings.practice, currency: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>Control your privacy and data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <Select
                  value={settings.privacy.profileVisibility}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, profileVisibility: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="patients">Patients Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anonymous Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">Share anonymized patient data for research</p>
                </div>
                <Switch
                  checked={settings.privacy.patientDataSharing}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, patientDataSharing: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Practice Analytics</Label>
                  <p className="text-sm text-muted-foreground">Help improve our platform with usage analytics</p>
                </div>
                <Switch
                  checked={settings.privacy.analytics}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, analytics: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Preferences
              </CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, language: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="sa">Sanskrit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select
                    value={settings.practice.timezone}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        practice: { ...settings.practice, timezone: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Asia/Kolkata">India Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={settings.preferences.theme}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, theme: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time Format</Label>
                  <Select
                    value={settings.preferences.timeFormat}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, timeFormat: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg">
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
