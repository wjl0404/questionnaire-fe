import React, { FC } from 'react'
import { OptionType, QuestionCheckboxPropsType } from './interface'
import { Form, Input, Checkbox, Space, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
const PropComponent: FC = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [], onChange, disabled } = props
  const [form] = Form.useForm()
  function handleValuesChange() {
    if (onChange == null) return
    const newFieldValue = form.getFieldsValue() as QuestionCheckboxPropsType
    if (newFieldValue.list) {
      newFieldValue.list = newFieldValue.list.filter(item => !(item.text == null))
    }
    const { list = [] } = newFieldValue
    list.forEach((o: OptionType) => {
      if (o.value) return
      o.value = nanoid(5) //补齐options选项中缺少的value
    })

    onChange(newFieldValue)
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖直排列</Checkbox>
      </Form.Item>
      {/* 选项 */}
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有选项 提供删除功能 */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '输入选项' },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue()
                            let num = 0
                            list.forEach((opt: OptionType) => {
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
                    {index > 0 && (
                      <MinusCircleOutlined onClick={() => remove(name)}></MinusCircleOutlined>
                    )}
                  </Space>
                )
              })}
              {/* 添加选项 */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '', checked: false })}
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
    </Form>
  )
}

export default PropComponent
