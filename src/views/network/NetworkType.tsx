import { AddIcon } from "../../components/icons"
import Table, {
	TableColumn,
	TableToolbarExtensions,
} from "../../components/table"
import AnimateWraper from "../../components/transition/AnimateWraper"

import { useEffect, useMemo, useState } from "react"
import { _fetch } from "../../apis/fetch"
import { notice } from "../../apis/mitt"
import AddDialog, { AddDialogContent } from "../../components/dialogs/AddDialog"
import { useAppDispatch, useAppSelector } from "../../store"
import { addNetworkType } from "../../store/networkType"

const columns: TableColumn[] = [
	{
		label: "类型名称",
		field: "network_name",
	},
	{
		label: "开始地址",
		field: "ip_address_start",
	},
	{
		label: "结束地址",
		field: "ip_address_end",
	},
	{
		label: "子网掩码",
		field: "netmask",
	},
	{
		label: "网关",
		field: "gateway",
	},
	{
		label: "DNS",
		field: "dns",
	},
	{
		label: "ip已使用",
		field: "used_number",
	},
	{
		label: "ip未使用",
		field: "unused_number",
	},
	{
		label: "ip总数",
		field: "total_number",
	},
	{
		label: "备注",
		field: "descript",
	},
]

const addDialogContent: AddDialogContent[] = [
	{
		label: "网络类型名称",
		field: "network_name",
		required: true,
	},
	{
		label: "开始地址",
		field: "ip_address_start",
		required: true,
	},
	{
		label: "结束地址",
		field: "ip_address_end",
	},
	{
		label: "子网掩码",
		field: "netmask",
		required: true,
	},
	{
		label: "网关",
		field: "gateway",
	},
	{
		label: "DNS",
		field: "dns",
	},
	{
		label: "备注",
		field: "descript",
	},
]

const NetworkType = () => {
	const networkTypes = useAppSelector((state) => state.networkTypes)

	const dispatch = useAppDispatch()

	const [openDialog, setOpenDialog] = useState(false)

	const extensions: TableToolbarExtensions = useMemo(
		() => [
			{
				icon: <AddIcon color="primary" />,
				title: "新增网络类型",
				onClick: () => setOpenDialog(true),
			},
		],
		[]
	)

	const handleAddNetworkType = async (val: Partial<NetworkInformation>) => {
		const { CREATE_NETWORK_TYPE } = await _fetch({ CREATE_NETWORK_TYPE: val })

		console.log(CREATE_NETWORK_TYPE)

		if (CREATE_NETWORK_TYPE) {
			const { success, data, errmsg } = CREATE_NETWORK_TYPE

			return success
				? (dispatch(addNetworkType(data)),
				  notice({ status: "success", message: "创建网络类型成功" }))
				: notice({ status: "error", message: errmsg })
		}

		return notice({ status: "error", message: "创建网络类型失败" })
	}

	return (
		<AnimateWraper className="w-full">
			<Table columns={columns} rows={networkTypes} extensions={extensions} />

			<AddDialog
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				title={"新增网络类型"}
				content={addDialogContent}
				onAdd={(val) => handleAddNetworkType(val)}
			/>
		</AnimateWraper>
	)
}

export default NetworkType
