import React, { FC, MouseEvent } from 'react'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

export type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props}></Component>
}

const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }
  useBindCanvasKeyPress()
  if (props.loading) {
    return (
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <Spin></Spin>
      </div>
    )
  }
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden) //过滤隐藏掉的组件
          .map(c => {
            const { fe_id, isLocked } = c

            const wrapperDefaultClassName = styles['component-wrapper']
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: selectedId == fe_id,
              [lockedClassName]: isLocked ? true : false,
            })

            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
