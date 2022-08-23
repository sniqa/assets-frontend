import { Button } from '@mui/material'
import { useMemo, useState } from 'react'
import { AddIcon } from '../../components/icons'
import Table, { TableToolbarExtensions } from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'

const columns = []

const DevicesBase = () => {
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
			<Table columns={[]} rows={[]} extensions={extensions} operate={operate} />
		</AnimateWraper>
	)
}

export default DevicesBase
