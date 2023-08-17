import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }
  return (
    <div className={styles.container}>
      <EditHeader></EditHeader>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          {/* <div className={styles.left}>left</div> */}
          <div className={styles.left}>
            <LeftPanel></LeftPanel>
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <div style={{ height: '900px' }}>
                <EditCanvas loading={loading}></EditCanvas>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel></RightPanel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
