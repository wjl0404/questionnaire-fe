import React, { FC, useMemo } from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { QuestionRadioStatPropsType } from '../QuestionRadio/interface'
const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
  // 求和
  const sum = useMemo(() => {
    let s = 0
    stat.forEach(i => (s += i.count))
    return s
  }, [stat])

  function format(n: number) {
    return (n * 100).toFixed(2)
  }
  return (
    <div style={{ width: '300px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="count"
            isAnimationActive={false}
            data={stat}
            cx="50%"
            cy="50%"
            fill="#8884d8"
            outerRadius={50}
            label={i => `${i.name}:${format(i.count / sum)}%`}
          >
            {stat.map((i, index) => {
              return <Cell key={index}></Cell>
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
