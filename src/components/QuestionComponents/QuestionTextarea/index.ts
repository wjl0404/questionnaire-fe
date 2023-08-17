import Component from './Component'
import { QuestionTextareaDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'

export default {
  title: '多行输入框',
  type: 'questionTextarea',
  Component, //画布组件
  PropComponent, //修改属性组件
  defaultProps: QuestionTextareaDefaultProps,
}
