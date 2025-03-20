"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Instagram", value: 42, color: "hsl(var(--primary))" },
  { name: "Twitter", value: 28, color: "hsl(var(--primary) / 0.8)" },
  { name: "Facebook", value: 18, color: "hsl(var(--primary) / 0.6)" },
  { name: "LinkedIn", value: 12, color: "hsl(var(--primary) / 0.4)" },
]

export function PlatformBreakdown() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, "Percentage"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--background)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

