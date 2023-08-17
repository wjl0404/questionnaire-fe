import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
} from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
const EditToolBar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  const length = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id == selectedId)
  const isFirst = selectedIndex <= 0 //第一个
  const isLast = selectedIndex + 1 >= length //最后一个
  const dispatch = useDispatch()
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }
  function copy() {
    dispatch(copySelectedComponent())
  }
  function paste() {
    dispatch(pasteCopiedComponent())
  }
  function moveUp() {
    if (isFirst) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }
  function moveDown() {
    if (isLast) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }
  function undo() {
    // 撤销
    dispatch(UndoActionCreators.undo())
  }
  function redo() {
    // 重做
    dispatch(UndoActionCreators.redo())
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined></DeleteOutlined>}
          onClick={handleDelete}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined></EyeInvisibleOutlined>}
          onClick={handleHidden}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined></LockOutlined>}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined></CopyOutlined>}
          onClick={copy}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined></BlockOutlined>}
          onClick={paste}
          type={isLocked ? 'primary' : 'default'}
          disabled={!copiedComponent}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined></UpOutlined>}
          onClick={moveUp}
          type={isLocked ? 'primary' : 'default'}
          disabled={isFirst}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined></DownOutlined>}
          onClick={moveDown}
          type={isLocked ? 'primary' : 'default'}
          disabled={isLast}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined></UndoOutlined>} onClick={undo}></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined></RedoOutlined>} onClick={redo}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolBar
