import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { useSearchParams } from 'react-router-dom'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}
function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isDeleted, isStar } = opt
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
      const data = await getQuestionListService({ keyword, isDeleted, isStar, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams],
    }
  )
  return { data, error, loading, refresh }
}

export default useLoadQuestionListData
