import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { _fetch } from '../apis/fetch'
import { UserInfo } from '../types'

const getUsers = async (): Promise<UserInfo[]> => {
	const { find_users } = await _fetch({ find_users: {} })

	if (find_users) {
		const { success, data, errmsg } = find_users

		return success ? data : []
	}
	return []
}

export const userSlice = createSlice({
	name: 'user',
	initialState: await getUsers(),
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
		deleteUser: (state, action: PayloadAction<UserInfo>) => {
			return state.filter((user) => user._id != action.payload._id)
		},
	},
})

export const { setUsers, addUser, updateUser, findUsers, deleteUser } =
	userSlice.actions

export default userSlice.reducer
