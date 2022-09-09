import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { _fetch } from '../apis/fetch'
import type {DepartmentInfo} from '../types'

const getDepartments = async (): Promise<Array<DepartmentInfo>> => {
    const { FIND_DEPARTMENT } = await _fetch({ FIND_DEPARTMENT: {} })

			if (FIND_DEPARTMENT) {
				const { success, data, errmsg } = FIND_DEPARTMENT


				return success ? data : []
			}

            return []
		}

const departmentSlice = createSlice({
    name: 'department',
    initialState: await getDepartments() || [],
    reducers: {
        addDepartment: (state, action: PayloadAction<DepartmentInfo>) => {
            return [action.payload, ...state]
        },
        updateDepartment: (state, action: PayloadAction<DepartmentInfo>) => {
            return state.map((department) =>
            department._id === action.payload._id ? { ...department, ...action.payload } : department
        )
        },
        deleteManyDepartment: (state, action: PayloadAction<Array<string | number>>) => {
            return state.filter(
				(department) =>
					!action.payload.some((target) => target === department._id)
			)
        }
    }
})

export const {addDepartment, updateDepartment, deleteManyDepartment} = departmentSlice.actions

export default departmentSlice.reducer 