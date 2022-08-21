import { Button } from '@mui/material'
import { useMemo, useState } from 'react'
import { _fetch } from '../../apis/fetch'
import { notice } from '../../apis/mitt'
import AddDialog from '../../components/dialogs/AddDialog'
import EditDialog from '../../components/dialogs/EditDialog'
import { AddIcon } from '../../components/icons'
import Table, { TableToolbarExtensions } from '../../components/table'
import { Operate, TableColumn } from '../../components/table/types'
import AnimateWraper from '../../components/transition/AnimateWraper'
import { useAppDispatch, useAppSelector } from '../../store'
import { addUser, deleteManyUser, updateUser } from '../../store/users'
import { UserInfo } from '../../types'

const columns: TableColumn[] = [
	{ label: '用户名称', field: 'username' },
	{ label: '昵称', field: 'nickname' },
	{ label: '部门', field: 'department' },
	{ label: '号码', field: 'number' },
]

const User = () => {
	const rows = useAppSelector((state) => state.users)

	const dispatch = useAppDispatch()

	const [openDialog, setOpenDialog] = useState(false)

	const extensions: TableToolbarExtensions = useMemo(() => {
		return [
			{
				title: '新增用户',
				icon: <AddIcon color="primary" />,
				onClick: () => setOpenDialog(!openDialog),
			},
		]
	}, [])

	// const AddContent = useMemo<AddDialogContent[]>(
	// 	() => [
	// 		{
	// 			label: '用户名称',
	// 			field: 'username',
	// 			required: true,
	// 		},
	// 		{
	// 			label: '部门',
	// 			field: 'department',
	// 		},
	// 		{
	// 			label: '部门',
	// 			field: 'department',
	// 		},
	// 		{
	// 			label: 'number',
	// 			field: 'number',
	// 		},
	// 	],
	// 	[]
	// )

	// 新增用户
	const handleCreateUser = async (userInfo: Partial<UserInfo>) => {
		const { createUser } = await _fetch({ createUser: userInfo })

		if (createUser) {
			const { success, data, errmsg } = createUser

			success
				? (dispatch(addUser({ ...data, ...userInfo })),
				  notice({ status: 'success', message: '创建用户成功' }),
				  setOpenDialog(false))
				: notice({ status: 'error', message: errmsg })
		}
	}

	// 删除用户
	const handleDeleteUser = async (data: (string | number)[]) => {
		const target = rows.filter((row) => data.includes(row._id))
		console.log(target)
		const { deleteUsers } = await _fetch({ deleteUsers: target })

		if (deleteUsers) {
			const { success, data, errmsg } = deleteUsers

			success
				? (dispatch(deleteManyUser(target)),
				  notice({ status: 'success', message: '删除用户成功' }))
				: notice({ status: 'error', message: errmsg })
		}
	}

	// 更新用户信息
	const handleModifyUser = async (userInfo: UserInfo) => {
		const { modifyUser } = await _fetch({ modifyUser: userInfo })

		if (modifyUser.success) {
			dispatch(updateUser(userInfo))
			setOpenDialog(false)
			return notice({
				status: 'success',
				message: '修改成功',
			})
		}

		notice({
			status: 'error',
			message: modifyUser.errmsg,
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
						setOpenDialog(true)
					}}
				>{`编辑`}</Button>
			),
		}),
		[]
	)

	return (
		<AnimateWraper className="w-full">
			<Table
				columns={columns}
				rows={rows}
				extensions={extensions}
				operate={operate}
				onDeleteSelection={(data) => handleDeleteUser(data)}
			/>
			<AddDialog
				open={openDialog}
				onClose={() => setOpenDialog(!openDialog)}
				title={`新增用户`}
				content={columns}
				onAdd={(val) => handleCreateUser(val)}
			/>

			{/* <AddDialog
				open={openDialog}
				onClose={() => setOpenDialog(!openDialog)}
				title={`新增用户`}
				content={columns}
				originData={editData}
				onAdd={(val) => handleCreateUser(val)}
			/> */}

			<EditDialog
				open={openDialog}
				onClose={() => setOpenDialog(!openDialog)}
				title={`新增用户`}
				content={columns}
				originData={editData}
				onAdd={(val) => handleModifyUser(val)}
			/>
		</AnimateWraper>
	)
}

export default User
