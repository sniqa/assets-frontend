import { Button, TextField, TextFieldProps } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { _fetch } from '../../apis/fetch'
import { confirm, notice } from '../../apis/mitt'
import AddDialog from '../../components/dialogs/AddDialog'
import CustomDialog from '../../components/dialogs/CustomDialog'
import DialogWraper from '../../components/dialogs/DialogWraper'
import { AddIcon } from '../../components/icons'
import Table, {
	TableColumn,
	TableDialog,
	TableRow,
	TableToolbarExtensions,
} from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'

interface UsbKeyInfo {
	number: string
	user: string
	enable_time: string
	collection_time: string
	remark: string
}
type UsbKeyInfoWithId = UsbKeyInfo & { _id: string }

const columns: TableColumn[] = [
	{ label: '证书编号', field: 'number' },
	{ label: '使用人', field: 'user' },
	{ label: '启用时间', field: 'enable_time' },
	{ label: '领用时间', field: 'collection_time' },
	{ label: '备注', field: 'remark' },
]

const UsbKey = () => {
	const [rows, setRows] = useState<UsbKeyInfoWithId[]>([])

	const [openAddDialog, setOpenAddDialog] = useState(false)

	const [openEditDialog, setOpenEditDialog] = useState(false)

	//临时存放新增的数据
	const [addNewData, setAddNewData] = useState<UsbKeyInfo>({
		number: '',
		user: '',
		enable_time: '',
		collection_time: '',
		remark: '',
	})

	// 临时存放编辑时的数字证书数据
	const [editData, setEditData] = useState<UsbKeyInfoWithId>({
		_id: '',
		number: '',
		user: '',
		enable_time: '',
		collection_time: '',
		remark: '',
	})

	// 创建数字证书
	const createUsbKey = useCallback(async () => {
		const { create_usb_key } = await _fetch({ create_usb_key: addNewData })

		if (create_usb_key) {
			const { success, data, errmsg } = create_usb_key

			return success
				? (setRows((olds: any) => [{ _id: data, ...addNewData }, ...olds]),
				  notice({
						status: 'success',
						message: '创建数字证书成功',
				  }))
				: notice({
						status: 'error',
						message: errmsg,
				  })
		}

		notice({
			status: 'error',
			message: `创建数字证书失败`,
		})
	}, [addNewData])

	// 编辑数字证书
	const modifyUsbKey = useCallback(async () => {
		const { modify_usb_key } = await _fetch({ modify_usb_key: editData })

		if (modify_usb_key) {
			const { success, data, errmsg } = modify_usb_key

			if (success) {
				setRows((olds) =>
					olds.map((old) => (old._id === editData._id ? editData : old))
				)

				return notice({
					status: 'success',
					message: `变更数字证书成功`,
				})
			}

			return notice({
				status: 'error',
				message: errmsg,
			})
		}

		notice({
			status: 'error',
			message: `变更数字证书失败`,
		})
	}, [editData])

	// 删除数字证书
	const deleteUseKey = useCallback(async (row: UsbKeyInfoWithId) => {
		const isSure = await confirm({
			title: '提示',
			message: `确定删除此数字证书?`,
		})

		if (!isSure) {
			return
		}

		const { delete_usb_key } = await _fetch({ delete_usb_key: row })

		if (delete_usb_key) {
			const { success, data, errmsg } = delete_usb_key

			if (success) {
				setRows((olds) => olds.filter((old) => old._id != row._id))

				return notice({
					status: 'success',
					message: `删除数字证书成功`,
				})
			}

			return notice({
				status: 'error',
				message: errmsg,
			})
		}

		notice({
			status: 'error',
			message: '删除数字证书失败',
		})
	}, [])

	// 初始化数据
	useEffect(() => {
		const getUsbKeys = async () => {
			const { find_usb_key } = await _fetch({ find_usb_key: {} })

			if (find_usb_key) {
				const { success, data } = find_usb_key

				success && setRows(data)
			}
		}

		getUsbKeys()
	}, [])

	// 扩展栏
	const extensions: TableToolbarExtensions = [
		{
			icon: <AddIcon color="primary" />,
			title: '新增',
			onClick: () => setOpenAddDialog(true),
		},
	]

	// 操作列
	const operate = useMemo(
		() => ({
			header: '操作',
			cell: (row: any) => (
				<>
					<Button
						onClick={() => (setOpenEditDialog(true), setEditData(row))}
					>{`编辑`}</Button>
					<Button onClick={() => deleteUseKey(row)}>{`删除`}</Button>
				</>
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
				// onDeleteSelection={onDeleteSelection}
			/>

			{/* 新增数字证书弹窗 */}
			{openAddDialog ? (
				<DialogWraper
					open={openAddDialog}
					onClose={() => setOpenAddDialog(false)}
					title={'新增数字证书'}
					onOk={() => (createUsbKey(), setOpenAddDialog(false))}
				>
					<CustomInput
						label={`证书编号`}
						onChange={(e) =>
							setAddNewData({ ...addNewData, number: e.target.value })
						}
					/>

					<CustomInput
						label={`使用人`}
						onChange={(e) =>
							setAddNewData({ ...addNewData, user: e.target.value })
						}
					/>

					<CustomInput
						label={`启用时间`}
						onChange={(e) =>
							setAddNewData({ ...addNewData, enable_time: e.target.value })
						}
					/>

					<CustomInput
						label={`领用时间`}
						onChange={(e) =>
							setAddNewData({ ...addNewData, collection_time: e.target.value })
						}
					/>

					<div className="w-full p-2">
						<TextField
							multiline
							label="备注"
							className="w-full"
							rows={3}
							onChange={(e) =>
								setAddNewData({ ...addNewData, remark: e.target.value })
							}
						/>
					</div>
				</DialogWraper>
			) : (
				<></>
			)}

			{openEditDialog ? (
				<DialogWraper
					open={openEditDialog}
					onClose={() => setOpenEditDialog(false)}
					title={`编辑数字证书`}
					onOk={() => (modifyUsbKey(), setOpenEditDialog(false))}
				>
					<CustomInput
						label={`证书编号`}
						value={editData.number}
						onChange={(e) =>
							setEditData({ ...editData, number: e.target.value })
						}
					/>

					<CustomInput
						label={`使用人`}
						value={editData.user}
						onChange={(e) => setEditData({ ...editData, user: e.target.value })}
					/>

					<CustomInput
						label={`启用时间`}
						value={editData.enable_time}
						onChange={(e) =>
							setEditData({ ...editData, enable_time: e.target.value })
						}
					/>

					<CustomInput
						label={`领用时间`}
						value={editData.collection_time}
						onChange={(e) =>
							setEditData({ ...editData, collection_time: e.target.value })
						}
					/>

					<div className="w-full p-2">
						<TextField
							multiline
							label="备注"
							value={editData.remark}
							className="w-full"
							rows={3}
							onChange={(e) =>
								setEditData({ ...editData, remark: e.target.value })
							}
						/>
					</div>
				</DialogWraper>
			) : (
				<></>
			)}
		</AnimateWraper>
	)
}

export default UsbKey

const CustomInput = (props: Omit<TextFieldProps, 'size'>) => (
	<div className="w-1/2 p-2">
		<TextField size="small" {...props} />
	</div>
)
