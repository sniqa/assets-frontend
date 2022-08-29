import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import networkTypeReducer from './networkType'
import noticeReducer from './notice'
import userReducer from './users'
import confirmReducer from './confirm'

const store = configureStore({
	reducer: {
		notice: noticeReducer,
		users: userReducer,
		networkTypes: networkTypeReducer,
		confirm: confirmReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
