import { Button } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { AddIcon } from "../../components/icons"
import Table, {
	TableColumn,
	TableDialog,
	TableToolbarExtensions,
} from "../../components/table"
import AnimateWraper from "../../components/transition/AnimateWraper"
import AddDialog from "../../components/dialogs/AddDialog"
import { _fetch } from "../../apis/fetch"

const columns: TableColumn[] = [
	{ label: "设备型号", field: "device_model" },
	{ label: "设备类型", field: "device_type" },
	{ label: "出厂日期", field: "manufacture_date" },
	{ label: "保质期", field: "shelf_life" },
]

const DevicesBase = () => {
	const [openDialog, setOpenDialog] = useState(false)

	const [deviceBaseRows, setDeviceBaseRows] = useState([])

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
				<Button onClick={() => console.log(row)}>编辑</Button>
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

			<AddDialog
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				title="新增基础资料"
				content={columns}
				onAdd={(val) => createDeviceBase(val)}
			/>
		</AnimateWraper>
	)
}

export default DevicesBase

const DevicesBaseDetail = () => {
	return <div className=""></div>
}
