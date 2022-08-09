import { CompactTable } from '@table-library/react-table-library/compact'
// import {
// 	DEFAULT_OPTIONS,
// 	getTheme,
// } from '@table-library/react-table-library/material-ui'
import { getTheme } from '@table-library/react-table-library/baseline'
import { useRowSelect } from '@table-library/react-table-library/select'
import { useTheme } from '@table-library/react-table-library/theme'
// import { Person, makeData } from './makeData'
import { Data } from '@table-library/react-table-library'

// const meterialThema = getTheme(DEFAULT_OPTIONS)

// const customThema = {}

const theme = useTheme([
	getTheme(),
	{
		Table: `
        --data-table-library_grid-template-columns:  44px repeat(5, minmax(0, 1fr));
      `,
	},
])

interface CustomTableCol {
	label: string
	field: string
}

interface CustomTableProps {
	columns: CustomTableCol[]
	rows: any[]
}

const CustomTable = (props: CustomTableProps) => {
	const { columns, rows } = props

	const data: Data = { nodes: [] }

	// const COLUMNS: Column[] = columns.map((column, index) => ({
	// 	label: column.label,
	// 	renderCell: (item) => item[column.field],
	// 	select: index === 0 && {
	// 		renderHeaderCellSelect: (item) => (
	// 			<Checkbox
	// 				size="small"
	// 				checked={select.state.all}
	// 				indeterminate={!select.state.all && !select.state.none}
	// 				onChange={select.fns.onToggleAll}
	// 			/>
	// 		),
	// 		renderCellSelect: (item) => (
	// 			<Checkbox
	// 				size="small"
	// 				checked={select.state.ids.includes(item.id)}
	// 				onChange={() => select.fns.onToggleById(item.id)}
	// 			/>
	// 		),
	// 	},
	// }))

	const COLUMNS = [
		{
			label: 'Task',
			renderCell: (item) => item.name,
			// resize: true,
			select: true,
		},
		{
			label: 'Deadline',
			resize: true,
			renderCell: (item) =>
				item.deadline.toLocaleDateString('en-US', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				}),
		},
		{ label: 'Type', renderCell: (item) => item.type, resize: true },
		{
			label: 'Complete',
			renderCell: (item) => item.isComplete.toString(),
			resize: true,
		},
		{ label: 'Tasks', renderCell: (item) => item.nodes?.length },
	]
	const onSelectChange = () => {}

	const select = useRowSelect(data, {
		onChange: onSelectChange,
	})

	return (
		<CompactTable data={data} columns={COLUMNS} theme={theme} select={select} />
	)
}

export default CustomTable
