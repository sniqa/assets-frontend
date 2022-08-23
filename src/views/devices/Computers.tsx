import AddIcon from '@mui/icons-material/Add'
import { Autocomplete, Button, TextField } from '@mui/material'
import { useMemo, useState } from 'react'
import Table2, {
	TableDialog,
	TableToolbarExtensions,
} from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'

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
	const [openDialog, setOpenDialog] = useState(false)

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
				<Button onClick={() => console.log(row)}>编辑</Button>
			),
		}),
		[]
	)

	return (
		<AnimateWraper className="w-full">
			<Table2
				columns={columns}
				rows={[]}
				extensions={extensions}
				operate={operate}
			/>

			<TableDialog
				open={openDialog}
				title={`新增终端`}
				onClose={() => setOpenDialog(false)}
				content={<DevicesDetail />}
			/>
		</AnimateWraper>
	)
}

export default Computer

const DevicesDetail = () => {
	const [] = useState({})

	return (
		<div className=" flex flex-col">
			<Autocomplete
				renderInput={(params) => (
					<TextField {...params} size="small" label="使用人" />
				)}
				options={[]}
			/>

			<Autocomplete
				renderInput={(params) => (
					<TextField {...params} size="small" label="物理位置" />
				)}
				options={[]}
			/>

			<Autocomplete
				renderInput={(params) => (
					<TextField {...params} size="small" label="所属网络" />
				)}
				options={[]}
			/>

			<Autocomplete
				renderInput={(params) => (
					<TextField {...params} size="small" label="IP" />
				)}
				options={[]}
			/>

			<TextField size="small" label="MAC" className="py-2"></TextField>
			<TextField size="small" label="系统版本"></TextField>
			<TextField size="small" label="设备型号/品牌"></TextField>
			<TextField size="small" label="磁盘SN"></TextField>
			<TextField size="small" label="备注"></TextField>
		</div>
	)
}
