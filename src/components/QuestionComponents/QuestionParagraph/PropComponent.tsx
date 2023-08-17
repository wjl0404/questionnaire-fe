import React, { FC, useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface'
import { Checkbox, Form, Input } from 'antd'
const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, disabled, onChange } = props
  const { TextArea } = Input
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])
  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label="段落内容" name="text" rules={[{ required: true, message: '输入段落' }]}>
        <TextArea></TextArea>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
