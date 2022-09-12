import { Button } from '@mui/material'
import { useMemo, useState } from 'react'
import { _fetch } from '../../apis/fetch'
import { notice } from '../../apis/mitt'
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
import { addUser, deleteManyUser, updateUser } from '../../store/users'
import { UserInfo } from '../../types'
import { UserInfoTable } from '../../tables'
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

			console.log({ ...data, ...userInfo })

			success
				? (dispatch(addUser({ ...data, ...userInfo })),
				  notice({ status: 'success', message: '创建用户成功' }),
				  setOpenAddDialog(false))
				: notice({ status: 'error', message: errmsg })
		}
	}

	// 删除用户
	const handleDeleteUser = async (ids: (string | number)[]) => {
		const { delete_user } = await _fetch({ delete_user: [ids] })

		if (delete_user) {
			const { success, data, errmsg } = delete_user

			return success
				? (dispatch(deleteManyUser(ids)),
				  notice({ status: 'success', message: '删除用户成功' }))
				: notice({ status: 'error', message: errmsg })
		}
		return notice({
			status: 'error',
			message: '删除失败',
		})
	}

	// 更新用户信息
	const handleModifyUser = async (userInfo: UserInfo) => {
		const { modify_user } = await _fetch({ modify_user: userInfo })

		if (modify_user.success) {
			dispatch(updateUser(userInfo))
			setOpenEditDialog(false)
			return notice({
				status: 'success',
				message: '修改成功',
			})
		}

		notice({
			status: 'error',
			message: modify_user.errmsg,
		})
	}

	// 编辑时的旧数据
	const [editData, setEditData] = useState({})

	// 操作栏
	const operate = useMemo<Operate>(
		() => ({
			header: '操作',
			cell: (value) => (
				<Button
					onClick={() => {
						setEditData(value)
						setOpenEditDialog(true)
					}}
				>{`编辑`}</Button>
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
	const editContent: CustomDialogContentProps[] = useMemo(
		() => [],
		[departments]
	)

	return (
		<AnimateWraper className="w-full">
			<UserInfoTable
				// columns={columns}
				rows={rows}
				extensions={extensions}
				operate={operate}
				onDeleteSelection={(data) => handleDeleteUser(data)}
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
				<CustomDialog
					title={`编辑用户`}
					open={openEditDialog}
					onClose={() => setOpenEditDialog(false)}
					contents={editContent}
				/>
			)}
		</AnimateWraper>
	)
}

export default User
