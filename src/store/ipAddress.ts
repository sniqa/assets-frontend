import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { _fetch } from '../apis/fetch'
import { IpAddressInfo } from '../types'

// 获取ip
const getIpAddress = async (): Promise<IpAddressInfo[]> => {
	const { FIND_IPS } = await _fetch({ FIND_IPS: {} })

	if (FIND_IPS) {
		const { success, data } = FIND_IPS

		console.log(data)

		return success ? data : []
	}
	return []
}

export const ipAddressSlice = createSlice({
	name: 'networkType',
	initialState: await getIpAddress(),
	reducers: {
		updateIpAddress: (state, action: PayloadAction<IpAddressInfo>) => {
			return state.map((ipAddress) =>
				ipAddress._id === action.payload._id
					? { ...ipAddress, ...action.payload }
					: ipAddress
			)
		},
		deleteManyIpAddress: (
			state,
			action: PayloadAction<Array<string | number>>
		) => {
			return state.filter(
				(ipAddress) =>
					!action.payload.some((target) => target === ipAddress._id)
			)
		},
	},
})

export const { updateIpAddress, deleteManyIpAddress } = ipAddressSlice.actions

export default ipAddressSlice.reducer
