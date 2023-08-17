import React, { ChangeEvent, FC, useState } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './Layers.module.scss'
import classNames from 'classnames'
import { Button, Input, Space, message } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  changeComponentTitle,
  toggleComponentLocked,
} from '../../../store/componentsReducer'
import {
  changeComponentProps,
  changeSelectedId,
  moveComponent,
} from '../../../store/componentsReducer'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()
  const [changingTitleId, setChangingTitleId] = useState('')
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id == fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中')
      return
    }
    if (selectedId != fe_id) {
      // 执行选中
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
      return
    }
    // 点击修改标题
    setChangingTitleId(fe_id)
  }

  function changeTitle(e: ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }
  function changeHidden(fe_id: string, isHidden: boolean) {
    // 切换隐藏
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }
  function changeLocked(fe_id: string) {
    // 切换锁定
    dispatch(toggleComponentLocked({ fe_id }))
  }
  // 拖拽移动功能
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c

        // 拼接title className
        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id == selectedId,
        })
        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                {changingTitleId == fe_id && (
                  <Input
                    value={title}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                    onChange={changeTitle}
                  ></Input>
                )}
                {changingTitleId != fe_id && title}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    icon={<EyeInvisibleOutlined></EyeInvisibleOutlined>}
                    type={isHidden ? 'primary' : 'text'}
                    className={!isHidden ? styles.btn : ''}
                    onClick={() => changeHidden(fe_id, !isHidden)}
                  ></Button>
                  <Button
                    size="small"
                    shape="circle"
                    icon={<LockOutlined></LockOutlined>}
                    type={isLocked ? 'primary' : 'text'}
                    className={!isLocked ? styles.btn : ''}
                    onClick={() => changeLocked(fe_id)}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
