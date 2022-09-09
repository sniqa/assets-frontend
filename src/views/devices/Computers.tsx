import AddIcon from '@mui/icons-material/Add'
import { Autocomplete, Button, TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import Table2, {
	TableDialog,
	TableToolbarExtensions,
} from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'
import CustomDialog, {
	CustomDialogContentProps,
} from '../../components/dialogs/CustomDialog'
import { useAppSelector } from '../../store'
import { useMenu } from '@mui/base'

const columns = [
	{ label: '使用人', field: 'user' },
	{ label: '物理位置', field: 'location' },
	{ label: '所属网络', field: 'network_type' },
	{ label: 'IP', field: 'ip_address' },
	{ label: 'MAC', field: 'mac' },
	{ label: '系统版本', field: 'system_version' },
	{ label: '设备型号/品牌', field: 'model' },
	{ label: '磁盘SN', field: 'disk_sn' },
	{ label: '备注', field: 'descript' },
]

const Computer = () => {
	const users = useAppSelector((state) => state.users)
	const departments = useAppSelector((state) => state.department)
	const networkTypes = useAppSelector((state) => state.networkTypes)
	const ipAddress = useAppSelector((state) => state.ipAddress)

	const [curNetworkTypeIps, setCurNetworkTypeIps] = useState<string[]>([])

	const [openAddDialog, setOpenAddDialog] = useState(false)

	const [computer, setComputer] = useState({
		username: '',
		location: '',
		networkType: '',
	})

	const extensions: TableToolbarExtensions = [
		{
			icon: <AddIcon color="primary" />,
			title: '新增',
			onClick: () => setOpenAddDialog(!openAddDialog),
		},
	]

	const operate = useMemo(
		() => ({
			header: '操作',
			cell: (row: any) => (
				<Button onClick={() => console.log(row)}>编辑</Button>
			),
		}),
		[]
	)

	const contents: CustomDialogContentProps[] = [
		{
			label: '使用人',
			type: 'select',
			options: users.map((user) => user.username),
			onChange: (val) => setComputer({ ...computer, username: val }),
		},
		{
			label: '物理位置',
			type: 'select',
			options: departments.flatMap((department) => department.locations),
			onChange: (val) => setComputer({ ...computer, location: val }),
		},
		{
			label: '所属网络',
			type: 'select',
			options: networkTypes.map((networkType) => networkType.network_name),
			onChange: (val) => {
				setComputer({ ...computer, networkType: val })
				const ips = ipAddress
					.filter((ip) => ip.network_type === val)
					.map((ip) => ip.ip_address)

				console.log(ips)

				setCurNetworkTypeIps(ips)
			},
		},
		{
			label: 'IP',
			type: 'select',
			options: curNetworkTypeIps,
		},
		{ label: 'MAC', type: 'text' },
		{ label: '设备型号', type: 'select', options: [] },
		{ label: '操作系统', type: 'text' },
		{ label: '磁盘SN', type: 'text' },
	]

	return (
		<AnimateWraper className="w-full">
			<Table2
				columns={columns}
				rows={[]}
				extensions={extensions}
				operate={operate}
			/>

			{openAddDialog ? (
				<CustomDialog
					title={'新增终端'}
					open={openAddDialog}
					contents={contents}
					onClose={() => setOpenAddDialog(false)}
					onOk={() => console.log(computer)}
				/>
			) : (
				<></>
			)}
		</AnimateWraper>
	)
}

export default Computer
