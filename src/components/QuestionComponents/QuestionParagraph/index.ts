import Component from './Component'
import { QuestionParagraphDefaultPropsType } from './interface'
import PropComponent from './PropComponent'
export * from './interface'

export default {
  title: '段落',
  type: 'questionParagraph',
  Component, //画布组件
  PropComponent, //修改属性组件
  defaultProps: QuestionParagraphDefaultPropsType,
}
