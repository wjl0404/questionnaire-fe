import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionTextareaDefaultProps, QuestionTextareaPropsType } from './interface'
import { useForm } from 'antd/es/form/Form'
const { TextArea } = Input
const PropComponent: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="placeholder"
        name="placeholder"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <TextArea></TextArea>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
