import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NoticebarStatus } from '../types'

const initialState: NoticebarStatus = {
	status: 'success',
	message: '',
}

export const noticeSlice = createSlice({
	name: 'noticeSlice',
	initialState,
	reducers: {
		notice: (state, action: PayloadAction<NoticebarStatus>) => {
			return action.payload
		},
		removeNotice: (state) => {
			return { ...state, message: '' }
		},
	},
})

export const { notice, removeNotice } = noticeSlice.actions

export default noticeSlice.reducer
