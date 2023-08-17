import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import { Layout, Spin } from 'antd'
import Logo from '../components/Logo'
const { Header, Footer, Content } = Layout
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo></Logo>
        </div>
        <div className={styles.right}>
          <UserInfo></UserInfo>
        </div>
      </Header>
      <Content className={styles.main}>
        {waitingUserData ? (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className={styles.footer}>My Questionnaire</Footer>
    </Layout>
  )
}

export default MainLayout
