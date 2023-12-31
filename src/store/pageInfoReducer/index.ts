import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}

const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo(state: PageInfoType, action: PayloadAction<PageInfoType>) {
      return action.payload
    },
    changePageTitle(state: PageInfoType, action: PayloadAction<string>) {
      state.title = action.payload
    },
  },
})

export default pageInfoSlice.reducer
export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions
