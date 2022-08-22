import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { _fetch } from '../apis/fetch'
import { NetworkTypeInfo } from '../types'

// 获取网络类型
const getNetworkTypes = async () => {
	const { findNetworkTypes } = await _fetch({ findNetworkTypes: {} })

	if (findNetworkTypes) {
		const { success, data } = findNetworkTypes

		console.log(data);
		

		return success ? data : []
	}
	return []
}

export const networkTypeSlice = createSlice({
	name: 'networkType',
	initialState: await getNetworkTypes().then((res) => res as NetworkTypeInfo[]),
	reducers: {
		addNetworkType: (state, action: PayloadAction<NetworkTypeInfo>) => {
			return [action.payload, ...state]
		},
	},
})

export const { addNetworkType } = networkTypeSlice.actions

export default networkTypeSlice.reducer
