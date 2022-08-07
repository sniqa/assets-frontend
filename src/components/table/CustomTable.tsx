import { getTheme } from '@table-library/react-table-library/baseline'
import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'

interface CustomTableHeader {
	headerName?: string
	field?: string
	type?: string
}

interface CustomTableProps {
	colums: []
	rows: any[]
}

const CustomTable = ({ colums, rows }: CustomTableProps) => {
	const data = { nodes: rows }

	const theme = useTheme(getTheme())

	const COLUMNS = [
		{ label: 'Task', renderCell: (item) => item.name, resize: true },
		{
			label: 'Deadline',
			renderCell: (item) => item.deadline,
			resize: true,
		},
		{ label: 'Type', renderCell: (item) => item.type, resize: true },
		{
			label: 'Complete',
			renderCell: (item) => item.isComplete.toString(),
			resize: true,
		},
		{ label: 'Tasks', renderCell: (item) => item.nodes?.length },
	]

	return (
		<div className="flex-grow overflow-hidden">
			<CompactTable
				columns={COLUMNS}
				data={data}
				theme={theme}
				className={`h-full`}
			/>
		</div>
	)
}

export default CustomTable
