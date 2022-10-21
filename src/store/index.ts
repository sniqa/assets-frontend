import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import networkTypeReducer from './networkType'
import userReducer from './users'
import confirmReducer from './confirm'
import departmentReducer from './department'
import deviceBaseReducer from './deviceBase'
import ipAddressReducer from './ipAddress'
import deviceReducer from './device'

const store = configureStore({
	reducer: {
		users: userReducer,
		networkTypes: networkTypeReducer,
		confirm: confirmReducer,
		department: departmentReducer,
		deviceBase: deviceBaseReducer,
		devices: deviceReducer,
		ipAddress: ipAddressReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
