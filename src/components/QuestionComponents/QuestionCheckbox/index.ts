import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionCheckboxDefaultPropsType } from './interface'
import StatComponent from './StatComponent'
export * from './interface'

export default {
  title: '问卷信息',
  type: 'questionCheckbox',
  Component, //画布组件
  PropComponent, //修改属性组件
  defaultProps: QuestionCheckboxDefaultPropsType,
  StatComponent,
}
