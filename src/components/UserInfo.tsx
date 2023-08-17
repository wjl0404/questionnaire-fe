import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../utils/user-tokens'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { logoutReducer } from '../store/userReducer'
import { useDispatch } from 'react-redux'

const UserInfo: FC = () => {
  // const { data } = useRequest(getUserInfoService)
  // const { username, nickname } = data || {}

  const { username, nickname } = useGetUserInfo()

  const nav = useNavigate()
  const dispatch = useDispatch()
  function logout() {
    dispatch(logoutReducer()) //清空redux数据
    removeToken() //删除token
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined></UserOutlined>
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>
  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
