interface TableBodyProps {
	rows: any[]
}

const TableBody = ({ rows }: TableBodyProps) => {
	return (
		<tbody className={`flex-grow overflow-y-auto`}>
			{rows.map((row) => (
				<tr key={row.id} className={``}>
					{row.getVisibleCells().map((cell) => (
						<td
							key={cell.id}
							style={{
								width: cell.column.getSize(),
							}}
							className={`border-bottom h-3rem leading-3rem`}
						>
							{cell.renderCell()}
						</td>
					))}
				</tr>
			))}
		</tbody>
	)
}

export default TableBody
