import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const LEGEND = [
  { color: "#0088FE", label: "Young" },
  { color: "#00C49F", label: "Baby" },
  { color: "#FFBB28", label: "Adult" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function App({ input }) {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={input}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="number"
      >
        {input.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend
        align="center"
        verticalAlign="bottom"
        iconType="circle"
        payload={LEGEND.map((item) => ({
          id: item.label,
          type: "circle",
          value: item.label,
          color: item.color,
        }))}
      />
    </PieChart>
  );
}
