import { flexRender, Table } from '@tanstack/react-table'
import { useAppSelector } from '../../store'

interface CuzomTableProps<T = any> {
	table: Table<T>
}

const SCROLL_BAR_STYLE =
	'scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 scrollbar-thumb-rounded-full'

const CuzomTable = ({ table }: CuzomTableProps) => {
	const { widthIsZoom, heightIsZoom } = useAppSelector(
		(state) => state.tableBodySize
	)

	console.log(widthIsZoom)

	return (
		<table
			className={`w-full flex flex-col ${
				widthIsZoom ? 'table-body-width-expends' : 'table-body-width-normal'
			} overflow-x-auto`}
		>
			<thead className="h-6rem">
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<th
									key={header.id}
									colSpan={header.colSpan}
									style={{ position: 'relative', width: header.getSize() }}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
									{header.column.getCanResize() && (
										<div
											onMouseDown={header.getResizeHandler()}
											onTouchStart={header.getResizeHandler()}
											className={`resizer ${
												header.column.getIsResizing() ? 'isResizing' : ''
											}`}
										></div>
									)}
								</th>
							)
						})}
					</tr>
				))}
			</thead>
			<tbody
				className={`${SCROLL_BAR_STYLE} ${
					heightIsZoom
						? 'table-body-height-normal'
						: 'table-body-height-expends'
				} overflow-y-auto`}
			>
				{table.getRowModel().rows.map((row) => {
					return (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => {
								return (
									<td key={cell.id} style={{ width: cell.column.getSize() }}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								)
							})}
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default CuzomTable
