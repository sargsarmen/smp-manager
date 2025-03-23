"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts"

const data = [
  { name: "Jan", likes: 1500, comments: 500, shares: 300 },
  { name: "Feb", likes: 1800, comments: 600, shares: 400 },
  { name: "Mar", likes: 1600, comments: 550, shares: 350 },
  { name: "Apr", likes: 2000, comments: 700, shares: 450 },
  { name: "May", likes: 2200, comments: 750, shares: 500 },
  { name: "Jun", likes: 2500, comments: 800, shares: 550 },
  { name: "Jul", likes: 2700, comments: 850, shares: 600 },
]

export function EngagementChart() {
  return (
    <div className="h-[300px] flex flex-col">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} cy="45%">
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              formatter={(value) => [`${value}`, ""]}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--background)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(value) => {
                return <span className="text-sm capitalize">{value}</span>
              }}
            />
            <Line
              name="Likes"
              type="monotone"
              dataKey="likes"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              name="Comments"
              type="monotone"
              dataKey="comments"
              stroke="hsl(var(--primary) / 0.7)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              name="Shares"
              type="monotone"
              dataKey="shares"
              stroke="hsl(var(--primary) / 0.4)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

