import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'
function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  // ajax加载问卷
  const { data, loading, run, error } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷id')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (!data) return
    const { title, componentList, desc = '', css = '', js = '', isPublished = false } = data
    let selectedId = ''
    if (componentList.length) {
      selectedId = componentList[0].fe_id
    }
    // 把componentList 存到store
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
    // 把pageInfo 存到store
    dispatch(resetPageInfo({ title, desc, css, js, isPublished }))
  }, [data])

  // id变化 手动执行加载
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
