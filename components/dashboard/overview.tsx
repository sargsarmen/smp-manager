"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", engagement: 2500, followers: 9000 },
  { name: "Feb", engagement: 3000, followers: 10000 },
  { name: "Mar", engagement: 2800, followers: 10500 },
  { name: "Apr", engagement: 3200, followers: 11000 },
  { name: "May", engagement: 3800, followers: 11500 },
  { name: "Jun", engagement: 4000, followers: 12000 },
  { name: "Jul", engagement: 4200, followers: 12500 },
]

export function Overview() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Line type="monotone" dataKey="engagement" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="followers" stroke="hsl(var(--primary) / 0.5)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

