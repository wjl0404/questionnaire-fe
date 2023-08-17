import React, { FC, useEffect } from 'react'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface'
import { Form, Input } from 'antd'
const { TextArea } = Input
const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()
  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])
  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      disabled={disabled}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item name="title" label="标题" rules={[{ required: true, message: '输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item name="desc" label="描述" rules={[{ required: true, message: '输入标题' }]}>
        <TextArea></TextArea>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
