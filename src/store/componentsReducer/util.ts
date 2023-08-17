import { ComponentInfoType, ComponentsStateType } from '.'

export function getNextSelectedId(fe_id: string, componentList: Array<ComponentInfoType>) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(c => c.fe_id == fe_id)
  if (index < 0) {
    return ''
  }
  let newIndex = ''
  const length = visibleComponentList.length
  if (length == 1) {
    newIndex = ''
  } else {
    if (index + 1 == length) {
      newIndex = visibleComponentList[index - 1].fe_id
    } else {
      newIndex = visibleComponentList[index + 1].fe_id
    }
  }
  return newIndex
}

export function insertNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = state
  const index = componentList.findIndex(c => c.fe_id == selectedId)
  if (index < 0) {
    componentList.push(newComponent)
  } else {
    componentList.splice(index + 1, 0, newComponent)
  }
  state.selectedId = newComponent.fe_id
}
