import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { _fetch } from '../apis/fetch'
import { UserInfo } from '../types'

const getUser = async (): Promise<Array<UserInfo>> => {
	const { find_users } = await _fetch({ find_users: {} })

	if (find_users) {
		const { success, data } = find_users

		return success ? data : []
	}
	return []
}
// const initialState: UserInfo[] = []

export const userSlice = createSlice({
	name: 'user',
	initialState: (await getUser().catch((err) => [])) || [],
	reducers: {
		setUsers: (state, action: PayloadAction<Array<UserInfo>>) => {
			return (state = action.payload)
		},
		addUser: (state, action: PayloadAction<UserInfo>) => {
			return [action.payload, ...state]
		},
		updateUser: (state, action: PayloadAction<UserInfo>) => {
			return state.map((user) =>
				user._id === action.payload._id ? { ...user, ...action.payload } : user
			)
		},
		findUsers: (state, action: PayloadAction<UserInfo>) => {
			return state.filter((user) => user === action.payload)
		},
		deleteManyUser: (state, action: PayloadAction<Array<string | number>>) => {
			return state.filter(
				(user) => !action.payload.some((target) => target === user._id)
			)
		},
	},
})

export const { setUsers, addUser, updateUser, findUsers, deleteManyUser } =
	userSlice.actions

export default userSlice.reducer
