import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { _fetch } from '../apis/fetch'
import type {DeviceBaseInfo} from '../types'

const getDeviceBases = async (): Promise<Array<DeviceBaseInfo>> => {
 
    const {FIND_DEVICE_BASE} =	await _fetch({ FIND_DEVICE_BASE: {} })
            
            if (FIND_DEVICE_BASE) {
                const { success, data } = FIND_DEVICE_BASE
                return success ? data : [] 
            }
        
        return []
}

export const deviceBaseSlice = createSlice({
    name: 'deviceBase',
    initialState: await getDeviceBases() || [],
    reducers: {
        addDeviceBase: (state, action: PayloadAction<DeviceBaseInfo>) => {
            return [action.payload, ...state]
        },
        updateDeviceBase: (state, action: PayloadAction<DeviceBaseInfo>) => {
            return state.map((deviceBase) =>
            deviceBase._id === action.payload._id ? { ...deviceBase, ...action.payload } : deviceBase
        )
        },
        deleteManyDeviceBase: (state, action: PayloadAction<Array<string | number>>) => {
            return state.filter(
				(deviceBase) =>
					!action.payload.some((target) => target === deviceBase._id)
			)
        }
    }
}) 

export const {addDeviceBase, updateDeviceBase, deleteManyDeviceBase} = deviceBaseSlice.actions

export default deviceBaseSlice.reducer