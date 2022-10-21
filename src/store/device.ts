import { _fetch } from './../apis/fetch'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DeviceInfo } from '../types'

const getDevices = async (): Promise<DeviceInfo[]> => {
	try {
		const { find_devices } = await _fetch({
			find_devices: {},
		})
		if (find_devices) {
			const { success, data, errmsg } = find_devices

			return success ? data : []
		}
	} catch {
		return []
	}
	return []
}

export const deviceSlice = createSlice({
	name: 'device',
	initialState: await getDevices(),
	reducers: {
		setDevices: (state, action: PayloadAction<DeviceInfo[]>) => action.payload,
		addDevice: (state, action: PayloadAction<DeviceInfo>) => {
			return [action.payload, ...state]
		},
		updateDevice: (state, action: PayloadAction<DeviceInfo>) => {
			return state.map((device) =>
				device._id === action.payload._id
					? { ...device, ...action.payload }
					: device
			)
		},
		deleteManyDevice: (
			state,
			action: PayloadAction<Array<string | number>>
		) => {
			return state.filter(
				(device) => !action.payload.some((target) => target === device._id)
			)
		},
		deleteDevice: (state, action: PayloadAction<DeviceInfo>) => {
			return state.filter((device) => device._id != action.payload._id)
		},
	},
})

export const {
	setDevices,
	addDevice,
	updateDevice,
	deleteManyDevice,
	deleteDevice,
} = deviceSlice.actions

export default deviceSlice.reducer
