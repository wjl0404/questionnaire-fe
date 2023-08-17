import React, { FC, useEffect, useState } from 'react'
import { getComponentStatService } from '../../../services/stat'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'
import { getComponentConfByType } from '../../../components/QuestionComponents'
const { Title } = Typography
type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}
const ChatStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props
  const { id = '' } = useParams()
  const [stat, setStat] = useState([])
  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(result) {
        const { stat } = result
        setStat(stat)
      },
    }
  )
  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, selectedComponentId])

  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>
    const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
    if (!StatComponent) return <div>该组件没有统计图表</div>
    return <StatComponent stat={stat}></StatComponent>
  }
  return (
    <>
      <Title level={3}>图表</Title>
      <div>{genStatElem()}</div>
    </>
  )
}

export default ChatStat
