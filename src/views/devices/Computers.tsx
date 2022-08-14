import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import { useMemo } from 'react'
import Table2, { TableToolbarExtensions } from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'

const columns = [
	{ label: '使用人', field: 'user' },
	{ label: '物理位置', field: 'location' },
	{ label: '所属网络', field: 'network_type' },
	{ label: 'IP', field: 'ip_address' },
	{ label: 'MAC', field: 'mac' },
	{ label: '系统版本', field: 'system_version' },
	{ label: '设备/品牌', field: 'model' },
	{ label: '磁盘SN', field: 'disk_sn' },
	{ label: '备注', field: 'descript' },
]

const Computer = () => {
	const extensions: TableToolbarExtensions = [
		{
			icon: <AddIcon color="primary" />,
			title: '新增',
		},
	]

	const oprate = useMemo(
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
				operate={oprate}
			/>
		</AnimateWraper>
	)
}

export default Computer
