import { Button, TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { _fetch } from '../../apis/fetch'
import { notice, confirm } from '../../apis/mitt'
import AddDialog from '../../components/dialogs/AddDialog'
import CustomDialog, {
	CustomDialogContentProps,
} from '../../components/dialogs/CustomDialog'
import EditDialog from '../../components/dialogs/EditDialog'
import { AddIcon } from '../../components/icons'
import Table, { TableToolbarExtensions } from '../../components/table'
import { Operate, TableColumn } from '../../components/table/types'
import AnimateWraper from '../../components/transition/AnimateWraper'
import { useAppDispatch, useAppSelector } from '../../store'
import { addUser, deleteUser, setUsers, updateUser } from '../../store/users'
import { UserInfo } from '../../types'
import { UserInfoTable } from '../../tables'
import { setIpAddress } from '../../store/ipAddress'
import { setDevices } from '../../store/device'
import DialogWraper from '../../components/dialogs/DialogWraper'
import CustomSelect from '../../components/dialogs/CustomSelect'
const columns: TableColumn[] = [
	{ label: '用户名称', field: 'username' },
	{ label: '昵称', field: 'nickname' },
	{ label: '部门', field: 'department' },
	{ label: '办公室', field: 'location' },
	{ label: '号码', field: 'number' },
]

const User = () => {
	const rows = useAppSelector((state) => state.users)

	const departments = useAppSelector((state) => state.department)

	const dispatch = useAppDispatch()

	const [openEditDialog, setOpenEditDialog] = useState(false)

	const [openAddDialog, setOpenAddDialog] = useState(false)

	const extensions: TableToolbarExtensions = useMemo(() => {
		return [
			{
				title: '新增用户',
				icon: <AddIcon color="primary" />,
				onClick: () => setOpenAddDialog(!openAddDialog),
			},
		]
	}, [])

	// 新增用户
	const handleCreateUser = async (userInfo: Partial<UserInfo>) => {
		const { create_user } = await _fetch({ create_user: userInfo })

		if (create_user) {
			const { success, data, errmsg } = create_user

			success
				? (dispatch(addUser({ ...data, ...userInfo })),
				  notice({ status: 'success', message: '创建用户成功' }),
				  setOpenAddDialog(false))
				: notice({ status: 'error', message: errmsg })
		}
	}

	// 删除用户
	const handleDeleteUser = async (row: UserInfo) => {
		console.log('row', row)

		const result = await confirm({
			title: '提示',
			message: `删除用户会删除该用户名下的所有资料`,
		})

		if (!result) {
			return
		}

		const [{ delete_user }, { find_ips }, { find_devices }] = await _fetch([
			{ delete_user: row },
			{ find_ips: {} },
			{ find_devices: {} },
		])

		if (delete_user) {
			const { data, success, errmsg } = delete_user

			if (find_ips) dispatch(setIpAddress(find_ips.data))

			if (find_devices) dispatch(setDevices(find_devices.data))

			return success
				? (dispatch(deleteUser(row)),
				  notice({ status: 'success', message: `删除成功` }))
				: notice({
						status: 'error',
						message: errmsg,
				  })
		}

		return notice({
			status: 'error',
			message: '删除失败',
		})
	}

	// 更新用户信息
	const handleModifyUser = async (userInfo: UserInfo) => {
		const [{ modify_user }, { find_ips }, { find_devices }] = await _fetch([
			{ modify_user: userInfo },
			{ find_ips: {} },
			{ find_devices: {} },
		])

		if (modify_user) {
			const { success, data, errmsg } = modify_user

			if (find_ips) {
				dispatch(setIpAddress(find_ips.data))
			}
			if (find_devices) {
				dispatch(setDevices(find_devices.data))
			}

			return success
				? (dispatch(updateUser(userInfo)),
				  setOpenEditDialog(false),
				  notice({
						status: 'success',
						message: '修改成功',
				  }))
				: notice({
						status: 'error',
						message: errmsg,
				  })
		}

		return notice({
			status: 'error',
			message: '修改用户失败',
		})
	}

	// 编辑时的旧数据
	const [editData, setEditData] = useState<UserInfo>({
		_id: '',
		department: '',
		location: '',
		username: '',
	})

	// 操作栏
	const operate = useMemo<Operate>(
		() => ({
			header: '操作',
			cell: (value) => (
				<>
					<Button
						size="small"
						onClick={() => {
							setEditData(value)
							setOpenEditDialog(true)
						}}
					>{`编辑`}</Button>
					<Button
						size="small"
						onClick={() => {
							handleDeleteUser(value)
						}}
					>{`删除`}</Button>
				</>
			),
		}),
		[]
	)

	const [userInfo, setUserInfo] = useState({
		username: '',
		department: '',
		location: '',
	})

	const addContent: CustomDialogContentProps[] = [
		{
			label: '用户名称',
			type: 'text',
			required: true,
			onChange: (val) => setUserInfo((old) => ({ ...old, username: val })),
		},
		{
			label: '部门',
			type: 'select',
			options: departments.map((department) => department.department_name),
			onChange: (val) => setUserInfo((old) => ({ ...old, department: val })),
		},
		{
			label: '办公室',
			type: 'select',
			options: departments.flatMap((department) => department.locations),
			onChange: (val) => setUserInfo((old) => ({ ...old, location: val })),
		},
	]

	return (
		<AnimateWraper className="w-full">
			<UserInfoTable
				// columns={columns}
				rows={rows}
				extensions={extensions}
				operate={operate}
				// onDeleteSelection={(data) => handleDeleteUsers(data)}
			/>

			{openAddDialog && (
				<CustomDialog
					title="新增用户"
					open={openAddDialog}
					onClose={() => setOpenAddDialog(false)}
					contents={addContent}
					onOk={() => handleCreateUser(userInfo)}
				/>
			)}

			{openEditDialog && (
				<DialogWraper
					title={`编辑用户`}
					open={openEditDialog}
					onClose={() => setOpenEditDialog(false)}
					onOk={() => handleModifyUser(editData)}
				>
					<div className="w-1/2 p-2">
						<TextField
							label={`用户名称`}
							size="small"
							value={editData.username}
							onChange={(e) =>
								setEditData({ ...editData, username: e.target.value })
							}
						/>
					</div>

					<CustomSelect
						label={`部门`}
						value={editData.department}
						options={departments.map(
							(department) => department.department_name
						)}
						onChange={(val) => setEditData({ ...editData, department: val })}
					/>

					<CustomSelect
						label={`办公室`}
						value={editData.location}
						options={departments.flatMap((department) => department.locations)}
						onChange={(val) => setEditData({ ...editData, location: val })}
					/>
				</DialogWraper>
			)}
		</AnimateWraper>
	)
}

export default User
