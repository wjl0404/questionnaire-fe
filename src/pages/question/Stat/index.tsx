import React, { FC, useState } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { Spin, Result, Button } from 'antd'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import styles from './index.module.scss'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import PageStat from './PageStat'
import ChartStat from './ChartStat'
const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()

  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  useTitle(`问卷统计--${title}`)
  // Loading效果
  const LoadingElem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin></Spin>
    </div>
  )

  // Content
  function genContent() {
    if (typeof isPublished == 'boolean' && !isPublished) {
      return (
        <div style={{ flex: 1 }}>
          <Result
            status="warning"
            title="问卷还没有发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回首页
              </Button>
            }
          ></Result>
        </div>
      )
    }

    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          ></ComponentList>
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          ></PageStat>
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          ></ChartStat>
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader></StatHeader>
      <div className={styles['content-wrapper']}>
        {loading && LoadingElem}
        <div className={styles.content}>{!loading && genContent()}</div>
      </div>
    </div>
  )
}

export default Stat
