"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", instagram: 5000, twitter: 3000, facebook: 4000, linkedin: 2000 },
  { name: "Feb", instagram: 5500, twitter: 3200, facebook: 4200, linkedin: 2100 },
  { name: "Mar", instagram: 6000, twitter: 3400, facebook: 4300, linkedin: 2200 },
  { name: "Apr", instagram: 6500, twitter: 3600, facebook: 4400, linkedin: 2300 },
  { name: "May", instagram: 7000, twitter: 3800, facebook: 4500, linkedin: 2400 },
  { name: "Jun", instagram: 7500, twitter: 4000, facebook: 4600, linkedin: 2500 },
  { name: "Jul", instagram: 8000, twitter: 4200, facebook: 4700, linkedin: 2600 },
]

export function FollowersChart() {
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
          <Line type="monotone" dataKey="instagram" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="twitter" stroke="hsl(var(--primary) / 0.8)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="facebook" stroke="hsl(var(--primary) / 0.6)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="linkedin" stroke="hsl(var(--primary) / 0.4)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

