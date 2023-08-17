import React, { FC, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Home.module.scss'
import axios from 'axios'
const Home: FC = () => {
  // useEffect(() => {
  //   axios.get('/api/test').then(res => console.log(res.data))
  // }, [])

  const nav = useNavigate()
  // const clickHandler = () => {
  //   // nav('/login')
  //   nav({
  //     pathname: '/login',
  //     search: 'b=21',
  //   })
  // }

  const { Title, Paragraph } = Typography
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查|在线投票</Title>
        <Paragraph>累计创建问卷100份，发布90份，收到答卷980份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
