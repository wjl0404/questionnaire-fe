import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer/index'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'

export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentsStateType>
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,
    // 没有undo
    // components: componentsReducer,
    // 增加undo效果
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponents',
        'components/selectNextComponent',
        'components/selectPreComponent',
        'components/changeSelectedId',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
})
