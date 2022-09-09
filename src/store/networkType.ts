import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { _fetch } from '../apis/fetch'
import { NetworkTypeInfo } from '../types'

// 获取网络类型
const getNetworkTypes = async (): Promise<NetworkTypeInfo[]> => {
	const { FIND_NETWORK_TYPE } = await _fetch({ FIND_NETWORK_TYPE: {} })

	if (FIND_NETWORK_TYPE) {
		const { success, data } = FIND_NETWORK_TYPE

		return success ? data : []
	}
	return []
}

export const networkTypeSlice = createSlice({
	name: 'networkType',
	initialState: await getNetworkTypes(),
	reducers: {
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
	},
})

export const { addNetworkType } = networkTypeSlice.actions

export default networkTypeSlice.reducer
