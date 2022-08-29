import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfirmState {
	state: boolean
}

const initialState = false

export const confirmSlice = createSlice({
	name: 'confirmSlice',
	initialState,
	reducers: {
		ok: (state) => {
			return true
		},
		cancel: (state) => {
			return false
		},
	},
})

export const { ok, cancel } = confirmSlice.actions

export default confirmSlice.reducer
