export type OptionType = {
  text: string
  value: string
  checked: boolean
}

export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: Array<OptionType>
  onChange?: (newProps: QuestionCheckboxPropsType) => void
  disabled?: boolean
}

export const QuestionCheckboxDefaultPropsType: QuestionCheckboxPropsType = {
  title: '多选',
  isVertical: false,
  list: [
    { value: 'item1', text: '选项1', checked: false },
    { value: 'item2', text: '选项2', checked: false },
  ],
}

// 统计组件的属性类型
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
