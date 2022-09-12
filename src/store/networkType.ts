import { ActionTypes } from '@mui/base'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { _fetch } from '../apis/fetch'
import { NetworkTypeInfo } from '../types'

// 获取网络类型
const getNetworkTypes = async (): Promise<NetworkTypeInfo[]> => {
	const { find_network_types } = await _fetch({ find_network_types: {} })

	if (find_network_types) {
		const { success, data } = find_network_types

		return success ? data : []
	}
	return []
}

export const networkTypeSlice = createSlice({
	name: 'networkType',
	initialState: await getNetworkTypes(),
	reducers: {
		setNetworkType: (state, action: PayloadAction<NetworkTypeInfo[]>) =>
			action.payload,
		addNetworkType: (state, action: PayloadAction<NetworkTypeInfo>) => {
			return [action.payload, ...state]
		},
		updateNetworkType: (state, action: PayloadAction<NetworkTypeInfo>) => {
			return state.map((networkType) =>
				networkType._id === action.payload._id
					? { ...networkType, ...action.payload }
					: networkType
			)
		},
		deleteManyNetworkTypes: (
			state,
			action: PayloadAction<Array<string | number>>
		) => {
			return state.filter(
				(networkType) =>
					!action.payload.some((target) => target === networkType._id)
			)
		},
		deleteNetworkTypes: (state, action: PayloadAction<NetworkTypeInfo>) => {
			return state.filter(
				(networkType) => networkType._id != action.payload._id
			)
		},
	},
})

export const {
	setNetworkType,
	addNetworkType,
	deleteNetworkTypes,
	updateNetworkType,
} = networkTypeSlice.actions

export default networkTypeSlice.reducer
