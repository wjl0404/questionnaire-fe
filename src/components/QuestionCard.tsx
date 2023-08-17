import React, { FC, useState } from 'react'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import styles from './QuestionCard.module.scss'
import { useNavigate, Link } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { updateQuestionService, duplicateQuestionService } from '../services/question'
type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已更新')
      },
    }
  )

  const { confirm } = Modal
  const nav = useNavigate()
  // function duplicate() {
  //   message.success('复制')
  // }
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result: any) {
        message.success('复制')
        nav(`/question/edit/${result.id}`)
      },
    }
  )

  const [deleteState, setDeleteState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setDeleteState(true)
      },
    }
  )
  function del() {
    confirm({
      title: '删除该问卷吗？',
      icon: <ExclamationCircleOutlined></ExclamationCircleOutlined>,
      onOk: deleteQuestion,
    })
  }
  if (deleteState) {
    return null
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }}></StarOutlined>}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷:{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px' }}></Divider>
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined></EditOutlined>}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined></LineChartOutlined>}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              icon={<StarOutlined></StarOutlined>}
              type="text"
              size="small"
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm title="确认复制吗？" okText="复制" cancelText="取消" onConfirm={duplicate}>
              <Button
                icon={<CopyOutlined></CopyOutlined>}
                type="text"
                size="small"
                disabled={duplicateLoading}
              >
                复制
              </Button>
            </Popconfirm>
            <Button
              icon={<DeleteOutlined></DeleteOutlined>}
              type="text"
              size="small"
              onClick={del}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
export default QuestionCard
