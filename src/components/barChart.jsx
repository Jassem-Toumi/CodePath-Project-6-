import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Text
} from "recharts";

export default function barChart({ input}) {

  return (
    <><Text x={250} y={30}  fontWeight="bold" fontSize={20} textAnchor="middle">
       Breeds by Popularity
    </Text>
    
    <BarChart
      width={500}
      height={300}
      // data={data}
      data={input}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        
        <XAxis dataKey="breed" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Bar dataKey="pv" fill="#8884d8" /> */}
        <Bar dataKey="number" fill="#82ca9d" />
      </BarChart></>
  );
}
