import { Button } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { AddIcon } from "../../components/icons"
import Table, {
	TableColumn,
	TableDialog,
	TableRow,
	TableToolbarExtensions,
} from "../../components/table"
import AnimateWraper from "../../components/transition/AnimateWraper"
import EditDialog from "../../components/dialogs/EditDialog"
import AddDialog from "../../components/dialogs/AddDialog"
import { _fetch } from "../../apis/fetch"
import { notice } from "../../apis/mitt"

const columns: TableColumn[] = [
	{ label: "设备型号", field: "device_model" },
	{ label: "设备类型", field: "device_type" },
	{ label: "出厂日期", field: "manufacture_date" },
	{ label: "保质期", field: "shelf_life" },
]

const DevicesBase = () => {
	const [openDialog, setOpenDialog] = useState(false)

	const [openEditDialog, setOpenEditDialog] = useState(false)

	const [deviceBaseRows, setDeviceBaseRows] = useState<TableRow[]>([])

	const [selectRow, setSelectRow] = useState({})

	// 创建
	const createDeviceBase = async (deviceInfo: any) => {
		const { CREATE_DEVICE_BASE } = await _fetch({
			CREATE_DEVICE_BASE: deviceInfo,
		})

		if (CREATE_DEVICE_BASE) {
			const { success, data } = CREATE_DEVICE_BASE
			success &&
				setDeviceBaseRows((old) => [{ ...data, ...deviceInfo }, ...old])
		}
	}

	// 更新
	const updateDeviceBase = async (val: any) => {
		const { MODIFY_DEVICE_BASE } = await _fetch({ MODIFY_DEVICE_BASE: val })

		if (MODIFY_DEVICE_BASE) {
			const { success, data, errmsg } = MODIFY_DEVICE_BASE
			console.log(MODIFY_DEVICE_BASE)

			console.log(data)
			return
		}

		return notice({
			status: "error",
			message: "更新失败",
		})
	}

	const extensions: TableToolbarExtensions = [
		{
			icon: <AddIcon color="primary" />,
			title: "新增",
			onClick: () => setOpenDialog(!openDialog),
		},
	]

	const operate = useMemo(
		() => ({
			header: "操作",
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

const DevicesBaseDetail = () => {
	return <div className=""></div>
}
