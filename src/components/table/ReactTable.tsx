import './index.css'

import {
	ColumnDef,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import CuzomTable from './CuzomTable'
import { makeData, Person } from './makeData'
import TableFooter from './TableFooter'
import TableToolbar from './TableToolbar'

const columns: ColumnDef<Person>[] = [
	{
		header: 'Name',
		footer: (props) => props.column.id,
		columns: [
			{
				accessorKey: 'firstName',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
			{
				accessorKey: 'firstName',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},

			{
				accessorKey: 'firstName',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},

			{
				accessorKey: 'firstName',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
			{
				accessorKey: 'firstName',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
			{
				accessorKey: 'firstName',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
			{
				accessorKey: 'firstName',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
			{
				accessorKey: 'firstName',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
			{
				accessorKey: 'firstName',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
			{
				accessorFn: (row) => row.lastName,
				id: 'lastName',
				cell: (info) => info.getValue(),
				header: () => <span>Last Name</span>,
				footer: (props) => props.column.id,
			},
		],
	},
	{
		header: 'Info',
		footer: (props) => props.column.id,
		columns: [
			{
				accessorKey: 'age',
				header: () => 'Age',
				footer: (props) => props.column.id,
			},
			{
				header: 'More Info',
				columns: [
					{
						accessorKey: 'visits',
						header: () => <span>Visits</span>,
						footer: (props) => props.column.id,
					},
					{
						accessorKey: 'status',
						header: 'Status',
						footer: (props) => props.column.id,
					},
					{
						accessorKey: 'progress',
						header: 'Profile Progress',
						footer: (props) => props.column.id,
					},
				],
			},
		],
	},
]

export default function App() {
	const data = useMemo(() => makeData(50), [])

	const table = useReactTable({
		data,
		columns,
		enableColumnResizing: true,
		columnResizeMode: 'onChange',
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
		manualPagination: true,
	})

	return (
		<div className="flex-grow inline-flex flex-col bg-light-50 rounded-2xl overflow-hidden p-2">
			<TableToolbar />

			<div className="h-full overflow-x-auto">
				<CuzomTable table={table} />
			</div>

			<TableFooter
				pageIndex={table.getState().pagination.pageIndex}
				pageSize={table.getState().pagination.pageSize}
				setPageIndex={table.setPageIndex}
				setPageSize={table.setPageSize}
				rowCount={0}
			/>
		</div>
	)
}
