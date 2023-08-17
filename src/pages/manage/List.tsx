import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
// import { useSearchParams } from 'react-router-dom'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import ListSearch from '../../components/ListSearch'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'
// import { getQuestionListService } from '../../services/question'

import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/question'
const List: FC = () => {
  useTitle('My Questionnaire List')
  const { Title } = Typography

  const [started, setStarted] = useState(false) //是否开始加载

  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [searchParams] = useSearchParams()
  const haveMoreData = total > list.length
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setTotal(0)
    setList([])
  }, [keyword])
  // 加载列表
  const { run: load, loading } = useRequest(
    async () => {
      const data = getQuestionListService({
        page: page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l)) //累加上新加载的数据
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  const containerRef = useRef<HTMLDivElement>(null)
  // 尝试加载列表函数
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.documentElement.clientHeight) {
        // console.log(bottom, document.documentElement.clientHeight, document.body)
        setStarted(true)
        load()
      }
    },
    {
      wait: 500,
    }
  )

  // 初次加载
  useEffect(() => {
    // 因为第一次初始化没有数据，所以直接触发条件，加载数据
    tryLoadMore()
  }, [searchParams])

  // 页面滚动，触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  // 加载更多
  const LoadMoreContentElem = useMemo(() => {
    if (started || loading) return <Spin></Spin>
    if (total == 0) return <Empty></Empty>
    if (!haveMoreData) return <span> 没有更多了</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData])
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>My Questionnaire List</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {/* <div style={{ height: '2000px' }}></div> */}
        {/* {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )} */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q}></QuestionCard>
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}
export default List
