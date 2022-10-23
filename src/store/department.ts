import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { _fetch } from '../apis/fetch'
import type { DepartmentInfo } from '../types'

const getDepartments = async (): Promise<DepartmentInfo[]> => {
	const { find_departments } = await _fetch({ find_departments: {} })

	if (find_departments) {
		const { success, data, errmsg } = find_departments

		return success ? data : []
	}

	return []
}

const departmentSlice = createSlice({
	name: 'department',
	initialState: await getDepartments(),
	reducers: {
		setDepartments: (state, action: PayloadAction<DepartmentInfo[]>) =>
			action.payload,
		addDepartment: (state, action: PayloadAction<DepartmentInfo>) => {
			return [action.payload, ...state]
		},
		updateDepartment: (state, action: PayloadAction<DepartmentInfo>) => {
			return state.map((department) =>
				department._id === action.payload._id
					? { ...department, ...action.payload }
					: department
			)
		},
		deleteManyDepartment: (
			state,
			action: PayloadAction<Array<string | number>>
		) => {
			return state.filter(
				(department) =>
					!action.payload.some((target) => target === department._id)
			)
		},
		deleteOneDepartment: (state, action: PayloadAction<string | number>) => {
			return state.filter((department) => department._id != action.payload)
		},
	},
})

export const {
	setDepartments,
	addDepartment,
	updateDepartment,
	deleteManyDepartment,
	deleteOneDepartment,
} = departmentSlice.actions

export default departmentSlice.reducer
