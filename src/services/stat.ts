import axios, { ResDataType } from './ajax'
const target = 'https://questionnaire-mock-two.vercel.app'
// 获取问卷统计
export async function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = target + `/api/stat/${questionId}`
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}

export async function getComponentStatService(
  questionId: string,
  componentId: string
): Promise<ResDataType> {
  const url = target + `/api/stat/${questionId}/${componentId}`
  const data = (await axios.get(url)) as ResDataType
  return data
}
