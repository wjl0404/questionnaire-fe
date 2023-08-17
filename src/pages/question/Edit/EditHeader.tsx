import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Typography, Space, Input, message } from 'antd'
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolBar from './EditToolBar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { updateQuestionService } from '../../../services/question'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
const { Title } = Typography

// 显示，修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)
  const dispatch = useDispatch()
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value
    if (newTitle) {
      dispatch(changePageTitle(event.target.value))
    }
  }
  if (editState) {
    return (
      <Input
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChange}
      ></Input>
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button
        icon={<EditOutlined></EditOutlined>}
        type="text"
        onClick={() => setEditState(true)}
      ></Button>
    </Space>
  )
}

// 保存按钮
const SaveButton: FC = () => {
  // 保存pageInfo componentList
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id } = useParams()
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
    }
  )
  // 快捷键保存
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })
  // 自动保存
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  )
  return (
    <Button
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined></LoadingOutlined> : null}
    >
      保存
    </Button>
  )
}

// 发布按钮
const PublishButton: FC = () => {
  const nav = useNavigate()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id } = useParams()
  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('成功发布')
        nav(`/question/stat/${id}`)
      },
    }
  )
  return (
    <Button type="primary" onClick={pub}>
      发布
    </Button>
  )
}

// 编辑器头部
const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined></LeftOutlined>} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem></TitleElem>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolBar></EditToolBar>
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton></SaveButton>
            <PublishButton></PublishButton>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
