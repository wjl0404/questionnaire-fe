import React, { FC } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { QuestionCheckboxStatPropsType } from './interface'
const StatComponent: FC<QuestionCheckboxStatPropsType> = ({ stat = [] }) => {
  return (
    <div style={{ width: '300px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={300}
          data={stat}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          {/* <Bar dataKey="pv" fill="#8884d8" /> */}
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
