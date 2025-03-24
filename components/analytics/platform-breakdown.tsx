"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Instagram", value: 42, color: "hsl(var(--chart-1)" },
  { name: "Twitter", value: 28, color: "hsl(var(--chart-2)" },
  { name: "Facebook", value: 18, color: "hsl(var(--chart-3)" },
  { name: "LinkedIn", value: 12, color: "hsl(var(--chart-4)" },
]

export function PlatformBreakdown() {
  return (
    <div className="h-[300px] pr-6 pb-4">
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
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
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
            formatter={(value) => <span className="text-xs">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

