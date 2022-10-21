import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { _fetch } from '../apis/fetch'
import { IpAddressInfo } from '../types'

const initialState: IpAddressInfo[] = []

const getIpAddress = async (): Promise<IpAddressInfo[]> => {
	const { find_ips } = await _fetch({ find_ips: {} })

	if (find_ips) {
		const { success, data, errmsg } = find_ips

		return success ? data : []
	}
	return []
}

export const ipAddressSlice = createSlice({
	name: 'networkType',
	initialState: await getIpAddress(),
	reducers: {
		setIpAddress: (state, action: PayloadAction<IpAddressInfo[]>) => {
			return (state = action.payload)
		},
		updateIpAddress: (state, action: PayloadAction<IpAddressInfo>) => {
			return state.map((ipAddress) =>
				ipAddress._id === action.payload._id
					? { ...ipAddress, ...action.payload }
					: ipAddress
			)
		},
	},
})

export const { updateIpAddress, setIpAddress } = ipAddressSlice.actions

export default ipAddressSlice.reducer
