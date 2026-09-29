import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function AnalystChart() {

    const data=[
        {name: 'JAN', sales:''},
        {name: 'FEB', sales:''},
        {name: 'MAR', sales:''},
        {name: 'APR', sales:''},
        {name: 'MAy', sales:''},
        {name: 'JUN', sales:''},
        {name: 'JUL', sales:''},
        {name: 'AUG', sales:''},
        {name: 'SEP', sales:''},
        {name: 'OCT', sales:''},
        {name: 'NOV', sales:''},
        {name: 'DEC', sales:''},
    ]

    const formData = (value)=> `$${value.toLocaleString()}k`

  return (
    <div className='bar_chart_field' >
      <p>There is no data yet</p>
      <ResponsiveContainer width="100%" height={250} style={{outlineWidth:0, margin:0, padding:0}}>
        
        <LineChart  data={data} >
        <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFD08A" />
                <stop offset="50%" stopColor="#FFB84D" />
                <stop offset="100%" stopColor="#FF9F1A" />
            </linearGradient>

            <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
          <CartesianGrid strokeDasharray={'3 3'} />
          <XAxis dataKey={'name'} />
          <YAxis domain={[0, 100]} width={60} tickFormatter={formData} />
          <Tooltip />
          
            <Line
                type="monotone"
                dataKey="sales"
                stroke="url(#goldGradient)"
                strokeWidth={3}
                dot={false}
                filter="url(#glow)"
            />
        </LineChart >
      </ResponsiveContainer>
    </div>
  )
}

export default AnalystChart