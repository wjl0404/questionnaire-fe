import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
// import { produce } from 'immer'
import { getNextSelectedId, insertNewComponent } from './util'
import cloneDeep from 'lodash.clonedeep'
import { arrayMove } from '@dnd-kit/sortable'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
  isHidden?: boolean
  isLocked?: boolean
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
}

export const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置组件
    resetComponents(state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) {
      return action.payload
    },
    // 修改组件
    changeSelectedId(state: ComponentsStateType, action: PayloadAction<string>) {
      state.selectedId = action.payload
    },

    // changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
    //   draft.selectedId = action.payload
    // }),
    // 添加组件
    addComponent(state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) {
      const newComponent = action.payload
      // const { selectedId, componentList } = state
      // const index = componentList.findIndex(c => c.fe_id == selectedId)
      // if (index < 0) {
      //   componentList.push(newComponent)
      // } else {
      //   componentList.splice(index + 1, 0, newComponent)
      // }
      // state.selectedId = newComponent.fe_id
      insertNewComponent(state, newComponent)
    },
    // addComponent: produce(
    //   (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
    //     const newComponent = action.payload
    //     const { selectedId, componentList } = draft
    //     const index = componentList.findIndex(c => c.fe_id == selectedId)
    //     if (index < 0) {
    //       draft.componentList.push(newComponent)
    //     } else {
    //       draft.componentList.splice(index + 1, 0, newComponent)
    //     }
    //     draft.selectedId = newComponent.fe_id
    //   }
    // ),
    // 修改组件
    changeComponentProps(
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) {
      const { fe_id, newProps } = action.payload
      const curComp = state.componentList.find(c => c.fe_id == fe_id)
      if (curComp) {
        curComp.props = { ...curComp.props, ...newProps }
      }
    },
    // 删除选中组件
    removeSelectedComponent(state: ComponentsStateType) {
      const { componentList = [], selectedId: removeId } = state
      // 重新计算selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList)
      state.selectedId = newSelectedId

      const index = componentList.findIndex(c => c.fe_id == removeId)
      componentList.splice(index, 1)
    },
    // 隐藏/显示组件
    changeComponentHidden(
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) {
      let newSelectedId = ''
      const { componentList } = state
      const { fe_id, isHidden } = action.payload
      // 重新计算selectedId
      if (isHidden) {
        // 隐藏该组件
        newSelectedId = getNextSelectedId(fe_id, componentList)
      } else {
        // 显示该组件
        newSelectedId = fe_id
      }
      state.selectedId = newSelectedId

      const curComp = componentList.find(c => c.fe_id == fe_id)
      if (curComp) {
        curComp.isHidden = isHidden
      }
    },
    // 锁定/解锁组件
    toggleComponentLocked(state: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) {
      const { fe_id } = action.payload
      const curComp = state.componentList.find(c => c.fe_id == fe_id)
      if (!curComp) {
        return
      }
      curComp.isLocked = !curComp.isLocked
    },
    // 复制选中组件
    copySelectedComponent(state: ComponentsStateType) {
      const { selectedId = '', componentList = [] } = state
      const selectedComponent = componentList.find(c => c.fe_id == selectedId)
      if (!selectedComponent) return
      state.copiedComponent = cloneDeep(selectedComponent) //深拷贝选中组件
    },
    // 粘贴选中组件
    pasteCopiedComponent(state: ComponentsStateType) {
      const { copiedComponent } = state
      if (!copiedComponent) return
      copiedComponent.fe_id = nanoid()
      insertNewComponent(state, copiedComponent)
    },
    // 选中上一个
    selectPreComponent(state: ComponentsStateType) {
      const { selectedId, componentList } = state
      const preIndex = componentList.findIndex(c => c.fe_id == selectedId) - 1 //上一个的索引值
      if (preIndex >= 0) {
        state.selectedId = componentList[preIndex].fe_id
      }
    },
    // 选中下一个
    selectNextComponent(state: ComponentsStateType) {
      const { selectedId, componentList } = state
      const selectIndex = componentList.findIndex(c => c.fe_id == selectedId) //当前选中索引值
      if (selectIndex < 0) {
        return
      }
      if (selectIndex == componentList.length - 1) return
      state.selectedId = componentList[selectIndex + 1].fe_id
    },
    // 修改组件标题
    changeComponentTitle(
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; title: string }>
    ) {
      const { fe_id, title } = action.payload
      const { componentList } = state
      if (!title) {
        return
      }
      const curComp = componentList.find(c => c.fe_id == fe_id)
      if (!curComp) {
        return
      }
      curComp.title = title
    },
    // 移动组件
    moveComponent(
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) {
      const { componentList: curComponentList } = state
      const { oldIndex, newIndex } = action.payload
      state.componentList = arrayMove(curComponentList, oldIndex, newIndex)
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPreComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentSlice.actions
export default componentSlice.reducer
