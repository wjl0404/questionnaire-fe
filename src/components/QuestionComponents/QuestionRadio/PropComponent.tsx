import React, { FC, useEffect } from 'react'
import { QuestionRadioPropsType, OptionType } from './interface'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
const PropsComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, options, value, disabled, onChange } = props
  const [form] = Form.useForm()
  function handleValuesChange() {
    if (onChange == null) return
    const newFieldValue = form.getFieldsValue() as QuestionRadioPropsType
    if (newFieldValue.options) {
      newFieldValue.options = newFieldValue.options.filter(opt => !(opt.text == null))
    }
    const { options = [] } = newFieldValue
    options.forEach((o: OptionType) => {
      if (o.value) return
      o.value = nanoid(5) //补齐options选项中缺少的value
    })

    onChange(newFieldValue)
  }
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, options, value })
  }, [title, isVertical, options, value])
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '输入标题 ' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有选项 提供删除功能 */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项输入框 */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '输入选项' },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((opt: OptionType) => {
                              if (opt.text == text) {
                                num++ //记录text相同的个数，>1说明重复了
                              }
                            })
                            if (num == 1) return Promise.resolve()
                            return Promise.reject(new Error('重复选项'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项文字"></Input>
                    </Form.Item>
                    {/* 删除项 */}
                    {index > 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)}></MinusCircleOutlined>
                    )}
                  </Space>
                )
              })}
              {/* 添加选项 */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '' })}
                  icon={<PlusOutlined></PlusOutlined>}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options?.map(({ text, value }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖直排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
