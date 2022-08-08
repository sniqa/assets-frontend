import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// import usersReducer from './user'
// import devicesReducer from './devices'
// import netTypeReducer from './netTypes'
// import documentReducer from './document'
import tableBodySizeReducer from './tableBodySize'

const store = configureStore({
	reducer: {
		tableBodySize: tableBodySizeReducer,
		// document: documentReducer,
		// users: usersReducer,
		// devices: devicesReducer,
		// netTypes: netTypeReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
