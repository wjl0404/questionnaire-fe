import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { useRequest, useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { deleteQuestionService, updateQuestionService } from '../../services/question'
import ListPage from '../../components/ListPage'

const Trash: FC = () => {
  const { Title } = Typography
  const { confirm } = Modal
  // const [questionList, setQuestionList] = useState(rawQuestionList)
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, {
          isDeleted: false,
        })
      }
    },
    {
      manual: true,
      debounceWait: 500, //防抖
      onSuccess() {
        message.success('恢复成功')
        refresh() //刷新
        setSelectedIds([])
      },
    }
  )

  const { run: deleteQuestion } = useRequest(async () => await deleteQuestionService(selectedIds), {
    manual: true,
    onSuccess() {
      message.success('彻底删除成功')
      refresh()
      setSelectedIds([])
    },
  })
  function del() {
    confirm({
      title: '是否彻底删除',
      icon: <ExclamationCircleOutlined></ExclamationCircleOutlined>,
      content: '删除之后就找不回来了',
      onOk: deleteQuestion,
    })
  }
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length == 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length == 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectRowKeys => {
            // console.log(selectRowKeys)
            setSelectedIds(selectRowKeys as string[])
          },
        }}
      ></Table>
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length == 0 && <Empty description="暂无数据"></Empty>}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total}></ListPage>
      </div>
    </>
  )
}

export default Trash
