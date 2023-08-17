import Component from './Component'
import { QuestionInfoDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component, //画布组件
  PropComponent, //修改属性组件
  defaultProps: QuestionInfoDefaultProps,
}
