import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ScoreGauge = ({ score }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  let color = '#ef4444'; 
  if (score >= 70) color = '#eab308'; 
  if (score >= 85) color = '#22c55e'; 

  return (
    <div className="relative h-48 w-48 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={180}
            endAngle={0}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell key="score" fill={color} cornerRadius={10} />
            <Cell key="remaining" fill="#e2e8f0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
        <span className="text-4xl font-bold text-slate-800">{score}</span>
        <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Overall Score</span>
      </div>
    </div>
  );
};

export default ScoreGauge;
