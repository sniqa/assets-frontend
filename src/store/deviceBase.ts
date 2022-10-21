import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { _fetch } from '../apis/fetch'
import type { DeviceBaseInfo } from '../types'

const getDeviceBases = async (): Promise<DeviceBaseInfo[]> => {
	const { find_device_base } = await _fetch({ find_device_base: {} })

	if (find_device_base) {
		const { success, data, errmsg } = find_device_base
		return success ? data : []
	}

	return []
}

export const deviceBaseSlice = createSlice({
	name: 'deviceBase',
	initialState: await getDeviceBases(),
	reducers: {
		setDeviceBases: (state, action: PayloadAction<DeviceBaseInfo[]>) =>
			action.payload,
		addDeviceBase: (state, action: PayloadAction<DeviceBaseInfo>) => {
			return [action.payload, ...state]
		},
		updateDeviceBase: (state, action: PayloadAction<DeviceBaseInfo>) => {
			return state.map((deviceBase) =>
				deviceBase._id === action.payload._id
					? { ...deviceBase, ...action.payload }
					: deviceBase
			)
		},
		deleteManyDeviceBase: (
			state,
			action: PayloadAction<Array<string | number>>
		) => {
			return state.filter(
				(deviceBase) =>
					!action.payload.some((target) => target === deviceBase._id)
			)
		},
	},
})

export const {
	setDeviceBases,
	addDeviceBase,
	updateDeviceBase,
	deleteManyDeviceBase,
} = deviceBaseSlice.actions

export default deviceBaseSlice.reducer
