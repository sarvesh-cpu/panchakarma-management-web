"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const progressData = [
  { week: "Week 1", progress: 20, energy: 30, wellness: 25 },
  { week: "Week 2", progress: 35, energy: 45, wellness: 40 },
  { week: "Week 3", progress: 50, energy: 60, wellness: 55 },
  { week: "Week 4", progress: 65, energy: 70, wellness: 68 },
  { week: "Week 5", progress: 78, energy: 82, wellness: 80 },
  { week: "Week 6", progress: 85, energy: 88, wellness: 87 },
]

export function ProgressChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={progressData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2dcc8" />
          <XAxis dataKey="week" stroke="#8b8680" />
          <YAxis stroke="#8b8680" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f5f2e7",
              border: "1px solid #d4cfc4",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="progress"
            stroke="#4a6741"
            strokeWidth={3}
            dot={{ fill: "#4a6741", strokeWidth: 2, r: 4 }}
            name="Overall Progress"
          />
          <Line
            type="monotone"
            dataKey="energy"
            stroke="#c68b59"
            strokeWidth={2}
            dot={{ fill: "#c68b59", strokeWidth: 2, r: 3 }}
            name="Energy Level"
          />
          <Line
            type="monotone"
            dataKey="wellness"
            stroke="#a27b5c"
            strokeWidth={2}
            dot={{ fill: "#a27b5c", strokeWidth: 2, r: 3 }}
            name="Wellness Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
