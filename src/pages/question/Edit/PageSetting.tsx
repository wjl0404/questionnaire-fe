import React, { FC, useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Form, Input } from 'antd'
const { TextArea } = Input
import { resetPageInfo } from '../../../store/pageInfoReducer'
import { useDispatch } from 'react-redux'
const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  function handleValueChange() {
    // console.log('value', form.getFieldsValue())
    dispatch(resetPageInfo(form.getFieldsValue()))
  }
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])
  return (
    <Form layout="vertical" initialValues={pageInfo} onValuesChange={handleValueChange} form={form}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '输入标题' }]}>
        <Input placeholder="输入标题"></Input>
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea placeholder="问卷描述"></TextArea>
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="样式代码"></TextArea>
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="脚本代码"></TextArea>
      </Form.Item>
    </Form>
  )
}

export default PageSetting
