import React, { FC } from 'react'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
const { Title } = Typography
import { LOGIN_PATHNAME } from '../router'
import { registerService } from '../services/user'
import { useRequest } from 'ahooks'
const Register: FC = () => {
  const nav = useNavigate()
  const { run, loading } = useRequest(
    async values => {
      const { username, password, nickname } = values
      await registerService(username, password, nickname)
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功')
        nav(LOGIN_PATHNAME)
      },
    }
  )

  const onFinish = (value: any) => {
    run(value)
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined></UserAddOutlined>
          </Title>
          <Title level={2}>注册</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
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
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '确认密码!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不一致!'))
                },
              }),
            ]}
          >
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input></Input>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>切换登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
