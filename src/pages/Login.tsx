import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'
import { Space, Typography, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
const { Title } = Typography
import { loginService } from '../services/user'
import { useRequest } from 'ahooks'
import { setToken } from '../utils/user-tokens'
const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}
function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}
function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const [form] = Form.useForm()
  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const nav = useNavigate()

  const { loading, run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result
        setToken(token)
        message.success('登录成功')
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )

  const onFinish = (value: any) => {
    // console.log(value)

    const { username, password, remember } = value || {}
    run(username, password)
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined></UserAddOutlined>
          </Title>
          <Title level={2}>登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 3, max: 20, message: '用户名为长度3——20的字符串' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '输入密码' }]}>
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>切换注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
