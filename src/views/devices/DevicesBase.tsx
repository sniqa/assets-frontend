import { Button } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { AddIcon } from '../../components/icons'
import Table, {
	TableColumn,
	TableDialog,
	TableRow,
	TableToolbarExtensions,
} from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'
import EditDialog from '../../components/dialogs/EditDialog'
import AddDialog from '../../components/dialogs/AddDialog'
import { _fetch } from '../../apis/fetch'
import { notice, confirm } from '../../apis/mitt'

const columns: TableColumn[] = [
	{ label: '设备型号', field: 'device_model' },
	{ label: '设备类型', field: 'device_type' },
	{ label: '出厂日期', field: 'manufacture_date' },
	{ label: '保质期', field: 'shelf_life' },
]

const DevicesBase = () => {
	const [openDialog, setOpenDialog] = useState(false)

	const [openEditDialog, setOpenEditDialog] = useState(false)

	const [deviceBaseRows, setDeviceBaseRows] = useState<TableRow[]>([])

	const [selectRow, setSelectRow] = useState<TableRow>({
		_id: '',
	})

	// 创建
	const createDeviceBase = async (deviceInfo: any) => {
		const { CREATE_DEVICE_BASE } = await _fetch({
			CREATE_DEVICE_BASE: deviceInfo,
		})

		if (CREATE_DEVICE_BASE) {
			const { success, data, errmsg } = CREATE_DEVICE_BASE
			return success
				? (setDeviceBaseRows((old) => [{ ...data, ...deviceInfo }, ...old]),
				  setOpenDialog(false),
				  notice({
						status: 'success',
						message: '创建设备基础资料成功',
				  }))
				: notice({
						status: 'error',
						message: errmsg,
				  })
		}

		return notice({
			status: 'error',
			message: '创建设备基础资料失败',
		})
	}

	// 更新
	const updateDeviceBase = async (val: TableRow) => {
		const { MODIFY_DEVICE_BASE } = await _fetch({ MODIFY_DEVICE_BASE: val })

		if (MODIFY_DEVICE_BASE) {
			const { success, data, errmsg } = MODIFY_DEVICE_BASE

			return success
				? (setDeviceBaseRows((olds) =>
						olds.map((oldRow) => (oldRow._id === val._id ? val : oldRow))
				  ),
				  setOpenEditDialog(false),
				  notice({
						status: 'success',
						message: '更新成功',
				  }))
				: notice({
						status: 'error',
						message: errmsg,
				  })
		}

		return notice({
			status: 'error',
			message: '更新失败',
		})
	}

	// 删除
	const onDeleteSelection = async (ids: (string | number)[]) => {
		const res = await confirm({
			title: '提示',
			message: '确定删除选中的项目？其他依赖此项的数据将会清空此项数据',
		})

		if (!res) {
			return
		}

		const { DELETE_DEVICE_BASE } = await _fetch({ DELETE_DEVICE_BASE: [ids] })

		if (DELETE_DEVICE_BASE) {
			const { success, data, errmsg } = DELETE_DEVICE_BASE

			return success
				? (setDeviceBaseRows((olds) =>
						olds.filter((oldRow) => !ids.includes(oldRow._id))
				  ),
				  notice({ status: 'success', message: '删除成功' }))
				: notice({ status: 'error', message: errmsg })
		}

		return notice({ status: 'error', message: '删除失败' })
	}

	const extensions: TableToolbarExtensions = [
		{
			icon: <AddIcon color="primary" />,
			title: '新增',
			onClick: () => setOpenDialog(!openDialog),
		},
	]

	const operate = useMemo(
		() => ({
			header: '操作',
			cell: (row: any) => (
				<Button onClick={() => (setSelectRow(row), setOpenEditDialog(true))}>
					{`编辑`}
				</Button>
			),
		}),
		[]
	)

	useEffect(() => {
		const getDeviceBase = async () =>
			await _fetch({ FIND_DEVICE_BASE: {} }).then((res) => {
				const { FIND_DEVICE_BASE } = res

				if (FIND_DEVICE_BASE) {
					const { success, data } = FIND_DEVICE_BASE
					success && setDeviceBaseRows(data)
				}
			})

		getDeviceBase()
	}, [])

	return (
		<AnimateWraper className="w-full">
			<Table
				columns={columns}
				rows={deviceBaseRows}
				extensions={extensions}
				operate={operate}
				onDeleteSelection={onDeleteSelection}
			/>

			{openDialog ? (
				<AddDialog
					open={openDialog}
					onClose={() => setOpenDialog(false)}
					title="新增基础资料"
					content={columns}
					onAdd={(val) => createDeviceBase(val)}
				/>
			) : (
				<></>
			)}

			{openEditDialog ? (
				<EditDialog
					open={openEditDialog}
					onClose={() => setOpenEditDialog(false)}
					title={`更改基础资料`}
					content={columns}
					onEdit={(val) => updateDeviceBase(val)}
					originData={selectRow}
				/>
			) : (
				<></>
			)}
		</AnimateWraper>
	)
}

export default DevicesBase
