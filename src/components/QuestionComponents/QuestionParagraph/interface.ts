export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean
  onChange?: (newProps: QuestionParagraphPropsType) => void
  disabled?: boolean
}
export const QuestionParagraphDefaultPropsType: QuestionParagraphPropsType = {
  text: '一行段落',
  isCenter: false,
}
