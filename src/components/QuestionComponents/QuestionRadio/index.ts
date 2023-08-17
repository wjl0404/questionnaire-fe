import Component from './Component'
import { QuestionRadioDefaultPropsType } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
import StatComponent from './StatComponent'

export default {
  title: '段落',
  type: 'questionRadio',
  Component, //画布组件
  PropComponent, //修改属性组件
  defaultProps: QuestionRadioDefaultPropsType,
  // 统计组件
  StatComponent,
}
